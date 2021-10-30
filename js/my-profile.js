//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let user = JSON.parse(localStorage.getItem("usuario"));

document.addEventListener("DOMContentLoaded", function (e) {

    showData();

});

function showData(){
    if(user.firstName == undefined){
        user.firstName = "";
        user.secondName = "";
        user.firstLastName = "";
        user.email = "";
        user.phoneNumber = "";  
    }else{
        document.getElementById('innerfirstName').innerHTML = user.firstName;
        document.getElementById('innersecondName').innerHTML = user.secondName;
        document.getElementById('innerfirstLastName').innerHTML = user.firstLastName;
        document.getElementById('innersecondLastName').innerHTML = user.secondLastName;
        document.getElementById('inneremail').innerHTML = user.email;
        document.getElementById('innerphoneNumber').innerHTML = user.phoneNumber;
        document.getElementById('imagenDeUsuario').innerHTML = "<img src=" + user.profileImage + " width=100>";
    }
}

document.getElementById('saveChanges').addEventListener('click', ()=>{
    register();

    document.getElementById('innerfirstName').innerHTML = user.firstName;
    document.getElementById('innersecondName').innerHTML = user.secondName;
    document.getElementById('innerfirstLastName').innerHTML = user.firstLastName;
    document.getElementById('innersecondLastName').innerHTML = user.secondLastName;
    document.getElementById('inneremail').innerHTML = user.email;
    document.getElementById('innerphoneNumber').innerHTML = user.phoneNumber;
    document.getElementById('imagenDeUsuario').innerHTML = "<img src=" + user.profileImage + " width=100>";
});

function register(){

    user.firstName = document.getElementById('firstName').value;
    user.secondName = document.getElementById('secondName').value;
    user.firstLastName = document.getElementById('firstLastName').value;
    user.secondLastName = document.getElementById('secondLastName').value;
    user.email = document.getElementById('email').value;
    user.phoneNumber = document.getElementById('phoneNumber').value;
    user.profileImage = document.getElementById('imagenDeUsuario').src;


    if ((user.firstName.trim() == '') || (user.firstLastName.trim() == '') || (user.phoneNumber == undefined)) {
        IncompleteFields.innerHTML = "<br><br>Por favor complete los campos obligatorios (*).<br><br>";
        IncompleteFields.style.color = "red";
        IncompleteFields.style.fontWeight = "bold";
        IncompleteFields.style.display = "block";
    } else if ((user.firstName.trim() !== '') || (user.firstLastName.trim() !== '') || (user.phoneNumber !== undefined)) {
        IncompleteFields.innerHTML = " ";
        localStorage.setItem("usuario",JSON.stringify(user));
        Swal.fire({
            icon: 'success',
            title: '¡Datos guardados con con éxito!',
            showConfirmButton: false,
            timer: 1200
        })
    }
    console.log(user);
}

function fotoPred() {
    let preview = document.getElementById('imagenDeUsuario');
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result; 
    }
  
    if (file) {
      reader.readAsDataURL(file);
     
    } else {
      preview.src = "img/generic_avatar.png";
    }
  }