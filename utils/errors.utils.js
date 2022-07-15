module.exports.signUpErrors = (err) => {
    let errors = {nom: '', prenom:'', password:''}

    if(err.message.includes('nom'))
        errors.nom = "nom trop court (minimum 3 caractères)";
    
    if(err.message.includes('prenom'))
        errors.prenom = "prenom trop court (minimum 3 caractères)";
        
    if(err.message.includes('password'))
        errors.password = "le nombre de caractère pour le mot de passe doit être >=3";

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {nom:'', prenom:'', password:''}

    if(err.message.includes('nom'))
        errors.nom = "nom inconnu";

    if(err.message.includes('prenom'))
        errors.prenom = "prenom inconnu";
    
    if(err.message.includes('password'))
        errors.password = "mot de passe incorrecte";    

    return errors
}

