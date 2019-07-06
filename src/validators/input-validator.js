'use strict';

let errors = [];

function ValidationInput() {
    errors = [];
}

ValidationInput.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

ValidationInput.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

ValidationInput.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

ValidationInput.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        errors.push({ message: message });
}

ValidationInput.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

ValidationInput.prototype.errors = () => { 
    return errors; 
}

ValidationInput.prototype.clear = () => {
    errors = [];
}

ValidationInput.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationInput;