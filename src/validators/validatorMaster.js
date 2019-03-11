'use strict'

let erros;

function ValidationMaster() {
    erros = [];
}

ValidationMaster.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        erros.push({ message: message });
}

ValidationMaster.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        erros.push({ message: message });
}

ValidationMaster.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        erros.push({ message: message });
}

ValidationMaster.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        erros.push({ message: message });
}

ValidationMaster.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        erros.push({ message: message });
}

ValidationMaster.prototype.errors = () => { 
    return erros; 
}

ValidationMaster.prototype.clear = () => {
    erros = [];
}

ValidationMaster.prototype.isValid = () => {
    return erros.length == 0;
}

module.exports = ValidationMaster;