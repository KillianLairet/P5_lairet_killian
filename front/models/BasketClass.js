/**
 * @name : Orinoco
 * @create : 20/08/2020
 * @version : 1.0.0 ALPHA
 * @author : Killian Lairet
 */




 /**
 * Class pour le panier d'achat
 */
class Basket {

    /**
     * Créer et récupère le panier dans le Storage
     */
    constructor() {
        this.basketId = 'myBasket';
        this.getFromStorage();
    }

    /**
     * Récupère le panier du localStorage
     */
    getFromStorage(){
        this.basketProducts = JSON.parse(localStorage.getItem(this.basketId));
        if (this.basketProducts == null){
            this.empty();
        }
    }

    /**
     * Actualise le panier dans le localStorage
     */
    setToStorage(){
        localStorage.setItem(this.basketId, JSON.stringify(this.basketProducts));
    }

    /**
     * Créer un tableau vide dans le Storage lorsque celui-ci est vide
     */
    empty(){
        this.basketProducts = [];
        this.setToStorage();
    }

    /**
     * Ajoute l'objet produit dans le panier du localStorage
     * @param {Object} product L'objet produit
     */
    addProduct(product){
        this.basketProducts.push(product);
        this.setToStorage();
    }

    /**
     * Supprime un produit du panier
     * @param {number} idx L'index du produit à supprimer
     */
    removeProduct(idx){
        this.basketProducts.splice(idx, 1); // supprime 1 élément à la position pos
        this.setToStorage();
    }
}
