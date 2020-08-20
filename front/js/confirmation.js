/**
 * @name : Orinoco
 * @create : 20/08/2020
 * @version : 1.0.0 ALPHA
 * @author : Killian Lairet
 */




/**
 * orderSummary - Affiche la confirmation de commande avec l'Id de la commande et le prix total
 * 'orderId' est récupéré dans le localStorage
 * 'orderPrice' est l'addition de price
 * 'price' est récupéré dans le panier qui est dans le localStorage
 */
function orderSummary() {
    var target = document.getElementById('order-confirmation');
    var html = '';
    var orderId = localStorage.getItem('orderId');
    var orderPrice = 0;
    var myBasket = JSON.parse(localStorage.getItem('myBasket'));
    for (let i = 0; i < myBasket.length; i++) {
        var price = Number(myBasket[i].price);
        orderPrice += price;
    }
    html +=
        `<p class="thanks">Merci pour votre commande !</p>
        <p>
            <span>Numéro de commande</span><br>
            ${orderId}<br>
            <span>Prix total</span><br>
            €${orderPrice} EUR
        </p>
        `
    target.innerHTML = html;
}
orderSummary();
