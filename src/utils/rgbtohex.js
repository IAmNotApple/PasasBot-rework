const rgbToHex = function(rgb) { 
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
};

const fullColorHex = function(r, g, b) {   
    let red = rgbToHex(r);
    let green = rgbToHex(g);
    let blue = rgbToHex(b);
    return red + green + blue;
};

exports.fullColorHex = fullColorHex;
exports.rgbToHex = rgbToHex;