/**
 *
 * to be executed when basket.html is loaded
 */

var basket = new Basket();  // nouvelle instance de classe Basket pour récupérer le panier courant
affichePanier(basket, 'basket');


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
        total =+ Number(products[i].price);
    }
    html +=
        `   <tr>
                <td colspan="2">TOTAL</td>
                <td>€${total} EUR</td>
                <td>
                    <button onclick="emptyBasket()">Vider le panier</button>
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
    var panier = localStorage.getItem('myBasket')
    var html = '';

    html +=
        `<form method="post" action="validOrder()">
            <input type="hidden" name="order_Id" id="order_Id" value="${new Date().getTime()}">
            <fieldset>
                <legend>Vos coordonnées</legend>
                <p>
                    <label for="nom">Nom : </label>
                    <input type="text" name="nom" id="nom" size="30" placeholder="votre nom" value="" required>
                </p>
                <p>
                    <label for="prenom">Prénom : </label>
                    <input type="text" name="prenom" id="prenom" size="30" placeholder="votre prénom" value="" required>
                </p>
                <p>
                    <label for="email">Adresse e-mail : </label>
                    <input type="email" name="email" id="email" size="30" placeholder="votre e-mail" value="" required>
                </p>
            </fieldset>
            <fieldset>
                <legend>Adresse de livraison</legend>
                <p>
                    <label for="rue">adresse : </label>
                    <input type="text" name="rue" id="rue"  size="60" placeholder="votre adresse" value="" required>
                </p>
                <p>
                    <label for="ville">ville :</label>
                    <input type="text" name="ville" id="ville"  size="30" placeholder="nom de la ville" value="" required>
                </p>
            </fieldset>
            <p><input type="hidden" name="ordered_basket" id="ordered_basket" value=${panier}></p>
            <p>
                <input type="reset" value="Annuler">&nbsp;&nbsp;&nbsp;
                <input type="submit" value="Valider la commande">
            </p>
        </form>`;
    target.innerHTML = html;
}

function validOrder() {
    document.location.href= 'confirm.html/order';
}
