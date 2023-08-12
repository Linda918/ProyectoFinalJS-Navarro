//contacto
const nombre = document.getElementById("nombre");
const email = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");
const form = document.getElementById("form");
const aviso = document.getElementById("warnings");

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = "";
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    aviso.innerHTML = "";
    if(nombre.value.length < 5){
        warnings += `El nombre no es valido <br>`;
        entrar = true;
    }
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido <br>`;
        entrar = true;
    }
    if(mensaje.value.length < 9){
        warnings += `El mensaje no es valido <br>`;
        entrar = true;
    }
    if(entrar){
        aviso.innerHTML = warnings;
    }else{
        aviso.innerHTML = "Enviado";
    }
});