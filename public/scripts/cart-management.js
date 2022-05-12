let addtoCartElement = document.querySelector('#product-details button')
let badgeElement = document.querySelector('.nav-items .badge')

async function addtoCart(){
    let productid = addtoCartElement.dataset.productid
    let csrf= addtoCartElement.dataset.csrf
    let response
    try {
        response = await fetch('/cart/items/',{
            method: 'post',
            body: JSON.stringify({
                productid: productid,
                _csrf: csrf

            }),
            headers:{
                'Content-Type':'application/json'
            }
        }
        
        )
        
    } catch (error) {
        alert('Something went wrong')
        return
        
    }
    if(!response.ok){
        alert('Something went wrong')
        return
    }
    console.log(response)


    let responseData = await response.json()
    const newTotalQuantity = responseData.newTotalItems
    badgeElement.textContent = newTotalQuantity

    
}

addtoCartElement.addEventListener('click', addtoCart)