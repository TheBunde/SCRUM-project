export function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export function validatePhone(phone) {
    return phone.match(/^\d{8}$/);
}