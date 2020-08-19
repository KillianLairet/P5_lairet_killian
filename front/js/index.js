/**
 *
 * to be executed when index.html is loaded
 */
var basket = new Basket();

var url = localStorage.getItem('baseURL');
var targetId = 'product-grid';

var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.response);
        for (var i = 0; i < data.length; i++) {
            displayProductForList(data[i], targetId);
        }
    }
};
xhr.send();

/**
 *
 * Display one product (to be repeated to display all available products)
 *   product: object => the product to be displayed
 *   targetId: string => id of the target container
 */
function displayProductForList(product, targetId){
    var target = document.getElementById(targetId);
    target.innerHTML +=
        `<div class="product">
            <div class="product__img">
                <a onclick="openProductPage('${product._id}')"><img class="camera-pic" src="${product.imageUrl}" alt="${product.name}" style="width: 100%;"></a>
            </div>
            <div class="product__text">
                <p class="product__text__name"><a onclick="openProductPage('${product._id}')">${product.name}</a></p>
                <p class="product__text__price">${product.price/100} EUR</p>
                <p class="product__text__description">${product.description}</p>
            </div>
        </div>`;
}
