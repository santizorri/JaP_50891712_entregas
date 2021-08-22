//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) { });

// Esta función recogera los datos y los procesará
function verificar() {

    //En estas lineas extraemos los datos de registo
    let dato = document.getElementById("user");
    let contrasena = document.getElementById("key");

    let usuario = {}; //Objeto que va a guardar el usuario

    if (dato.value.trim() === "" && contrasena.value.trim() === "") { //En este caso es cuando los dos campos estan vacios

        //Agregamos la clase que inventamos
        dato.classList.add("isInvalid");
        contrasena.classList.add("isInvalid");
        
        msj.innerHTML = "Dato requerido"; //Le ponemos el texto al cartelito
        msj.style.color = "red"; //Le damos color rojo al cartelito
        msj.style.fontWeight = "bold"; //Lo ponemos en negrita
        msj.style.display = "block"; //Mostramos el cartelito

    } else if (contrasena.value.trim() === "" && dato.value.trim() !== "") { //Caso de solo campo contrasena vacia

        //Agregamos la clase que inventamos
        contrasena.classList.add("isInvalid");
        dato.classList.add("isValid");
        //Mostramos el mensaje de que son datos requeridos
        msj.innerHTML = "Dato requerido";
        msj.style.color = "red";
        msj.style.fontWeight = "bold";
        msj.style.display = "block";

    } else if (contrasena.value.trim() !== "" && dato.value.trim() === "") {//Caso de solo campo usuario vacia 
  
        //Agregamos la clase que inventamos
        dato.classList.add("isInvalid"); 
        contrasena.classList.add("isValid");
        //Mostramos el mensaje de que son datos requeridos
        msj.innerHTML = "Dato requerido"; 
        msj.style.color = "red"; 
        msj.style.fontWeight = "bold";
        msj.style.display = "block"; 

    } else {

        //Agregamos la clase que inventamos
        dato.classList.add("isValid"); 
        contrasena.classList.add("isValid"); 
        //Enviamos a la pagina principal del programa
        location.href = "home.html";
        //Asignamos los valores al objeto usuario: nombre, imgen (generica por este medio) y estado
        usuario.nombre = dato.value;
        //Le agregamos un avatar predeterminado
        let imageUrl = new Image();
        imageUrl.src = "img/generic_avatar.png";
        usuario.imagen = imageUrl.src;
        usuario.estado = "conectado";
        //Guardamos los datos en el Local Storage
        localStorage.setItem("usuario", JSON.stringify(usuario));
        sessionStorage.setItem("usuario", JSON.stringify(usuario));

    }
}
//En esta seccion de codigo vemos si hay usuario que haya entrado previamente y lo redirrecionamos directamente a la pagina principal
//En caso negativo imprimimos en la consola que no hay usuraio y entramos a la pantalla de login
document.addEventListener("DOMContentLoaded", () => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario == null) {
        console.log("No hay usuario");
    } else if (usuario.estado == "conectado") {
        location.href = "home.html";
    }
});

