
function cargarFoja(){
    // const ventana = document.getElementById("ventana-principal");
    // const result = await pool.query("select * from Empresa;");
    // console.log(result)
}

function insertaTabla(){
    const ventana = document.getElementById("ventana-principal");
    ventana.innerHTML = "";
}

function nuevaFoja(){
    // var ventana = document.getElementsByClassName("ventana-principal");
    let contenedor = document.createElement("div");
    contenedor.setAttribute("class","contenedor");
    contenedor.setAttribute("id","con-te");
    
    let head = document.createElement("div");
    head.setAttribute("class","head");

    let containerTabla = document.createElement("div");
    containerTabla.setAttribute("class","container-tabla");

    let nav = document.createElement("nav");
    nav.setAttribute("class","navbar bg-light");

    let containerFluid = document.createElement("div");
    containerFluid.setAttribute("class","container-fluid");

    let elementA = document.createElement("a");
    elementA.setAttribute("class", "navbar-brand text-black");
    elementA.innerHTML = "Nueva Foja";

    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action","newFoja");
    form.setAttribute("class","d-flex");

    let input = document.createElement("input");
    input.setAttribute("class","form-control me-2");
    input.setAttribute("placeholder","id_obra");
    input.setAttribute("name","id_obra");

    let button = document.createElement("button");
    button.setAttribute("class","btn btn-outline-success");
    button.setAttribute("type","submit");
    button.innerHTML = "Buscar";

    form.appendChild(input);
    form.appendChild(button);

    containerFluid.appendChild(elementA);
    containerFluid.appendChild(form);

    nav.appendChild(containerFluid);

    head.appendChild(nav);

    contenedor.appendChild(head);
    contenedor.appendChild(containerTabla);

    
    // node.appendChild(contenedor);

    var node = document.getElementById("ven-prin");
    var bandera = document.getElementById("con-te");
    if(!bandera){
        node.insertBefore(contenedor, null);
    }else{
        node.removeChild(bandera);
    }
}


function verObras() {
    var url = "http://localhost:3000/api/obrasEmpresa";
    $('#tablaObras').DataTable({            
        "ajax":{
            "url": url,
            "dataSrc":""
        },
        "columns":[
            {"data":"id_obra"},
            {"data":"nom_obra"},
            {"data":"plazo_mes"},
            {"data":"razon_social"},
        ],
    });
};

function avanceDeObra(){
    fetch('http://localhost:3000/api/avanceObra')
    .then(result => result.json())
    .then((output) => {
        let res = document.querySelector("#res");
        res.innerHTML = "";

        for(let item of output){
            res.innerHTML += `
            <tr>
                <td> ${item.id_obra} </td>
                <td> ${item.NOM_OBRA} </td>
                <td> ${item.avance} </td>
            </tr>
            `
        }
        
    }).catch(err => console.error(err));
}

function obrasEmpresa(){
    fetch('http://localhost:3000/api/obrasEmpresa')
    .then(result => result.json())
    .then((output) => {
        let res = document.querySelector("#res");
        res.innerHTML = "";

        for(let item of output){
            res.innerHTML += `
            <tr>
                <td> ${item.id_obra} </td>
                <td> ${item.nom_obra} </td>
                <td> ${item.plazo_mes} </td>
                <td> ${item.razon_social} </td>
            </tr>
            `
        }
        
    }).catch(err => console.error(err));
}

function obras(){
    fetch('http://localhost:3000/api/obrasEmpresa')
    .then(result => result.json())
    .then((output) => {
        let res = document.querySelector("#res");
        res.innerHTML = "";

        for(let item of output){
            res.innerHTML += `
            <tr>
                <td> ${item.id_obra} </td>
                <td> ${item.nom_obra} </td>
                <td> ${item.razon_social} </td>
                <td><input class="form-check-input" type="checkbox" value="${item.id_obra}" id="flexCheckDefault">
                </td>
            </tr>
            `
        }
        
    }).catch(err => console.error(err));
}

function fojaDeObra(id_obra){
    fetch('http://localhost:3000/api/foja/' + id_obra)
    .then(result => result.json())
    .then((output) => {
        let res = document.querySelector("#res");
        res.innerHTML = "";

        let res2 = document.querySelector("#res2");
        res2.innerHTML = "";

        var b = 0;

        for(let item of output){
            res.innerHTML += `
            <tr>
                <td class="orden">${item.id_item}</td>
                <td>${item.den_item}</td>
                <td>${item.ava_acu_ant}</td>
                <td>
                    <div class="input-group">
                        <input type="text" class="form-control inpuTT" minlength="1" maxlength="5" style="text-align: center;" value="${item.ava_actual}">
                        <span class="input-group-text" id="basic-addon1">%</span>
                      </div>
                </td>
            </tr>
            `
            if(b == 0){
                res2.innerHTML += `
                    <div class="col">
                        <div class="form-floating">
                            <input type="text" class="form-control form-idobra" id="floatingInputGrid" value="${item.id_obra}" disabled>
                            <label for="floatingInputGrid">Nº</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInputGrid" value="${item.nom_obra}" disabled>
                            <label for="floatingInputGrid">Obra</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control form-id" id="floatingInputGrid" value="${item.id_foja}" disabled>
                            <label for="floatingInputGrid">Foja nº</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control form-fecha" id="floatingInputGrid" value="${item.fecha}" disabled>
                            <label for="floatingInputGrid">Fecha</label>
                        </div>
                    </div>
                `
                b = 1;
            }
        }
        
    }).catch(err => console.error(err));
}

