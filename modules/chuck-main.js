import { consultarChuck, exibirChuck } from './chuck-api.js';

export async function carregarPiadaChuck() {
    const container = document.getElementById('chuck-container');
    if (!container) return;
    
    try {
        container.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
                <p class="mt-2">Carregando fato épico do Chuck Norris...</p>
            </div>
        `;
        
        const dados = await consultarChuck();
        exibirChuck(dados);
    } catch (error) {
        console.error('Erro ao carregar piada do Chuck:', error);
        container.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">❌ Erro ao carregar</h4>
                <p>Não foi possível carregar uma piada do Chuck Norris.</p>
                <button onclick="carregarPiadaChuck()" class="btn btn-warning mt-2">Tentar Novamente</button>
            </div>
        `;
    }
}

window.carregarPiadaChuck = carregarPiadaChuck;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada! Verificando componente Chuck...');
    carregarPiadaChuck();
});