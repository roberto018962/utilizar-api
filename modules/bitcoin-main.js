import { consultarBitcoin, exibirBitcoin } from './bitcoin-api.js';

export async function carregarDadosBitcoin() {
    const container = document.getElementById('bitcoin-container');
    if (!container) return;
    
    try {
        container.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
                <p class="mt-2">Carregando dados do Bitcoin...</p>
            </div>
        `;
        
        const dados = await consultarBitcoin();
        exibirBitcoin(dados);
    } catch (error) {
        console.error('Erro ao carregar dados do Bitcoin:', error);
        container.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">❌ Erro ao carregar</h4>
                <p>Não foi possível carregar os dados do Bitcoin.</p>
                <button onclick="carregarDadosBitcoin()" class="btn btn-warning mt-2">Tentar Novamente</button>
            </div>
        `;
    }
}

window.carregarDadosBitcoin = carregarDadosBitcoin;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Página Bitcoin carregada! Iniciando...');
    carregarDadosBitcoin();
    
    setInterval(() => {
        console.log('Atualização automática dos dados do Bitcoin...');
        carregarDadosBitcoin();
    }, 60000);
});