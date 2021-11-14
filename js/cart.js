//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let purshasedProduct = {}; //Creamos el objeto donde obtendremos los datos

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            purshasedProduct = resultObj.data; //Guardamos los datos creados en la variable creada
            showPurProd();
            subTotal();
        }
        
    });
    document.getElementById("standardRadio").addEventListener("change", function(){
        showPurProd();
        subTotal();
    });
    document.getElementById("expressRadio").addEventListener("change", function(){
        showPurProd();
        subTotal();
    });
    document.getElementById("premiumRadio").addEventListener("change", function(){
        showPurProd();
        subTotal();
    });
    document.getElementById("creditCardPaymentRadio").addEventListener("change", function(){
        Boolean = true;
        if(Boolean){
            document.getElementById("bankAccountNumber").disabled = true;
            document.getElementById("creditCardNumber").disabled = false;
            document.getElementById("creditCardSecurityCode").disabled = false;
            document.getElementById("dueDate").disabled = false;
            Boolean = false;
        }
        
    });
    document.getElementById("bankingRadio").addEventListener("change", function(){
        Boolean = true;
        if(Boolean){
            document.getElementById("creditCardNumber").disabled = true;
            document.getElementById("creditCardSecurityCode").disabled = true;
            document.getElementById("dueDate").disabled = true;
            document.getElementById("bankAccountNumber").disabled = false;
            Boolean = false;
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
            <td><button class="btn btn-danger" onclick="deletItem(${i});"> Eliminar </button> </td>

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

    document.getElementById('total').innerHTML = total; // Mostramos el total en el HTML

    //let total = 0;
    let subtotal = 0;
    let shippingCost = 0;

    //subtotal = parseFloat(document.getElementById('total').innerHTML);
    subtotal = total;

    let shipping = document.getElementsByName('shippingRadio');
    
    if(shipping[0].checked){
        shippingCost = (subtotal*0.05).toFixed(0);
        document.getElementById('shippingCost').innerHTML = shippingCost;
        total = parseInt(shippingCost) + parseInt(subtotal);
        document.getElementById('finalTotal').innerHTML= total;
    }else if(shipping[1].checked){
        shippingCost = (subtotal*0.07).toFixed(0);
        document.getElementById('shippingCost').innerHTML = shippingCost;
        total = parseInt(shippingCost) + parseInt(subtotal);
        document.getElementById('finalTotal').innerHTML= total;
    }else if(shipping[2].checked){
        shippingCost = (subtotal*0.15).toFixed(0);
        document.getElementById('shippingCost').innerHTML = shippingCost;
        total = parseInt(shippingCost) + parseInt(subtotal);
        document.getElementById('finalTotal').innerHTML= total;
    }

}

function deletItem(i){
    purshasedProduct.articles.splice(i,1);
    if (purshasedProduct.articles.length >= 1){
        showPurProd();
        subTotal();
    }else{
        document.getElementById('purshasedProd1').innerHTML = '<h3 class="text-center"> <b>No hay artículos en su carrito. </b> </h3>'
        subTotal();
    }
}

function paymentVerification(){
    
    let paymentRadios = document.getElementsByName('paymentType');

    if(paymentRadios[0].checked === false && paymentRadios[1].checked === false){

        paymentTypeFeedback.classList.add("isInvalid");
        paymentTypeFeedback.innerHTML = "Debe seleccionar una forma de pago";
        
    }else if (paymentRadios[0].checked && paymentRadios[1].checked === false){

        paymentTypeFeedback.classList.remove("isInvalid");
        paymentTypeFeedback.classList.add("isValid");
        paymentTypeFeedback.innerHTML = "Métodod de pago seleccionado: Tarjeta de Crédito." ;
   
        
    }else if(paymentRadios[0].checked === false && paymentRadios[1].checked){

        paymentTypeFeedback.classList.remove("isInvalid");
        paymentTypeFeedback.classList.add("isValid");
        paymentTypeFeedback.innerHTML = "Métodod de pago seleccionado: Transferencia bancaria." ;

    }

}

function fieldsVerification(){

    let street = document.getElementById("shippingStreet");
    let streetNumber = document.getElementById("shippingStreetNumber");
    let corner = document.getElementById("shippingCornerStreet");

    if (street.value.trim() === "" || streetNumber.value.trim() === "" || corner.value.trim() === "") { //En este caso es cuando los dos campos estan vacios

        shippingStreet.classList.add("is-invalid");
        shippingStreetNumber.classList.add("is-invalid");
        shippingCornerStreet.classList.add("is-invalid");

    }else if(street.value.trim() !== "" || streetNumber.value.trim() !== "" || corner.value.trim() !== ""){

        shippingStreet.classList.remove("is-invalid");
        shippingStreetNumber.classList.remove("is-invalid");
        shippingCornerStreet.classList.remove("is-invalid");

        shippingStreet.classList.add("is-valid");
        shippingStreetNumber.classList.add("is-valid");
        shippingCornerStreet.classList.add("is-valid");

    }

    let paymentRadios = document.getElementsByName('paymentType');
    let cardNumber = document.getElementById('creditCardNumber');
    let cardSecurityCode = document.getElementById('creditCardSecurityCode');
    let cardDueDate = document.getElementById('dueDate');
    let bankAccountNumber = document.getElementById('bankAccountNumber');

    if(paymentRadios[0].checked === false && paymentRadios[1].checked === false){

        paymentTypeFeedback.classList.add("isInvalid");
        paymentTypeFeedback.innerHTML = "Debe seleccionar una forma de pago";
        
    }else if(paymentRadios[0].checked && (cardNumber.value.trim() === "" || cardSecurityCode.value.trim() === "" || cardDueDate.value.trim() === "")){

        paymentTypeIncomplete.innerHTML = "Complete todos los campos del metodo de pago.";
        paymentTypeIncomplete.style.color = "red"; //Le damos color rojo al cartelito
        paymentTypeIncomplete.style.fontWeight = "bold"; //Lo ponemos en negrita
   
        
    }else if(paymentRadios[1].checked && bankAccountNumber.value.trim() === ""){

        paymentTypeIncomplete.innerHTML = "Complete todos los campos del metodo de pago.";
        paymentTypeIncomplete.style.color = "red"; //Le damos color rojo al cartelito
        paymentTypeIncomplete.style.fontWeight = "bold"; //Lo ponemos en negrita  

    }else if((paymentRadios[1].checked && bankAccountNumber.value.trim() !== "")||(paymentRadios[0].checked && (cardNumber.value.trim() !== "" || cardSecurityCode.value.trim() !== "" || cardDueDate.value.trim() !== ""))){

        paymentTypeIncomplete.innerHTML = "";

        if((street.value.trim() !== "") && (paymentRadios[1].checked && bankAccountNumber.value.trim() !== "" || paymentRadios[0].checked && cardNumber.value.trim() !== "")){
            purshasedAlert.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>¡Compra realizada con éxito!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `
        }
    }
}
