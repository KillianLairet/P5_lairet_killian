/**
 * @name : Orinoco
 * @create : 20/08/2020
 * @version : 1.0.0 ALPHA
 * @author : Killian Lairet
 */




var basket = new Basket();

/**
 * Fait une requête Ajax de type GET à 'url'
 * 'url' est récupérer dans le localStorage
 */
var url = localStorage.getItem('baseURL');
var targetId = 'product-grid';
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.response);
        alert('Ajax Request succesful'); //TODO:test_i1
        console.log('test_i1 - OK');
        for (var i = 0; i < data.length; i++) {
            displayProductForList(data[i], targetId);
        }
    } else if (xhr.readyState === 4) {
        alert('Une erreur est survenue');
    }
};
xhr.send();

/**
 * displayProductForList - Affiche un produit (la boucle for dans la requête Ajax permet de le répéter pour tous les produits disponibles)
 * @param {object} product Le produit à afficher
 * @param {string} targetId Id de la cible HTML
 */
function displayProductForList(product, targetId) {
    var target = document.getElementById(targetId);
    target.innerHTML +=
        `<div class="product">
            <div class="product__img">
                <a onclick="openProductPage('${product._id}')"><img class="camera-pic" src="${product.imageUrl}" alt="${product.name}" style="width: 100%;"></a>
            </div>
            <div class="product__text">
                <p class="product__text__name"><a onclick="openProductPage('${product._id}')">${product.name}</a></p>
                <p class="product__text__price">${product.price / 100} EUR</p>
                <p class="product__text__description">${product.description}</p>
            </div>
        </div>`;
    console.log('test_i2 - OK');
}

/**
 * openProductPage - Ouvre la page produit en lui ajout l'Id du produit en paramètre d'Url
 * @param {string} selectedProductId L'Id du produit sélectionner 
 */
function openProductPage(selectedProductId) {
    console.log('test_i3 - OK');
    alert('test_i3 - en cours'); //TODO:test_i3
    document.location.href= 'product.html?productId=' + selectedProductId;
}