function certixPago(id_obra, id_certi_pago){
    fetch('http://localhost:3000/api/certipago/' + id_obra + "/" + id_certi_pago)
    .then(result => result.json())
    .then((output) => {
        let res = document.querySelector("#res");
        res.innerHTML = "";

        for(let item of output){
            res.innerHTML += `
            <tr>
                <td>${item.nro_cert}</td>
                <td>${item.id_obra}</td>
                <td>${item.fecha}</td>
                <td>${item.estado}</td>
                <td>
                    <button type="button" class="btn btn-info"><i class="fas fa-arrow-circle-up"></i></button>
                </td>
            </tr>
            `
        }
        
    }).catch(err => console.error(err));
}

function certixObra(id_obra, id_certi_pago){
    fetch('http://localhost:3000/api/certiobra/' + id_obra + "/" + id_certi_pago)
    .then(result => result.json())
    .then((output) => {
        let res = document.querySelector("#res");
        res.innerHTML = "";

        for(let item of output){
            res.innerHTML += `
            <tr>
                <td>${item.nro_cert_obra}</td>
                <td>${item.id_foja}</td>
                <td>
                    <button type="button" class="btn btn-info" onclick="location.href='/certiDeObra/${id_obra}/${item.id_foja}'"><i class="fas fa-arrow-circle-up"></i></button>
                </td>
            </tr>
            `
        }
        
    }).catch(err => console.error(err));
}

function mostrarID(){
    let valor = document.querySelector("#idobratxt").value;
    fojaDeObra(valor);
}

function mostrarCerti(){
    let idobra = document.querySelector("#idobratxt").value;
    let idcertip = document.querySelector("#idcertipagotxt").value;
    certixPago(idobra, idcertip);
}

function mostrarCertiObra(){
    let idobra = document.querySelector("#idobratxt").value;
    let idcertip = document.querySelector("#idcertipagotxt").value;
    certixObra(idobra, idcertip);
}

function montoObrasRedet(){
    fetch('http://localhost:3000/api/montoObras')
    .then(result => result.json())
    .then((output) => {
        let res = document.querySelector("#res");
        res.innerHTML = "";

        for(let item of output){
            res.innerHTML += `
            <tr>
                <td> ${item.id_obra} </td>
                <td> ${item.nom_obra} </td>
                <td> ${item.fecha} </td>
                <td> ${item.basico} </td>
                <td> ${item.redet1} </td>
                <td> ${item.redet2} </td>
                <td> ${item.redet3} </td>
            </tr>
            `
        }
        
    }).catch(err => console.error(err));
}

function ventanaSecundaria(URL){
    window.open(URL, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=800,height=500");
}

function obtenerTabla(){
    // let tabla = document.getElementById("tablaNuevaFoja");
    // console.log(tabla.rows[1].cells[3]);

    // Obtener checkbox por clase y solo los marcados
    let inputs = document.querySelectorAll('.form-check-input:checked');
    if(inputs.length == 0) {
        console.log('Debes seleccionar al menos una obra');
        // Salir de la función
        return;
    }
    // Aquí haces lo que debas hacer con cada checkbox
    alert("CREACION EXITOSA");
    inputs.forEach(input => {
        console.log(input.value);
        $.post("/nuevasFojas",{ id_obra: input.value});
    });
}

function guardarFoja(){
    let orden = document.querySelectorAll('.orden');
    let inputs = document.querySelectorAll('.inpuTT');
    let idFoja = document.querySelector('.form-id');
    if(inputs.length == 0) {
        console.log('Debes seleccionar al menos una obra');
        // Salir de la función
        return;
    }
    // Aquí haces lo que debas hacer con cada checkbox
    // alert("CREACION EXITOSA");
    for(let i=0; i<orden.length; i++){
        input = orden[i];
        input2 = inputs[i];
        $.post("/cargarFojas",{ id_item: input.innerHTML, ava_actual: input2.value, idFoja: idFoja.value});
    }
}

function certificar(){
    let idFoja = document.querySelector('.form-id');
    let idObra = document.querySelector('.form-idobra');
    let fecha = document.querySelector('.form-fecha');
    let fecha1 = fecha.value.split("-").reverse().join("-");
    $.post("/certificar", {idFoja: idFoja.value, idObra: idObra.value, fecha: fecha1});  
}

function verCertiDeObra(){
    $.post("/certiDeObra");
}

$(document).ready(function(){
    let bandera = document.querySelector("#tablaAvance");
    if (bandera != null) {
        avanceDeObra();
    }

    let bandera1 = document.querySelector("#tablaObras");
    if (bandera1 != null) {
        obrasEmpresa();
    }

    let bandera2 = document.querySelector("#tablaNuevaFoja");
    if (bandera2 != null) {
        obras();
    }

    let bandera3 = document.querySelector("#tablaMontoObras");
    if (bandera3 != null) {
        montoObrasRedet();
    }
}   
);