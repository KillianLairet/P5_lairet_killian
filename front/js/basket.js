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
                <td><button class="basket-delete-btn" onclick="deleteProduct('${i}')">SUPPRIMER</button></td>
            </tr>`;
        total += Number(products[i].price);
    }
    html +=
        `   <tr>
                <td colspan="2">TOTAL</td>
                <td>€${total} EUR</td>
                <td>
                    <button onclick="emptyBasket()">TOUT SUPPRIMER</button>
                    <button onclick="displayContactForm()">PAIEMENT</button>
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
        `<form method="post" action="#" id="submitForm">
            <fieldset>
                <legend>Vos coordonnées</legend>
                <p>
                    <input type="text" name="lastName" id="lastName" size="30" placeholder="Nom" value="" required>
                </p>
                <p>
                    <input type="text" name="firstName" id="firstName" size="30" placeholder="Prénom" value="" required>
                </p>
                <p>
                    <input type="email" name="email" id="email" size="30" placeholder="E-mail" value="" required>
                </p>
            </fieldset>
            <fieldset>
                <legend>Adresse de livraison</legend>
                <p>
                    <input type="text" name="address" id="address"  size="60" placeholder="Adresse" value="" required>
                </p>
                <p>
                    <input type="text" name="city" id="city"  size="30" placeholder="Ville" value="" required>
                </p>
            </fieldset>
            <p>
                <input type="reset" value="Annuler">&nbsp;&nbsp;&nbsp;
                <input type="submit" value="Valider la commande">
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
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 201) {
                console.log(this.response);
                alert('Merci de votre achat');
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
