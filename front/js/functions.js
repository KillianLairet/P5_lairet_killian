
/**
 *
 * Link to the selected product page
 *   selectedProductId: string => the id of the selected product
 */
function openProductPage(selectedProductId) {
    document.location.href= 'product.html?productId=' + selectedProductId;
}


function openCatalogPage(){
    document.location.href= 'index.html';
}

