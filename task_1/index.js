import { createBitGetter } from "./createBitGetter.js";

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0

console.log("set", bitGetter.set(0, 1, 0)); // 
console.log("get", bitGetter.get(0, 1));    // 0
