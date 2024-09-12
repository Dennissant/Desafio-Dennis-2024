// Função principal para analisar recintos viáveis para um determinado animal
export function analisaRecinto(animal, quantidade, recintos, animais) {
    // Verifica se o animal é válido
    if (!animais[animal]) {
        return { erro: "Animal inválido", recintosViaveis: null };
    }

    // Verifica se a quantidade é válida
    if (quantidade <= 0) {
        return { erro: "Quantidade inválida", recintosViaveis: null };
    }

    // Calcula os recintos viáveis
    const recintosViaveis = recintos
        .filter(recinto => {
            const espacoNecessario = quantidade * animais[animal].tamanho;
            const espacoLivre = recinto.capacidade - (recinto.ocupacao + espacoNecessario);

            const biomaCompativel = animais[animal].bioma.includes(recinto.bioma);
            const temCarnivoro = recinto.animais.some(a => animais[a.especie].carnivoro);
            const novoAnimalCarnivoro = animais[animal].carnivoro;

            // Verifica se a coexistência é possível
            const coexistencia = !(temCarnivoro && !novoAnimalCarnivoro) && !(novoAnimalCarnivoro && recinto.animais.length > 0);

            // Log para depuração
            console.log(`Recinto: ${recinto.nome}, Espaço Livre: ${espacoLivre}, Bioma Compatível: ${biomaCompativel}, Coexistência: ${coexistencia}`);
            
            return espacoLivre >= 0 && biomaCompativel && coexistencia;
        })
        .sort((a, b) => {
            const espacoLivreA = a.capacidade - a.ocupacao;
            const espacoLivreB = b.capacidade - b.ocupacao;
            
            // Log para depuração
            console.log(`Espaço Livre A: ${espacoLivreA}, Espaço Livre B: ${espacoLivreB}`);
            
            // Prioriza maior espaço livre primeiro
            if (espacoLivreA === espacoLivreB) {
                // Se espaço livre for igual, prioriza maior capacidade total
                return b.capacidade - a.capacidade;
            }
            return espacoLivreB - espacoLivreA;
        })
        .map(recinto => `${recinto.nome} (espaço livre: ${recinto.capacidade - recinto.ocupacao} total: ${recinto.capacidade})`);

    // Verifica se existem recintos viáveis
    if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável", recintosViaveis: null };
    }

    return { erro: null, recintosViaveis };
}

// Classe RecintosZoo para gerenciar recintos e animais
class RecintosZoo {
    constructor() {
        this.recintos = [
            { nome: 'Recinto 1', bioma: 'savana', capacidade: 10, ocupacao: 3, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { nome: 'Recinto 2', bioma: 'floresta', capacidade: 5, ocupacao: 0, animais: [] },
            { nome: 'Recinto 3', bioma: 'savana e rio', capacidade: 7, ocupacao: 2, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { nome: 'Recinto 4', bioma: 'Rio', capacidade: 8, ocupacao: 0, animais: [] },
            { nome: 'Recinto 5', bioma: 'savana', capacidade: 9, ocupacao: 3, animais: [{ especie: 'LEÃO', quantidade: 1 }] }
        ];

        this.animais = {
            'LEÃO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['Rio'], carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'Rio'], carnivoro: false }
        };
    }

    // Método para analisar os recintos viáveis
    analisaRecintos(animal, quantidade) {
        return analisaRecinto(animal, quantidade, this.recintos, this.animais);
    }
}

export { RecintosZoo };
