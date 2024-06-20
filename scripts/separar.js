function separarContent(dados) {
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
    return filteredAndSortedData;
}

module.exports = separarContent;