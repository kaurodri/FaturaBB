function textoPDF(texto) {

    let text = texto.split('Detalhes da fatura')[1].split('SALDO')[1].split('Total da fatura: R$ 2.273,04')[0];

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

    return dados;
}

module.exports = textoPDF;