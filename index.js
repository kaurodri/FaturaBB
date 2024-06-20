const lerTextoDoPDF = require('./script.js');

(async () => {
    const textoDoPDF = await lerTextoDoPDF('fatura.pdf');

    let text = textoDoPDF.split('Detalhes da fatura')[1].split('SALDO')[1].split('Total da fatura: R$ 2.273,04')[0];

    //Cortes REGEX
    let lista = '';
    for (let i = 0; i < 5; i++) {

        const map = {
            0: { regex: /(Página.)([0-9]\/[0-9])/gm, sub: '' },
            1: { regex: /(.+[a-z])\:.+[0-9]/g, sub: '' },
            2: { regex: /Sao Paulo/g, sub: 'SAO PAULO' },
            3: { regex: /Parcela/g, sub: '' },
            4: { regex: /.+[a-z].+/g, sub: '' }
        }

        if (i == 0) {
            lista += text.replace(map[i].regex, map[i].sub);
        } else {
            let x = lista.replace(map[i].regex, map[i].sub);
            lista = '';
            lista += x;
        }

    }

    let start = ('00/00   ' + lista).split('\n');
    let dados = start.filter(item => item !== ''); //remove os arrays vazios.

    //separar data, conteúdo, preço
    const separarDados = (entrada) => {
        const regex = /^(\d{2}\/\d{2}) (.+) (\d+,\d+)$/;
        const match = entrada.match(regex);
        if (match) {
            return [match[1], match[2].replace(/\s+/g, ' ').trim(), parseFloat(match[3].replace(',', '.'))];
        } else {
            return null;
        }
    };
    const dadosSeparados = dados.map(separarDados);

    //ordenar por data.
    const parseDate = (dateStr) => {
        const [day, month] = dateStr.split('/').map(Number);
        return new Date(2024, month - 1, day);
    };
    const filteredAndSortedData = dadosSeparados
        .filter(item => item !== null)
        .sort((a, b) => parseDate(a[0]) - parseDate(b[0]));

    console.log(filteredAndSortedData);

    let valor = 0;
    for (let i = 0; i < 27; i++) {
        valor += filteredAndSortedData[i][2];
    }

    console.log('Valor Total: '+valor.toFixed(2));

})();