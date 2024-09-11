class RecintosZoo {
    constructor() {
        this.recintos = [
            { nome: 'Recinto 1', capacidade: 10, ocupacao: 5 },
            { nome: 'Recinto 2', capacidade: 5, ocupacao: 2 },
            { nome: 'Recinto 3', capacidade: 7, ocupacao: 5 },
            { nome: 'Recinto 4', capacidade: 8, ocupacao: 3 }
        ];
        this.animais = {
            'MACACO': 2,
            'CROCODILO': 1
        };
    }

    analisaRecintos(animal, quantidade) {
        const resultado = {
            erro: '',
            recintosViaveis: []
        };

        if (!this.animais.hasOwnProperty(animal)) {
            resultado.erro = "Animal inválido";
            return resultado;
        }

        if (quantidade <= 0) {
            resultado.erro = "Quantidade inválida";
            return resultado;
        }

        const espacoNecessario = this.animais[animal] * quantidade;

        const recintosViaveis = this.recintos
            .filter(r => (r.capacidade - r.ocupacao) >= espacoNecessario)
            .sort((a, b) => (a.capacidade - a.ocupacao) - (b.capacidade - b.ocupacao))
            .map(r => `${r.nome} (espaço livre: ${r.capacidade - r.ocupacao} total: ${r.capacidade})`);

        if (recintosViaveis.length === 0) {
            resultado.erro = "Não há recinto viável";
        } else {
            resultado.recintosViaveis = recintosViaveis;
        }

        return resultado;
    }
}

module.exports = RecintosZoo;
