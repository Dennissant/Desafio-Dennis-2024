/**
 * Função para analisar a viabilidade de recintos para novos animais.
 * @param {string} animal - O nome da espécie de animal a ser alocado.
 * @param {number} quantidade - A quantidade de animais a serem alocados.
 * @param {Array} recintos - Lista de recintos disponíveis.
 * @param {Object} animais - Dados sobre as espécies de animais.
 * @returns {Object} - Um objeto contendo a lista de recintos viáveis ou uma mensagem de erro.
 */
export function analisaRecinto(animal, quantidade, recintos, animais) {
    // Verifica se o animal é válido
    if (!animais[animal]) {
        return { erro: "Animal inválido", recintosViaveis: null };
    }

    // Verifica se a quantidade é válida
    if (quantidade <= 0) {
        return { erro: "Quantidade inválida", recintosViaveis: null };
    }

    // Calcula o espaço necessário para acomodar a quantidade de animais
    const calcularEspacoNecessario = (animal, quantidade) => quantidade * animais[animal].tamanho;

    // Filtra os recintos que podem acomodar o animal
    const recintosViaveis = recintos
        .filter(recinto => {
            const espacoNecessario = calcularEspacoNecessario(animal, quantidade);
            const espacoLivre = recinto.capacidade - (recinto.ocupacao + espacoNecessario);
            
            // Verifica se o bioma do recinto é compatível com o animal
            const biomaCompativel = animais[animal].bioma.includes(recinto.bioma);
            
            // Verifica se o recinto pode acomodar o animal carnívoro ou não carnívoro
            const temCarnivoro = recinto.animais.some(a => animais[a.especie].carnivoro);
            const novoAnimalCarnivoro = animais[animal].carnivoro;
            const coexistencia = !(temCarnivoro && !novoAnimalCarnivoro) && !(novoAnimalCarnivoro && recinto.animais.length > 0);

            return espacoLivre >= 0 && biomaCompativel && coexistencia;
        })
        .sort((a, b) => {
            const espacoLivreA = a.capacidade - a.ocupacao;
            const espacoLivreB = b.capacidade - b.ocupacao;
            
            // Ordena os recintos pelo espaço livre disponível (maior primeiro)
            if (espacoLivreA === espacoLivreB) {
                // Se o espaço livre for igual, prioriza o recinto com maior capacidade total
                return b.capacidade - a.capacidade;
            }
            return espacoLivreB - espacoLivreA;
        })
        .map(recinto => ({
            nome: recinto.nome,
            espacoLivre: recinto.capacidade - recinto.ocupacao,
            total: recinto.capacidade
        }));

    // Se não houver recintos viáveis, retorna uma mensagem de erro
    if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável", recintosViaveis: null };
    }

    // Retorna a lista de recintos viáveis formatada
    return {
        erro: null,
        recintosViaveis: recintosViaveis.map(recinto => 
            `Recinto ${recinto.nome} (espaço livre: ${recinto.espacoLivre} total: ${recinto.total})`
        )
    };
}
