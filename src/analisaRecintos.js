export function analisaRecinto(animal, quantidade, recintos, animais) {
    if (!animais[animal]) {
        return { erro: "Animal inválido", recintosViaveis: null };
    }

    if (quantidade <= 0) {
        return { erro: "Quantidade inválida", recintosViaveis: null };
    }

    const calcularEspacoNecessario = (animal, quantidade) => quantidade * animais[animal].tamanho;

    const recintosViaveis = recintos
        .filter(recinto => {
            const espacoNecessario = calcularEspacoNecessario(animal, quantidade);
            const espacoLivre = recinto.capacidade - (recinto.ocupacao + espacoNecessario);
            
            const biomaCompativel = animais[animal].bioma.includes(recinto.bioma);
            
            const temCarnivoro = recinto.animais.some(a => animais[a.especie].carnivoro);
            const novoAnimalCarnivoro = animais[animal].carnivoro;
            const coexistencia = !(temCarnivoro && !novoAnimalCarnivoro) && !(novoAnimalCarnivoro && recinto.animais.length > 0);

            return espacoLivre >= 0 && biomaCompativel && coexistencia;
        })
        .sort((a, b) => {
            const espacoLivreA = a.capacidade - a.ocupacao;
            const espacoLivreB = b.capacidade - b.ocupacao;
            
            if (espacoLivreA === espacoLivreB) {
                return b.capacidade - a.capacidade;
            }
            return espacoLivreB - espacoLivreA;
        })
        .map(recinto => ({
            nome: recinto.nome,
            espacoLivre: recinto.capacidade - recinto.ocupacao,
            total: recinto.capacidade
        }));

    if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável", recintosViaveis: null };
    }

    return {
        erro: null,
        recintosViaveis: recintosViaveis.map(recinto => 
            `Recinto ${recinto.nome} (espaço livre: ${recinto.espacoLivre} total: ${recinto.total})`
        )
    };
}
