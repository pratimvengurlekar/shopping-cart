function isEmpty(value){
    return !value && value.trim() === ''
}

function uerCredentialsAreValid(email, password){
    return (
        email && 
    email.includes('@') && 
    password && 
    passowrd.trim().length >= 6 

    )
}
function userDetailsAreValid(email, password, name, street, postal, city){ 

    return (
    this.uerCredentialsAreValid(email, password) &&
    !this.isEmpty(name) &&
    !this.isEmpty(street) &&
    !this.isEmpty(postal) &&
    !this.isEmpty(city)
    )

}

function emailIsConfirmed(email,confirmEmail){
    return email === confirmEmail
}

module.exports = {
    uerCredentialsAreValid : uerCredentialsAreValid,
    userDetailsAreValid : userDetailsAreValid,
    emailIsConfirmed : emailIsConfirmed



}

