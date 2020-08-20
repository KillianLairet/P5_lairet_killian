/**
 *
 * to be executed when basket.html is loaded
 */

var basket = new Basket();  // nouvelle instance de classe Basket pour récupérer le panier courant
affichePanier(basket, 'basket');
var url = localStorage.getItem('baseURL');

function affichePanier(basket, targetId){
    var products = basket.basketProducts;
    var target = document.getElementById(targetId);
    var html = '';
    html +=
        `<table>`;
    var total = 0;
    for (var i=0; i<products.length; i++){
        html +=
            `<tr>
                <td><img src=${products[i].imageUrl} style="width: 150px;"></td>
                <td>${products[i].name}</td>
                <td>${products[i].customChoice}</td>
                <td class="basket-product-price">€${products[i].price} EUR</td>
                <td><button class="delete-btn" onclick="deleteProduct('${i}')">SUPPRIMER</button></td>
            </tr>`;
        total += Number(products[i].price);
    }
    html +=
        `   <tr class="bkt-end">
                <td class="bkt-end__total" colspan="2">TOTAL</td>
                <td class="bkt-end__price">€${total} EUR</td>
                <td class="bkt-end__btn">
                    <button class="deleteAll-btn" onclick="emptyBasket()">TOUT SUPPRIMER</button>
                    <button class="payment-btn" onclick="displayContactForm()">PAIEMENT</button>
                </td>
            </tr>
        </table>`;
    target.innerHTML = html;
}

function deleteProduct(idx){
    basket.removeProduct(idx);
    affichePanier(basket, 'basket');
    maj_entete(basket.basketProducts.length);
}

function emptyBasket() {
    basket.empty();
    affichePanier(basket, 'basket');
    maj_entete(basket.basketProducts.length)
}

function displayContactForm(){
    var target = document.getElementById('contactInfos');
    var html = '';

    html +=
        `<form class="form" method="post" action="#" id="submitForm">
            <div class="form__info">
                <legend class="legend">Vos coordonnées</legend>
                <p>
                    <input class="textInput" type="text" name="lastName" id="lastName" placeholder="Nom" value="kiki" required>
                </p>
                <p>
                    <input class="textInput" type="text" name="firstName" id="firstName" placeholder="Prénom" value="lai" required>
                </p>
                <p>
                    <input class="textInput" type="email" name="email" id="email" placeholder="E-mail" value="kl@icloud.com" required>
                </p>
            </div>
            <div class="form__delivery">
                <legend class="legend">Adresse de livraison</legend>
                <p>
                    <input class="textInput" type="text" name="address" id="address"  placeholder="Adresse" value="1 rue pierre" required>
                </p>
                <p>
                    <input class="textInput" type="text" name="city" id="city"  placeholder="Ville" value="paris" required>
                </p>
            </div>
            <p class="form__btn">
                <input class="cancelForm-btn" type="reset" value="ANNULER">
                <input class="order-btn" type="submit" value="CONFIRMER">
            </p>
        </form>`;
    target.innerHTML = html;

    /**
     * request AJAX method POST - send data to server
     */
    document.getElementById('submitForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        var contact = {};
        formData.forEach(function(value, key){
            contact[key] = value;
        });

        var products = [];
        var myBasket = JSON.parse(localStorage.getItem('myBasket'));
        for (let i = 0; i < myBasket.length; i++) {
            products.push(myBasket[i].id);
        }

        var toSend = {contact, products};

        var xhr = new XMLHttpRequest();
        console.log(xhr)
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 201) {
                console.log(this.response)
                var response = JSON.parse(this.response);
                localStorage.setItem('orderId', response.orderId);
                document.location.href = 'confirmation.html';
            } else if(this.readyState == 4) {
                alert('Une erreur est survenue');
            }
        };
        xhr.open('POST', url + 'order');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(toSend));
    
        return false;
    });
}
