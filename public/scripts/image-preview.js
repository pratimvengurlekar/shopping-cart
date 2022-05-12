let imagePickerElement = document.querySelector('#product-image-control input')
let imagePreviewElement = document.querySelector('#product-image-control img')

function updateImagePreview(){
    const files = imagePickerElement.files

    if(!files || files.length === 0){
        imagePreviewElement.getElementsByClassName.display = 'none'
        return
    }

    let pickedFile = files[0]
    imagePreviewElement.src = URL.createObjectURL(pickedFile)
    imagePreviewElement.style.display = 'block'

}

imagePickerElement.addEventListener('change', updateImagePreview)