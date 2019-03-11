'use strict'

let errorMessage = "";

function ErrorMessage() {
    errorMessage = "";
}

ErrorMessage.prototype.getMessage = (campo, validador, extra) => {
    switch(validador) {
        case "isRequired":
            errorMessage = `Campo ${campo} é obrigatório!`;
            break;
        case "hasMinLen":
            errorMessage = `Campo ${campo} deve conter no mínimo ${extra} caracteres!`;
            break;
        case "hasMaxLen":
            errorMessage = `Campo ${campo} deve conter no máximo ${extra} caracteres!`;
            break;
        case "isFixedLen":
            errorMessage = `Campo ${campo} deve conter ${extra} caracteres!`;
            break;
        case "isEmail":
            errorMessage = `E-mail inválido!`;
            break;
        default:
            errorMessage = "Invalidação genérica.";
    }

    return errorMessage;
}

module.exports = ErrorMessage;