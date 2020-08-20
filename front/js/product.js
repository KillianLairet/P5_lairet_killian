/**
 * @name : Orinoco
 * @create : 20/08/2020
 * @version : 1.0.0 ALPHA
 * @author : Killian Lairet
 */



 
/**
 * Recherche du paramètre 'productId' dans l'Url, si oui alors on récupère la valeur et on fait une requête Ajax
 */
var paramKey = 'productId';
var params = new URLSearchParams(document.location.search);
if (params.has(paramKey)) {
    var paramValue = params.get(paramKey);
    getProductInfos();
} else {
    alert('aucun produit selectionné...');
}

/**
 * getProductInfos - Fait une requête Ajax de type GET à 'url'
 * 'url' est récupérer dans le localStorage
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
 * displayProductForList - Affiche un produit (la boucle for dans la requête Ajax permet de le répéter pour tous les produits disponibles)
 * @param {object} product Le produit à afficher
 * @param {string} targetId Id de la cible HTML
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
 * buildFormPart - afficher une liste de choix en fonction du nombre d'option disponible
 * @param {string} element L'élément du produit à afficher
 * @return {string} Renvoie le code HTML à afficher
 */
function buildFormPart(element){
    var html = '';
    for (var i=0; i<element.length; i++){
        html += `<option value="${element[i]}">${element[i]}</option>`;
    }
    return html;
}

/**
 * openBasketPage - Crée un nouveau objet produit, crée un objet panier et y ajoute le produit, ouvre la page 'basket.html'
 * @param {string} selectedProductId L'Id du produit
 * @param {string} selectedProductName Le nom du produit
 * @param {string} selectedProductPrice Le prix du produit
 */
function openBasketPage(selectedProductId, selectedProductName, selectedProductPrice, selectedProductImageUrl) {
    var selectedCustomIndex = document.getElementById("customChoice").selectedIndex;
    var selectedCustom = document.getElementById("customChoice").options[selectedCustomIndex].value;
    var product = new Product(selectedProductId, selectedProductName, selectedCustom, selectedProductPrice, selectedProductImageUrl);  // création objet produit
    var basket = new Basket();  // création objet basket pour récupérer le contenu du panier courant
    basket.addProduct(product);  // ajout du produit dans le panier
    document.location.href= 'basket.html';
}
