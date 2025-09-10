export const FormatEnc = (method, encD, desEcD) => {

    let EcpData = ''
    const encrypt_data = (string) => {
        var newString = '', char, codeStr, nextChar, firstCharCode, combinedCharCode ;

        try {
            string = unescape(encodeURIComponent(string));
            char, nextChar, combinedCharCode;
            for (var i = 0; i < string.length; i += 2) {
                char = string.charCodeAt(i);

                if ((i + 1) < string.length) {


                    nextChar = string.charCodeAt(i + 1) - 31;


                    combinedCharCode = char + "" + nextChar.toLocaleString('en', {
                        minimumIntegerDigits: 2
                    });

                    newString += String.fromCharCode(parseInt(combinedCharCode, 10));

                } else {


                    newString += string.charAt(i);
                }
            }
            return newString.split("").reduce((hex, c) => hex += c.charCodeAt(0).toString(16).padStart(4, "0"), "");
        } catch (error) {
            console.log(error);
            return false
        }
    }
    const decrypt_data = (string) => {
        var newString = '', char, codeStr, firstCharCode, lastCharCode;

        try {
            string = string.match(/.{1,4}/g).reduce((acc, char) => acc + String.fromCharCode(parseInt(char, 16)), "");
            for (var i = 0; i < string.length; i++) {
                char = string.charCodeAt(i);
                if (char > 132) {
                    codeStr = char.toString(10);

                    firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);

                    lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;

                    newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
                } else {
                    newString += string.charAt(i);
                }
            }
        } catch (error) {
            newString = false
        }

        return newString;
    }
    if (method === 'enc') {
        EcpData = encrypt_data(encD)
    }
    if (method === 'des') {
        EcpData = decrypt_data(encD)
    }
    return EcpData
}