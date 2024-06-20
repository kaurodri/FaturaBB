const lerTextoDoPDF = require('./scripts/script.js');
const textoPDF = require('./scripts/texto.js');
const separarContent = require('./scripts/separar.js');
const categoria = require('./scripts/categorias.js');

(async () => {
    const textoDoPDF = await lerTextoDoPDF('fatura.pdf');

    let dados = textoPDF(textoDoPDF);
    let cont = separarContent(dados);
    let cate = categoria(cont);

    console.log(cont,cate);
})();