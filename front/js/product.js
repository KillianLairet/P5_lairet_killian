/**
 *
 * to be executed when product.html is loaded
 */

// motclé à chercher dans l'url
var paramKey = 'productId';

var params = new URLSearchParams(document.location.search);
if (params.has(paramKey)) {  //on cherche si motclé présent dans url
    var paramValue = params.get(paramKey);  // on récupère la valeur
    // si ok on fait requete
    getProductInfos();
}
else {
    alert('aucun produit selectionné...');
}

/**
 *
 * request to server to obtain chosen product informations
 */
function getProductInfos() {
    var url = localStorage.getItem('baseURL') + paramValue;
    var targetId = 'product-detail';  // id container cible
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.response);
            displayProduct(data, targetId);
        }
    };
    xhr.send();
}

/**
 *
 * Display all information for selected product
 *   product: object => product to be displayed
 *   targetId: string => id of the target container
 */
function displayProduct(product, targetId){
    var target = document.getElementById(targetId);
    var htmlForCustomize = buildFormPart(product.lenses);
    target.innerHTML +=
        `<div class="product--page__img">
            <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%;">
        </div>
        <div class="product--page__text">
            <p class="product--page__text__name">${product.name}</p>
            <p class="product--page__text__price">${product.price/100} EUR</p>
            <p class="product--page__text__description">${product.description}</p>
            <select class="custom-choice-btn" name="customChoice" id="customChoice">${htmlForCustomize}</select>
            <button class="add-to-cart-btn" onclick="openBasketPage('${product._id}', '${product.name}', '${product.price/100}', '${product.imageUrl}')">Ajouter au panier</button>
        </div>`;
}


/**
 *
 * Display the form part with the number of options available for customization
 *   element: string => the element of product to be displayed
 *   return: string => the html part for customization
 */
function buildFormPart(element){
    var html = '';
    for (var i=0; i<element.length; i++){
        html += `<option value="${element[i]}">${element[i]}</option>`;
    }
    return html;
}

/**
 *
 * Create a new Product object, update de basket, store in localStorage and link to the basket page
 *   selectedProductId: string => the product id
 *   selectedProductName: string => the product name
 *   selectedProductPrice: string => the product price
 */
function openBasketPage(selectedProductId, selectedProductName, selectedProductPrice, selectedProductImageUrl) {
    var selectedCustomIndex = document.getElementById("customChoice").selectedIndex;
    var selectedCustom = document.getElementById("customChoice").options[selectedCustomIndex].value;
    var product = new Product(selectedProductId, selectedProductName, selectedCustom, selectedProductPrice, selectedProductImageUrl);  // création objet produit
    var basket = new Basket();  // création objet basket pour récupérer le contenu du panier courant
    basket.addProduct(product);  // ajout du produit dans le panier
    document.location.href= 'basket.html';
}
