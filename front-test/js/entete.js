/**
 * @name : Orinoco
 * @create : 20/08/2020
 * @version : 1.0.0 ALPHA
 * @author : Killian Lairet
 */




/**
 * maj_entete - Affiche un icône panier en haut des pages avec le nombre de produit dans le panier
 * @param {number} taille Nombre de produit dans le panier
 */
function maj_entete(taille) {
    var target = document.getElementById('mon_panier');
    target.innerHTML =`<p><a href="basket.html"><img src="shopping-bag.svg"><sup>${taille}</sup></a></p>`
}
var basket = new Basket();
var taille_panier = basket.basketProducts.length;
maj_entete(taille_panier);
