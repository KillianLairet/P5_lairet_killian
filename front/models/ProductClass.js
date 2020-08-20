/**
 * @name : Orinoco
 * @create : 20/08/2020
 * @version : 1.0.0 ALPHA
 * @author : Killian Lairet
 */




/**
 * Class pour les produits
 */
class Product {

    /**
     * Crée un nouveau produit
     * @param {string} id 
     * @param {string} name 
     * @param {string} customChoice 
     * @param {number} price 
     * @param {string} imageUrl 
     */
    constructor(id=0, name='name', customChoice='choice', price=0, imageUrl=''){
        this.id = id;
        this.name = name;
        this.customChoice = customChoice;
        this.price = price;
        this.imageUrl = imageUrl;
    }

}
