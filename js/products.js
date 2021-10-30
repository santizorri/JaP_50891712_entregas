//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let categoriesArray = []; //Creamos un arreglo

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });
    
});   

//Con esta funcion vamos a mostrar nuestro a arreglo ademas de filtrarlo por precio

function showCategoriesList(array){
 
    if(array == undefined){
        array = categoriesArray;
    }

    maximo = document.getElementById('cantidadMax').value;
    minimo = document.getElementById('cantidadMin').value;

    if(maximo == 0 || maximo == undefined){
        maximo = 99999;
    }

    let categorias = document.getElementById('cat-list-container');
    let htmlContentToAppend = " ";
    for(let category of array){
        if(category.cost >= minimo && category.cost <= maximo){
            htmlContentToAppend += `
            <div class="col-md-6">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top" src="${category.imgSrc}">
                <h3 class="m-4"> ${category.name} </h3>
                <div class="card-body">
                    <p class="card-text"> Precio: ${category.cost} U$D <small class="text-muted float-right"> ${category.soldCount} artículos</small></p>
                    <p class="card-text"> ${category.description} </p>
                </div>
                </a>
            </div>                
            
            `
        }
       categorias.innerHTML = htmlContentToAppend;
    }
    
}

/* ESTE ES EL CODGIO QUEIMPRIME LOS PRODUCTOS COMO LISTAS, RESPONSIVE
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.soldCount + ` artículos</small>
                        </div>
                            <p class ="mb-1"> Precio: ` + category.cost + ` U$D </p> 
                            <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>*/

//TODAS LAS FUNCIONES AL MOMENTO DE LLAMARLAS

//Aca llamamos a la funcion para ordenar de manera ascendente
document.getElementById('Asc').addEventListener('click', ()=>{
    ordenarAsc();
});
//Aca llamamos a la funcion para ordenar de manera descendente
document.getElementById('Desc').addEventListener('click', ()=>{
    ordenarDesc();
});
//Aca llamamos a la funcion para ordenar por relevancia
document.getElementById('relevancia').addEventListener('click', ()=>{
    ordenarRel();
});
//Aca llamamos a la funcion buscar al momento de precionar una tecla, mientras vamos escribiendo
document.getElementById('buscador').addEventListener('keyup', ()=> {
    buscar();
})
//Aca restrablecemos todos los valores de nuevo y mostrarmos la lista sin filtros
document.getElementById("limpiarfiltro").addEventListener("click", () => {
    document.getElementById("cantidadMin").value = "";
    document.getElementById("cantidadMax").value = " ";
    document.getElementById("buscador").value = "";
    
    minimo = 0;
    maximo = 99999;

    showCategoriesList(categoriesArray);
});

//DECLARACION DE TODAS LAS FUNCIONES PARA ORDENAR Y FILTRAR

//Aca utilizamos la funcion de ordenar y luego la mostramos ordenada
function ordenarAsc(){
    ordenarPrecios(categoriesArray);
    showCategoriesList(categoriesArray);
}
//Aca utilizamos la funcion de ordenar la damos vuelta y luego la llamamos de manera reversa
function ordenarDesc(){
    ordenarPrecios(categoriesArray);
    categoriesArray.reverse();
    showCategoriesList(categoriesArray);
}
//Aca utilizamos la funcion de ordenar pero por relevancia y luego la mostramos ordenada
function ordenarRel(){
    ordenarRelevancia(categoriesArray);
    showCategoriesList(categoriesArray);
}
//En esta funcion utilizamos el sort para poder ordenar de manera ascendete los precios
function ordenarPrecios(){
    categoriesArray.sort((a,b)=>{
        if (a.cost > b.cost){
            return -1;
        }
        if (a.cost < b.cost){
            return 1;
        }else{
            return 0;
        }
    });
}
//En esta funcion se utliza sort para ordenar la relevacion, osea cantidad de articulos vendidos
function ordenarRelevancia(){
    categoriesArray.sort((a,b)=>{
        if (a.soldCount > b.soldCount){
            return -1;
        }
        if (a.soldCount < b.soldCount){
            return 1;
        }else{
            return 0;
        }
    });
}
//En esta funcion utilizamos filer para poder ir filtrando al array por nombre de cada articulos
function buscar(){
    let producto = document.getElementById('buscador').value;

    let filtrarLista = categoriesArray.filter(products => {
        return products.name.toLowerCase().indexOf(producto.toLowerCase()) > -1;
    })
    showCategoriesList(filtrarLista);
}