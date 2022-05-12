
let cartItemUpdateElements = document.querySelectorAll('.cart-item-management')

async function updateCart(event){
    let response
    let form
    try {
    event.preventDefault()
    form = event.target
    let formButtonElement = form.querySelector('button')
    

    let productId = formButtonElement.dataset.productid
    let csrf = formButtonElement.dataset.csrf
    let quantity = form.firstElementChild.value
    response = await fetch('/cart/items',{
        method: 'PATCH',
        body: JSON.stringify({
            productId: productId,
            quantity: quantity,
            _csrf: csrf
        }),
        headers:{
            'Content-Type': 'application/json'
        }

    })
    } catch (error) {
        console.log(error)
        alert('Something went wrong')
        return
        
    }

    if(!response.ok){
        console.log(error)
        alert('Something went wrong')
        return
    }

    let responseData = await response.json()
    console.log(responseData)
    if(responseData.updatedCartData.updatedPrice === 0){
        form.parentElement.parentElement.remove()
    }else{
        console.log(form.parentElement)
        let cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price')
        cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedPrice

    }
    

    let cartTotalPriceElement = document.getElementById('cart-total-price')
    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice

    let badgeElement = document.querySelector('.nav-items .badge')
    badgeElement.textContent = responseData.updatedCartData.newTotalQuantity


    


}

for(let cartItemUpdateElement of cartItemUpdateElements){
    cartItemUpdateElement.addEventListener('submit', updateCart)
}