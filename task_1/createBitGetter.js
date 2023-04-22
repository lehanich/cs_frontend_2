function createBitGetter(byteArray) {

    function get(arrayIndex, byteIndex) {
        console.log("-", 1 << byteIndex)
        console.log("--",byteArray[arrayIndex] & (1 << byteIndex))
        console.log("--",(byteArray[arrayIndex] & (1 << byteIndex)) === 0)
        return (byteArray[arrayIndex] & (1 << byteIndex)) !== 0 ? 1 : 0;
    }

    function set(arrayIndex, byteIndex, newValue) {
        if (newValue === 0) {
            byteArray[arrayIndex] = byteArray[arrayIndex] & ~(1<< byteIndex);
        } else {
            byteArray[arrayIndex] = byteArray[arrayIndex] | (1 << byteIndex);
        }
    }

    return { get, set }
}

export { createBitGetter };
