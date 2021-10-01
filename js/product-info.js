//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let product = {}
let productsArray = [];

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let categoryHTML = document.getElementById("category");
            let soldCountHTML = document.getElementById("soldCount");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + ' U$D';
            categoryHTML.innerHTML = product.category;
            soldCountHTML.innerHTML = product.soldCount;
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            //Obtengo cuales son los productos relacionados
            relatedProductsNumber = product.relatedProducts;

            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    productsArray = resultObj.data;
                    //Muestro las categorías ordenadas
                    console.log(productsArray);
                    showRelProd();
                }
            });

        }
    });

});


//Funcion que obtiene las imagenes y las agrega al html

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

let comments = [];

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            //Muestro las categorías ordenadas
            showComments(comments);
        }
    });

});

//Funcion que arma el html de los comentarios una vez tenemos los datos
function showComments(array) {

    if (array == undefined) {
        array = comments;
    }

    let comments = document.getElementById('com-list-container');
    let htmlContentToAppend = " ";

    for (let comment of array) {
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user + `</h4>
                            <small class="text-muted">` + comment.dateTime + ` </small>
                        </div> 
                            <p class="mb-1">` + comment.description + `</p>
                            <p class="float-right"> `+ califico(comment.score) + `</p>
                    </div>
                </div>
            </div>    
            `
        comments.innerHTML = htmlContentToAppend;
    }

}

//Funcion que recopila los datos del comentario y del usuario para agregarlo a la lista de comentarios
function showUserComment() {
    let starChecked = document.getElementsByName('estrellas');
    let starNumber = undefined;

    for (i = 0; i < 5; i++) {
        if (starChecked[i].checked == true) {
            starNumber = starChecked[i].value;
        }
    }

    let comment = {};
    comment.user = usuario.nombre;
    comment.description = document.getElementById("commentText").value;
    comment.dateTime = dateFilter();
    comment.score = starNumber;

    if ((comment.user.trim() == '') || (comment.description.trim() == '') || (comment.score == undefined)) {
        IncompleteFields.innerHTML = "Por favor complete todos los campos.<br><br>";
    } else if ((comment.user.trim() !== '') && (comment.description.trim() !== '') && (comment.score !== undefined)) {
        IncompleteFields.innerHTML = " ";
        comments.push(comment);
        Swal.fire({
            icon: 'success',
            title: '¡Comentario enviado con éxito!',
            showConfirmButton: false,
            timer: 1200
        })
    }
}

//Funcion que muestra la lista y setea los valores de los campos
document.getElementById("addCom").addEventListener("click", () => {
    showComments(comments); //Mostramos la lista.
    document.getElementById("commentText").value = '';
    unselect();
});

//Funcion asociada al boton para cancelar comentario antes de ser enviado
function deleteComment() {
    Swal.fire({
        title: '¿Quiere cancelar su comentario?',
        text: "¡En caso de querer comentar, deberá escribir su reseña nuevamente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Comentario eliminado!',
                '',
                'success'
            )
            document.getElementById("commentText").value = '';
            IncompleteFields.innerHTML = " ";
            unselect();
        }
    })
}


//Filtro de la fecha
function dateFilter() {
    let date = new Date();
    let formatted_date = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return formatted_date;
}

//Funcion la cual me escribe las estrellas dentro del html
function califico(scoreNum) {//

    let stars = "";

    for (let i = 1; i <= 5; i++) {//La puntuación máxima es de 5, así que... cuento hasta 5

        if (i <= scoreNum) { //Cuento y pregunto 

            stars += '<i style= "color: #ff8000" class="fas fa-star "></i>';//Pongo una estrellita llena

        } else {
            stars += '<i style= "color: #ff8000" class="far fa-star "></i>';//Pongo el contorno
        }
    }

    return stars;
}

//Borra las estrellas seleccionadas
function unselect() {
    document.querySelectorAll('[Type=radio]').forEach((x) => x.checked = false);
}


//Entrega 4, parte de productos relacionados

function showRelProd(){
    let relProd = '';

    relatedProductsNumber.forEach((numero) => {
        relProd += `
        <a href="products.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + productsArray[numero].imgSrc + `" alt="` + productsArray[numero].description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ productsArray[numero].name +`</h4>
                        <small class="text-muted">` + productsArray[numero].soldCount + ` artículos</small>
                    </div>
                        <p class ="mb-1"> Precio: ` + productsArray[numero].cost + ` U$D </p> 
                        <p class="mb-1">` + productsArray[numero].description + `</p>
                </div>
            </div>
        </a>
        `
    })
    document.getElementById('relatedProd').innerHTML = relProd;
}