function extractExtras(str) {
    const strikes = str.match(/\+\s?[1-4]/g);
    if (!strikes || strikes.length === 0 || strikes[0] == str) {
        return undefined;
    } else if (strikes.length > 1) {
        console.warn(`Card with name "${str}" have many extra guests!`)
    }
    return strikes[0].replace(/ /g, '');
}

function extractEmail(str) {
    return str.split(" ").find(it => it.indexOf("@") > 1);
}

function extractName(str) {
    let buffer = "";
    const entries = str.split(" ");
    for(let i = 0; i < entries.length; i++) {
        if(entries[i].indexOf("@") > -1 || entries[i].indexOf("+") > -1) {
            return buffer.trim();
        } else {
            buffer += ` ${entries[i]}`;
        }
    }
    return buffer.trim();
}

function extractPhoneNumber(str) {
    const strikes = str.match(/\+7\d{10}/g);
    if (!strikes || strikes.length === 0) {
        return undefined;
    } else if (strikes.length > 1) {
        console.warn(`Card with name "${str}" have many phone numbers!`)
    }
    return strikes[0].replace(/ /g, '');
}

module.exports = {extractExtras, extractEmail, extractName, extractPhoneNumber};
