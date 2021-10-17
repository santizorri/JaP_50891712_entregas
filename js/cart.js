//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let purshasedProduct = {}; //Creamos el objeto donde obtendremos los datos

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            purshasedProduct = resultObj.data; //Guardamos los datos creados en la variable creada
            showPurProd();
        }
        
    });

});
//Funcion que va a mostrar los productos del carrito
function showPurProd(){
    let purProd = ''; //Variable para guardar y mostrar en el HTML
    let i = 0; //Variable que usaremos de indice para mas adelante, pudiendo identificar cada obejeto

    purshasedProduct.articles.forEach((numero) => {
        purProd += `
        <tr>
            <th scope="row"> ${i + 1} </th>
            <td style="width:15%"><img src=" ${numero.src} "alt="..." class=" img-thumbnail mx-auto d-block "></td>
            <td> ${numero.name} </td>
            <td class="price"> ${numero.unitCost} </td>
            <td class='currency'> ${numero.currency} </td>
            <td><input type='number' value=${numero.count} id='cant${i}' min=0 max=10 onchange="subTotal();"></td>
            <td id='res${i}' style="font-weight: bold;"> </td>

        </tr>
        `
        i++;
    })
    document.getElementById('purshasedProd').innerHTML = purProd; //Mostramos el carrito agregandolo al HTML
    subTotal(); //Cargamos la funcion que calcula el subtotal y el total
}
//Funcion que nos calcula los totales
function subTotal(){
    let prices = document.getElementsByClassName('price'); //Obtenemos los datos de los precios de cada articulo, se crea una lista
    let count = document.getElementsByTagName('input'); //Obtenemos la cantidad de cada articulo, se crea una lista

    let total = 0; // Inicializamos la variable total

    for (let i=0; i < prices.length; i++){ //Este for recorre 
        if(purshasedProduct.articles[i].currency == "USD"){ //Este if filtra en funcion de si esta en USD o pesos
        document.getElementById('res'+i).innerHTML = parseFloat(prices[i].innerHTML) * 40 * parseFloat(count[i].value); //Escribimos los subtotales calculandolos como el precio por la cantidad
        total += parseFloat(prices[i].innerHTML) * 40 * parseFloat(count[i].value); //Vamos sumando al total
        }else{
            document.getElementById('res'+i).innerHTML = parseFloat(prices[i].innerHTML) * parseFloat(count[i].value); //Escribimos los subtotales calculandolos como el precio por la cantidad
            total += parseFloat(prices[i].innerHTML) * parseFloat(count[i].value); //Vamos sumando al total
        }
        
    }
    document.getElementById('total').innerHTML=total; // Mostramos el total en el HTML
}
