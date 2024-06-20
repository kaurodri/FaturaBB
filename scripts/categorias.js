function categoria(cont) {

    const map = {
        supermercado: ['SAO JORGE SUPER', 'CARREFOUR'],
        uber: ['UBER'],
        credito: ['RECARGAPAY'],
        viagem: ['LATAM', 'FLIX'],
        ifood: ['IFD'],
        banco: ['ANUIDADE'],
        compras: ['CASASBAHIACOM']
    }

    const replaceCategory = (description) => {
        for (const category in map) {
            for (const keyword of map[category]) {
                if (description.includes(keyword)) {
                    return category;
                }
            }
        }
        return description;
    };

    const updatedCont = cont.map(transaction => {
        return [transaction[0], replaceCategory(transaction[1]), transaction[2]];
    });

    const categorySumMap = new Map();

    //iterar sobre as transações atualizadas.
    updatedCont.forEach(transaction => {
        const category = transaction[1]; //categoria está na segunda posição do array.
        const value = transaction[2]; //valor está na terceira posição do array.

        if (categorySumMap.has(category)) {
            //se a categoria já existe no mapa, adiciona o valor atual.
            const currentSum = categorySumMap.get(category);
            categorySumMap.set(category, currentSum + value);
        } else {
            //se a categoria não existe no mapa, cria com o valor atual.
            categorySumMap.set(category, value);
        }
    });

    return categorySumMap;
}

module.exports = categoria;