
export function encode(data, schema) {
    let result = new Uint8Array(data.length);

    let elementSize = 8;
    let nextElement = 8;
    let index = 0;


    for(let [i, el] of data.entries()) {
        let bytes = schema[i][0];
        let type = schema[i][1];

        if (nextElement - bytes > 0) {
            nextElement = nextElement - bytes;
            let mask = 2**32 - 1
            console.log("nextElement ", nextElement, " el ", el.toString(2))
            console.log(" get val ", (el & (2**32 - 1 >>> 32 - bytes)).toString(2))
            console.log(" get val with mask ", ((el & (2**32 - 1 >>> 32 - bytes)) << (nextElement)).toString(2))
            result[index] = result[index] | ((el & (2**32 - 1 >>> 32 - bytes)) << (nextElement));

            console.log("parse int ", result[index].toString(2));
        } else {
            if (type === 'ascii') {
                for (let char of el) {
                    bytes = bytes - elementSize;
                    if (bytes < 0) {
                        break;
                    }
                    index++;
                    result[index] = char.charCodeAt(0);
                    console.log(result[index]);
                }
            }
            index++;
            nextElement = 8;
        }

    }
    console.log(0, result[0].toString(2));
    console.log(1, result[1].toString(2));
    console.log(2, result[2].toString(2))
    return result.buffer;
}

export function decode(data, schema) {
    let result = [];
    let view = new Uint8Array(data);

    let elementSize = 8;
    let nextElement = 8;
    console.log(schema)
    let iter = schema[Symbol.iterator](); 
    let cursor 
    cursor = iter.next();
    let [byte, type] = cursor.value;

    for (let el of view) {
        console.log("el ",el.toString(2));
        // let cursor 
        // cursor = iter.next();
        // let {value, done } = cursor
        let value = cursor.value;
        let done = cursor.done;
        console.log("start", value, done)
        if (done) {
            break;
        }
        // let [byte, type] = value;

        if(elementSize > byte) {
            nextElement = nextElement - byte;
        } else {
            if (byte >= elementSize) {
                // byte = byte - elementSize;
                nextElement = 0;
            } else {
                nextElement = byte;
            }
        }

        while ((nextElement >= 0 && !done) ) {//&& byte <= nextElement
            console.log("nextElement ", nextElement)
            let mask;
            console.log("start byte ", byte);
            if(elementSize > byte) {
                mask = ((2**32 - 1 >>> 32 - byte));
                byte = 0;
            } else {
                mask = ((2**32 - 1 >>> 32 - elementSize));
                byte = byte - elementSize;
            }
            console.log("end byte ", byte);
            console.log("mask ", mask.toString(2));

            let newValue = (el >> (nextElement)) & mask;
            console.log("nextElement", nextElement.toString(2))
            console.log("newValue ", newValue);
            if (type === 'ascii') {
                result.push(String.fromCharCode(newValue));
                console.log("val", String.fromCharCode(newValue))
            } else if( type === "boolean") {
                result.push(newValue===1);
            } else {
                result.push(newValue)
            }

            

            if (byte <=0) {
                cursor = iter.next();
                
                value = cursor.value;
                done = cursor.done;
                console.log(value, done)
                if(Array.isArray(value)){ 
                    byte = value[0];
                    type = value[1];
                }
            }

            if(elementSize > byte) {
                nextElement = nextElement - byte;
            } else {
                // nextElement = nextElement - elementSize;
                if (byte >= elementSize) {
                    nextElement = 0;
                } else {
                    nextElement = byte;
                }
                break;
            }

        }
    }

    return result;
}
