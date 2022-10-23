const res = require("express/lib/response");
const pool = require("../database");

const vistaPrincipal = (req, res) => {
    res.render("login");
};

const vistaNuevafoja = (req, res) => {
    res.render("nuevaFoja");
};

const vistaObra = (req, res) => {
    res.render("obras");
};

const vistaCargarfoja = async (req, res) =>  {
    res.render("cargar-foja");
};

const vistaCertiPago = async (req, res) =>  {
    res.render("certiPago");
};

const vistaCertiObra = async (req, res) =>  {
    res.render("certiObra");
};

const vistaMontoObra = async (req, res) =>  {
    res.render("montoObra");
};

const vistaAvanceObra = async (req, res) =>  {
    res.render("avanceObra");
};

const vistaVerCertiObra = async (req, res) =>  {
    const {idObra, idFoja} = req.params;
    const encabezado = await pool.query("SELECT o.id_obra, o.nom_obra, co.nro_cert, co.nro_cert_obra FROM Certi_obra AS co INNER JOIN Obra AS o WHERE co.id_obra = ? AND co.id_foja = ? AND o.id_obra = co.id_obra;", [idObra, idFoja]);
    const filas = await pool.query("SELECT i.den_item, if(i.id_tipo_item = 1, item_mas_porcentajes(fd.id_item,i.id_obra,0), null) as vivienda, if(i.id_tipo_item = 2, item_mas_porcentajes(fd.id_item,i.id_obra,0), null) as Infraestructura, fd.ava_acu_ant, fd.ava_actual, sum(fd.ava_acu_ant + fd.ava_actual) as acumulado, sum((item_mas_porcentajes(fd.id_item,i.id_obra,0)) * ((fd.ava_acu_ant + fd.ava_actual)/100)) as Total_parcial FROM Foja_det as fd inner join Item as i WHERE fd.id_obra = ? and fd.id_foja = ? and fd.id_item = i.id_item and fd.id_obra = i.id_obra GROUP BY i.id_item;", [idObra, idFoja]);
    res.render("verCertiObra",{encabezado, filas});
};

const mostrarTabla = async (req, res) => {
    const {sentenciaSQL} = req.body;
    const fojaSQL = null;
    const resultSQL = await pool.query(sentenciaSQL);
    res.render("tables", {resultSQL, fojaSQL});
};

const itemsFoja =  async (req, res) => {
    const {id_obra} = req.body;
    const resultSQL = null;
    const fojaSQL = await pool.query("SELECT * FROM Item WHERE id_obra= ?", [id_obra]);
    res.render("itemFoja", {resultSQL, fojaSQL});
};

module.exports = {
    vistaPrincipal,
    vistaNuevafoja,
    vistaCargarfoja,
    mostrarTabla,
    itemsFoja,
    vistaObra,
    vistaCertiPago,
    vistaCertiObra,
    vistaMontoObra,
    vistaAvanceObra,
    vistaVerCertiObra
}