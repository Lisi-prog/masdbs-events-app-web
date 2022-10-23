const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { redirect, append, render } = require("express/lib/response");

const pool = require("../database");
const customerController = require("../controllers/customController");
// const passport = require("passport");
const {vistaPrincipal, vistaNuevafoja, vistaCargarfoja, mostrarTabla, itemsFoja, vistaObra, vistaCertiPago, vistaCertiObra, vistaMontoObra, vistaAvanceObra, vistaVerCertiObra} = require("../controllers/pageController");
const router = express.Router();

router.get("/", vistaPrincipal);

router.get("/nuevaFoja", vistaNuevafoja);

router.get("/cargarFoja", vistaCargarfoja);

router.post("/sql", mostrarTabla);

router.post("/newFoja", itemsFoja);

router.get("/obras", vistaObra);

router.get("/certiPago", vistaCertiPago);

router.get("/certiObra", vistaCertiObra);

router.get("/montoObra", vistaMontoObra);

router.get("/avanceObra", vistaAvanceObra);

router.get("/certiDeObra/:idObra/:idFoja", vistaVerCertiObra);


//Mostrar obras
router.get("/api/obras", (req, res) => {
    pool.query("SELECT * FROM Obra;", (err, rows) => {
        if(err){
            throw err;
        }else{
            res.send(rows);
        }
    });
});

//Mostrar obras
router.get("/api/obrasEmpresa", (req, res) => {
    pool.query("SELECT o.id_obra, o.nom_obra, o.plazo_mes, e.razon_social FROM Obra AS o inner join Empresa AS e WHERE o.id_empresa = e.id_empresa;", (err, rows) => {
        if(err){
            throw err;
        }else{
            res.send(rows);
        }
    });
});

//Mostrar obras
router.get("/api/obras/:id_obra", (req, res) => {
    pool.query("SELECT * FROM Obra WHERE id_obra = ?;",[req.params.id_obra] , (err, row) => {
        if(err){
            throw err;
        }else{
            res.send(row);
        }
    });
});

//Mostrar avance de obras
router.get("/api/avanceObra", (req, res) => {
    pool.query("SELECT id_obra, NOM_OBRA, Avance_obra_porcentaje(id_obra) AS avance FROM Obra;", (err, rows) => {
        if(err){
            throw(err);
        }else{
            res.send(rows);
        }
    });
});

//nueva foja
router.get("/api/nuevaFoja", (req, res) => {
    pool.query("SELECT id_obra, NOM_OBRA, Avance_obra_porcentaje(id_obra) AS avance FROM Obra;", (err, rows) => {
        if(err){
            throw(err);
        }else{
            res.send(rows);
        }
    });
});

//Mostrar obras
router.get("/api/foja/:id_obra", async (req, res) => {
    const dato = await pool.query("SELECT max(nro_cert), abierto FROM Certi_pago WHERE id_obra = ? group by nro_cert;",[req.params.id_obra]);
    if(dato[0].abierto === 1){
        const idFoja = await pool.query("SELECT max(id_foja) as idFoja FROM Foja_det WHERE id_obra = ?", [req.params.id_obra]);
        pool.query("select o.id_obra, o.nom_obra, i.den_item, f.id_foja, DATE_FORMAT( f.fecha_foja,  '%d-%m-%Y' ) as fecha, fd.id_item , fd.ava_acu_ant , fd.ava_actual  from Foja as f inner join Foja_det as fd inner join Obra as o inner join Item as i where f.id_obra = ? and f.id_foja = fd.id_foja and o.id_obra = ? and fd.id_item = i.id_item and i.id_obra = ? AND fd.id_foja = ?;",[req.params.id_obra, req.params.id_obra, req.params.id_obra, idFoja[0].idFoja] , (err, row) => {
            if(err){
                throw err;
            }else{
                res.send(row);
            }
    });
    }else{
        res.send([]);
    }
    
});

//Montos y redeterminados obras
router.get("/api/montoObras", (req, res) => {
    pool.query("select id_obra, nom_obra, DATE_FORMAT( fec_inicio,  '%d-%m-%Y' ) as fecha, Monto_contrato(id_obra, 0) as basico, Monto_contrato(id_obra, 1) as redet1, Monto_contrato(id_obra, 2) as redet2, Monto_contrato(id_obra, 3) as redet3 FROM Obra;", (err, row) => {
        if(err){
            throw err;
        }else{
            res.send(row);
        }
    });
});

//Certificados de pagos
router.get("/api/certipago/:id_obra/:id_certi_pago", (req, res) => {
    pool.query("SELECT id_obra, nro_cert, DATE_FORMAT( fecha_cert,  '%d-%m-%Y' ) as fecha, if(abierto = 0, 'Cerrado', 'Abierto') as estado FROM Certi_pago WHERE id_obra = ? AND nro_cert = ?;",[req.params.id_obra, req.params.id_certi_pago] , (err, row) => {
        if(err){
            throw err;
        }else{
            res.send(row);
        }
    });
});

//Certificados de obras
router.get("/api/certiobra/:id_obra/:id_certi_pago", (req, res) => {
    pool.query("SELECT nro_cert_obra, id_foja FROM Certi_obra WHERE id_obra = ? AND nro_cert = ?;",[req.params.id_obra, req.params.id_certi_pago] , (err, row) => {
        if(err){
            throw err;
        }else{
            res.send(row);
        }
    });
});

router.post("/nuevasFojas", async (req, res) => {
    const {id_obra} = req.body;
    await pool.query("SET @mensaje= '';");
    await pool.query("call la_nueva_foja(?,@mensaje);", [id_obra]);
    const mensaje = await pool.query("select @mensaje;");
    console.log(mensaje);
});

router.post("/cargarFojas", async (req, res) => {
    const {id_item, ava_actual, idFoja} = req.body;
    console.log(id_item, ava_actual, idFoja);
    await pool.query("UPDATE Foja_det SET ava_actual=? WHERE id_item = ? AND id_foja = ?",[ava_actual, id_item, idFoja]);
});

router.post("/certificar", async (req, res) => {
    const {idFoja, idObra, fecha} = req.body;
    await pool.query("call certificar(?,?,?)",[idObra, idFoja, fecha]);
});

module.exports = router;