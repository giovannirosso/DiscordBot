function whereIsTheBaby(message) {
    let MessageArray = message.split(" ");
    let cadeOBebeArray = "cade o bebe?".split(" ");
    let kdOBebeArray = "kd o bebe?".split(" ");
    let cont = 0;
    for (let i = 0; i < cadeOBebeArray.length; i++) {
        if (
            cadeOBebeArray[i] == MessageArray[i] ||
            kdOBebeArray[i] == MessageArray[i]
        ) {
            cont++;
        }
    }
    if (cont >= 2) {
        return true;
    } else {
        return false;
    }
}

module.exports = whereIsTheBaby;
