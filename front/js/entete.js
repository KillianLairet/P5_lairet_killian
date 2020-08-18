
var basket = new Basket();  // nouvelle instance de classe Basket pour récupérer le panier courant
var taille_panier = basket.basketProducts.length;
maj_entete(taille_panier);

function maj_entete(taille) {
    var target = document.getElementById('mon_panier');
    target.innerHTML =`<p><a href="basket.html">mon panier (${taille})</a></p>`
}
