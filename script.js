const fs = require('fs');
const pdf = require('pdf-parse');

async function lerTextoDoPDF(arquivo) {
    let dataBuffer = fs.readFileSync(arquivo);
    let data = await pdf(dataBuffer);
    return data.text;
}

module.exports = lerTextoDoPDF;