
function extrasToNum(extras) {
    if (!extras) {
        return undefined;
    }
    return parseInt(extras);
}

function extractExtras(str) {
    const strikes = str.match(/\+\s?[1-4]/g);
    const grammarConjunctions = str.split(" и ").length - 1;
    if ((!strikes || strikes.length === 0 || strikes[0] === str) && grammarConjunctions === 0) {
        return undefined;
    } else if (strikes && strikes.length > 1) {
        console.warn(`Card with name "${str}" have many extra guests!`)
    }

    const extras = strikes && strikes.length > 0 ? extrasToNum(strikes[0].replace(/ /g, '')) : 0;

    return grammarConjunctions + extras;
}

function extractEmail(str) {
    return str.replace("\\n", " ").split(" ").find(it => it.indexOf("@") > 1);
}

function extractGreeting(str) {
    return str
        .replace(/\+\s?[1-4]/g, "")
        .replace(/ +(?= )/g,'')
        .trim();
}

function extractName(str) {
    let buffer = "";
    const entries = str.split(" ");
    if (entries.length < 2) {
        console.error(`Too short name: ${str}`);
        return str;
    }

    for(let i = 0; i < 2; i++) {
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

module.exports = {extractExtras, extractEmail, extractName, extractPhoneNumber, extractGreeting};
