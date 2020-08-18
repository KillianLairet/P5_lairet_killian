
class Basket {
    constructor() {
        this.basketId = 'myBasket';
        this.getFromStorage();
    }

    getFromStorage(){
        this.basketProducts = JSON.parse(localStorage.getItem(this.basketId));
        if (this.basketProducts == null){
            this.empty();
        }
    }

    setToStorage(){
        localStorage.setItem(this.basketId, JSON.stringify(this.basketProducts));
    }

    empty(){
        this.basketProducts = [];
        this.setToStorage();
    }

    addProduct(product){
        this.basketProducts.push(product);
        this.setToStorage();
    }

    removeProduct(idx){
        this.basketProducts.splice(idx, 1); // supprime 1 élément à la position pos
        this.setToStorage();
    }

}