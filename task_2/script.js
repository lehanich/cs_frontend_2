var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
ctx.crossOrigin = "Anonymous";
var img=document.getElementById("img");
ctx.drawImage(img,0,0);
var imgData=ctx.getImageData(0,0,c.width,c.height);


console.log(imgData)
// инвертироват цвета
for (var i=0; i<imgData.data.length; i+=4) {
//    imgData.data[i]=255-imgData.data[i];
//    imgData.data[i+1]=255-imgData.data[i+1];
//    imgData.data[i+2]=255-imgData.data[i+2];
//    imgData.data[i+3]=255;

    // imgData.data[i]= 255 & ~imgData.data[i];
    // imgData.data[i+1]= 255 & ~imgData.data[i+1];
    // imgData.data[i+2]= 255 & ~imgData.data[i+2];
    // imgData.data[i+3]=255;

    // imgData.data[i]= 255 ^ imgData.data[i];
    // imgData.data[i+1]= 255 ^ imgData.data[i+1];
    // imgData.data[i+2]= 255 ^ imgData.data[i+2];
    // imgData.data[i+3]=255;

    let lightness = parseInt((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3);

    imgData.data[i] = lightness;
    imgData.data[i + 1] = lightness;
    imgData.data[i + 2] = lightness;
}
console.log(2, imgData)
ctx.putImageData(imgData,0,0);
