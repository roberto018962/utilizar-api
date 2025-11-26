import { formatarMoeda, formatarPercentual } from './utils.js';


export async function consultarBitcoin() {
    try {
        const url = 'https://api.coinlore.net/api/ticker/?id=90';
        
        console.log('Consultando dados do Bitcoin...');
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error('Erro ao consultar dados do Bitcoin:', error);
        throw error;
    }
}

export function exibirBitcoin(dados) {
    const container = document.getElementById('bitcoin-container');
    if (!container) return;
    
    if (!dados || !Array.isArray(dados) || dados.length === 0 || !dados[0]) {
        container.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">❌ Dados não encontrados</h4>
                <p>Não foi possível obter os dados do Bitcoin.</p>
            </div>
        `;
        return;
    }
    
    const bitcoin = dados[0];
    console.log('Dados do Bitcoin:', bitcoin);
    
    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="card-title mb-0">₿ ${bitcoin.name} (${bitcoin.symbol})</h5>
                    <span class="badge bg-secondary">Rank #${bitcoin.rank}</span>
                </div>
                
                <div class="row mb-3">
                    <div class="col-md-6">
                        <p><strong>Preço:</strong> $${formatarMoeda(parseFloat(bitcoin.price_usd))}</p>
                        <p><strong>Market Cap:</strong> $${formatarMoeda(parseFloat(bitcoin.market_cap_usd))}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Volume 24h:</strong> $${formatarMoeda(parseFloat(bitcoin.volume24))}</p>
                        <p><strong>Supply:</strong> ${parseFloat(bitcoin.csupply).toLocaleString('pt-BR')} ${bitcoin.symbol}</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-4 text-center">
                        <p class="mb-1">1h</p>
                        <span class="badge ${parseFloat(bitcoin.percent_change_1h) >= 0 ? 'bg-success' : 'bg-danger'}">
                            ${formatarPercentual(bitcoin.percent_change_1h)}
                        </span>
                    </div>
                    <div class="col-md-4 text-center">
                        <p class="mb-1">24h</p>
                        <span class="badge ${parseFloat(bitcoin.percent_change_24h) >= 0 ? 'bg-success' : 'bg-danger'}">
                            ${formatarPercentual(bitcoin.percent_change_24h)}
                        </span>
                    </div>
                    <div class="col-md-4 text-center">
                        <p class="mb-1">7d</p>
                        <span class="badge ${parseFloat(bitcoin.percent_change_7d) >= 0 ? 'bg-success' : 'bg-danger'}">
                            ${formatarPercentual(bitcoin.percent_change_7d)}
                        </span>
                    </div>
                </div>
                
                <div class="mt-3">
                    <small class="text-muted">Fonte: CoinLore API | Atualizado em tempo real</small>
                    <button onclick="recarregarBitcoin()" class="btn btn-sm btn-outline-success float-end">🔄 Atualizar</button>
                </div>
            </div>
        </div>
    `;
}

window.recarregarBitcoin = async function() {
    await carregarDadosBitcoin();
};