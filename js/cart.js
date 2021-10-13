//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let purshasedProduct = {};
//let purshasedProductsNumber = [];

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            purshasedProduct = resultObj.data;
            //console.log(purshasedProduct);
            showPurProd();
        }
        
    });

});

function showPurProd(){
    let purProd = '';
    let i = 0;
    purshasedProduct.articles.forEach((numero) => {
        purProd += `
        <tr>
            <th scope="row"> ${i + 1} </th>
            <td style="width:15%"><img src=" ${numero.src} "alt="..." class=" img-thumbnail mx-auto d-block "></td>
            <td> ${numero.name} </td>
            <td name="cost" class="price"> ${numero.unitCost} </td>
            <td class='currency'> ${numero.currency} </td>
            <td><input type='number' value=${numero.count} id='cant${i}' min=0 max=10 onchange="subTotal();"></td>
            <td id='res${i}' style="font-weight: bold;"> </td>

        </tr>
        `
        i++;
    })
    document.getElementById('purshasedProd').innerHTML = purProd;
    subTotal();
}

function subTotal(){
    let prices = document.getElementsByClassName('price');
    let count = document.getElementsByTagName('input');

    let total = 0;

    for (let i=0; i < prices.length; i++){
        if(purshasedProduct.articles[i].currency == "USD"){
        document.getElementById('res'+i).innerHTML = parseFloat(prices[i].innerHTML) * 40 * parseFloat(count[i].value);
        total += parseFloat(prices[i].innerHTML) * 40 * parseFloat(count[i].value);
        }else{
            document.getElementById('res'+i).innerHTML = parseFloat(prices[i].innerHTML) * parseFloat(count[i].value);
            total += parseFloat(prices[i].innerHTML) * parseFloat(count[i].value);;
        }
        
    }
    document.getElementById('total').innerHTML=total;
}
