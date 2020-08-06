/**
 * @name : orinoco
 * @create : 08/05/2020
 * @version : 1.0.0
 * @author : Killian Lairet
 */


 // GET DATA
 var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const camera = new Camera(data[i]);
            camera.addToDom('#product-grid')
        }
    }
};

xhr.open('GET', 'http://localhost:3000/api/cameras');
xhr.send();

// PUSH NEW CAMERA ON HTML
class Camera {
    constructor(camera) {
        this.description = camera.description
        this.imageUrl = camera.imageUrl
        this.lenses = camera.lenses
        this.name = camera.name
        this.price = camera.price
        this._id = camera._id
    }

    addToDom(parentSelector) {
        this.html = `<div class="product"><div class="product__img"><a onclick="openPage('${this._id}')"><img class="camera-pic" src="${this.imageUrl}" alt="${this.name}" style="width: 100%;"></a></div><div class="product__text"><p class="product__text__name">${this.name}</p><p class="product__text__price">€${this.price} EUR</p><p class="product__text__description">${this.description}</p></div></div>`;
        let parentElement = document.querySelector(parentSelector);
        parentElement.innerHTML += this.html;
    }

}

// LINK TO PRODUCT-PAGE & _ID
function openPage(i) {
    document.location.href= 'product-page.html?id=' + i;
}
