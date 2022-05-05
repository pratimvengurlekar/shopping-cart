let mobileMenuBtnElement = document.getElementById('mobile-menu-btn')
let mobileMenuElement = document.getElementById('mobile-menu')

function toggleMenuBtn(){
    mobileMenuElement.classList.toggle('open')
}

mobileMenuBtnElement.addEventListener('click', toggleMenuBtn)