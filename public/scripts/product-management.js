const deleteProductElements = document.querySelectorAll('.product-item button') 

async function deleteProduct(event){
    let buttonElement = event.target
    let productId = buttonElement.dataset.productid
    let csrfToken = buttonElement.dataset.csrf
    let response = await fetch('/admin/products/' + productId +'?_csrf=' + csrfToken, {
        method: 'delete'
    })
    if(!response.ok){
        alert('something went wrong')
        return
    }

    buttonElement.parentElement.parentElement.parentElement.remove()
}

for(const deleteProductElement of deleteProductElements){
    deleteProductElement.addEventListener('click', deleteProduct)

}