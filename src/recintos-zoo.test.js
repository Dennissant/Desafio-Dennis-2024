import { RecintosZoo } from './recintos-zoo.js';

test('Deve encontrar recinto para 1 crocodilo', () => {
    const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
    expect(resultado.erro).toBeNull();
    expect(resultado.recintosViaveis).toContain('Recinto 4 (espaço livre: 8 total: 8)');
    expect(resultado.recintosViaveis.length).toBe(1);
});

test('Deve encontrar recinto para 2 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
    expect(resultado.erro).toBeNull();
    expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 7 total: 10)');
    expect(resultado.recintosViaveis).toContain('Recinto 2 (espaço livre: 5 total: 5)');
    expect(resultado.recintosViaveis.length).toBe(2);
});

test('Deve encontrar recinto para 1 hipopótamo', () => {
    const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
    expect(resultado.erro).toBeNull();
    expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 7 total: 10)');
    expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 5 total: 7)');
    expect(resultado.recintosViaveis.length).toBe(2);
});

test('Não deve encontrar recintos para 2 leões se não houver espaço', () => {
    const resultado = new RecintosZoo().analisaRecintos('LEÃO', 2);
    expect(resultado.erro).toBe("Não há recinto viável");
    expect(resultado.recintosViaveis).toBeNull();
});

test('Deve considerar espaço extra para mais de uma espécie no recinto', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
    expect(resultado.erro).toBeNull();
    expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 7 total: 10)');
    expect(resultado.recintosViaveis).toContain('Recinto 2 (espaço livre: 5 total: 5)');
    expect(resultado.recintosViaveis.length).toBe(2);
});
