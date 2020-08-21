/**
 * @name : Orinoco
 * @create : 20/08/2020
 * @version : 1.0.0 ALPHA
 * @author : Killian Lairet
 */




var url = localStorage.getItem('baseURL');

/**
 * affichePanier - Affiche le panier en fonction du panier construit dans le localStorage
 * @param {Object} basket Récupère le panier
 * @param {string} targetId Id de la cible HTML
 */
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
    console.log('test_b1 - OK');
}
var basket = new Basket();
affichePanier(basket, 'basket');

/**
 * deleteProduct - Supprimer un produit du panier et affiche le nouveau panier
 * @param {number} idx L'index du produit à supprimer
 */
function deleteProduct(idx){
    basket.removeProduct(idx);
    affichePanier(basket, 'basket');
    maj_entete(basket.basketProducts.length);
}

/**
 * emptyBasket - Supprime tous les produits du panier et affiche le panier vide
 */
function emptyBasket() {
    basket.empty();
    affichePanier(basket, 'basket');
    maj_entete(basket.basketProducts.length)
}

/**
 * displayContactForm - Affiche le formulaire de contact
 */
function displayContactForm(){
    var target = document.getElementById('contactInfos');
    var html = '';

    html +=
        `<form class="form" method="post" action="#" id="submitForm">
            <div class="form__info">
                <legend class="legend">Vos coordonnées</legend>
                <p>
                    <input class="textInput" type="text" name="lastName" id="lastName" placeholder="Nom" value="" required>
                </p>
                <p>
                    <input class="textInput" type="text" name="firstName" id="firstName" placeholder="Prénom" value="" required>
                </p>
                <p>
                    <input class="textInput" type="email" name="email" id="email" placeholder="E-mail" value="" required>
                </p>
            </div>
            <div class="form__delivery">
                <legend class="legend">Adresse de livraison</legend>
                <p>
                    <input class="textInput" type="text" name="address" id="address"  placeholder="Adresse" value="" required>
                </p>
                <p>
                    <input class="textInput" type="text" name="city" id="city"  placeholder="Ville" value="" required>
                </p>
            </div>
            <p class="form__btn">
                <input class="cancelForm-btn" type="reset" value="ANNULER">
                <input class="order-btn" type="submit" value="CONFIRMER">
            </p>
        </form>`;
    target.innerHTML = html;
    console.log('test_b4 - OK');

    /**
     * Fait une reqête Ajax de type POST à l'envoi du formulaire
     * Si la requête est correcte alors on stock l'Id de la commande dans le localStorage et on ouvre la page de confirmation
     */
    document.getElementById('submitForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        var contact = {};
        formData.forEach(function(value, key){
            contact[key] = value;
        });
        alert('1 - Création objet contact'); //TODO:test_b5

        var products = [];
        var myBasket = JSON.parse(localStorage.getItem('myBasket'));
        for (let i = 0; i < myBasket.length; i++) {
            products.push(myBasket[i].id);
        }
        alert('2 - Création tableau produit'); //TODO:test_b5

        var toSend = {contact, products};

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 201) {
                var response = JSON.parse(this.response);
                alert('3 - Ajax request succesful'); //TODO:test_b5
                localStorage.setItem('orderId', response.orderId);
                alert('4 - Envoie orderId dans le localStorage'); //TODO:test_b5
                console.log('test_b5 - OK');
                alert('5 - Ouverture de la page de confirmation'); //TODO:test_b5
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
