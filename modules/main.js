import { consultarCotacao, exibirResultado } from './cotacao-api.js';
import { mostrarErro, validarDataNaoFutura, validarDataLimite } from './utils.js';

function configurarDataPadrao() {
    const dataInput = document.getElementById('data');
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    
    const dataFormatada = ontem.toISOString().split('T')[0];
    dataInput.value = dataFormatada;
    dataInput.max = dataFormatada;
}

function configurarFormulario() {
    const form = document.getElementById('form-cotacao');
    const loading = document.getElementById('loading');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const moeda = document.getElementById('moedas').value;
        const data = document.getElementById('data').value;
        
        if (!validarDataNaoFutura(data)) {
            mostrarErro('Não é possível consultar cotações de datas futuras.');
            return;
        }
        
        if (!validarDataLimite(data)) {
            mostrarErro('A data deve ser dos últimos 5 anos.');
            return;
        }
        
        try {
            loading.style.display = 'block';
            document.getElementById('resultado').innerHTML = '';
            
            const resultado = await consultarCotacao(moeda, data);
            exibirResultado(resultado, moeda, data);
            
        } catch (error) {
            console.error('Erro no formulário:', error);
            
            if (error.message.includes('404') || error.message.includes('Não foi possível')) {
                mostrarErro(`Cotação não encontrada para ${moeda} na data ${data}.`);
            } else {
                mostrarErro(error.message || 'Erro desconhecido ao consultar a API.');
            }
        } finally {
            loading.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Página de câmbio carregada!');
    configurarDataPadrao();
    configurarFormulario();
});