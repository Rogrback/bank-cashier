var cuentas = [
    {
        nombre: "Mali",
        saldo: 200,
        password: 'helloworld'
    },
    {
        nombre: "Gera",
        saldo: 290,
        password: '133t'
    },
    {
        nombre: "Maui",
        saldo: 67,
        password: '123'
    }
]

var cuentasS;
var indexS;
var index=-1;
var saldo=0;

//import swal from 'sweetalert';


function login(){
    var us = document.getElementById("user").value;
    var ps = document.getElementById("password").value;

    for (let i = 0; i < cuentas.length; i++) {
        if(cuentas[i].nombre == us && cuentas[i].password == ps){   
            swal("Hello world!");
            index = i;  
            // if(index==1){
            //     location.replace("./index.html");
            // }
            location.replace("./index.html");
        }else{                   
            index=-1;
        }
    }     
    
    if(index==-1){
        document.getElementById("user").value = "";
        document.getElementById("password").value = "";
        swal("No ingresaste!", "Acceso denegado", "error");
    }   
    guardarLocalStorage();   
}

function guardarLocalStorage() {
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    localStorage.setItem('index', index);
}

function obtenerLocalStorage(){
    cuentasS= JSON.parse(localStorage.getItem("cuentas"));
    indexS= localStorage.getItem("index");
}


obtenerLocalStorage();

function consultarSaldo(){
    let row= document.getElementById("cardItem");

    let card=`<div class="alert alert-success mb-0" role="alert">           
    <h4 class="alert-heading">Su saldo actual es $${cuentasS[indexS].saldo}</h4></div>`
    
    row.insertAdjacentHTML("afterbegin", card);
}


function ingresarMonto(){
    let monto= parseInt(document.getElementById("ingresarMonto").value);
    let saldo= cuentasS[indexS].saldo;
    let nuevoSaldo= saldo + monto;
    input= document.createElement("input");
    if(nuevoSaldo>990){
        alert("Monto excede a $990");
    }else{
        //swal("Monto aprobado!", "Acceso correcto", "success"); 
        document.getElementById("ingresarMonto").value = ""
        cuentasS[indexS].saldo= nuevoSaldo;
        
        cuentas= cuentasS[indexS];        
    }    
}

function retirarMonto(){
    let monto= parseInt(document.getElementById("retirarMonto").value);
    let saldo= cuentasS[indexS].saldo;
    let nuevoSaldo=saldo - monto;

    if(nuevoSaldo<10){        
        alert("Monto menor a $10");     
    }else{
        document.getElementById("retirarMonto").value = ""
        cuentasS[indexS].saldo= nuevoSaldo;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });

    }
}

function cerrarSesion(){
    localStorage.clear();
    location.replace("./login.html");
}

function ok(event){
    event.preventDefault();
}

/*

    -----
    Redireccionar cambiar la URL
    location.replace()
    -----
    includes() -- Retorna true or false 
    indexOf() -- Retorna el indice

    function usuarioPosicion(){
        if(cuentas.find(usuarioCorrecto) == usuario.saldo){
            return usu
        }
    }

    function UsuarioCorrecto(usuario) {
        if(usuario.nombre === document.getElementById("user").value && usuario.password === document.getElementById("password").value){
            console.log("Logueado")
        }else{
            console.log("No logueado")
        }
    }
    
    inventario.find(UsuarioCorrecto);
*/
