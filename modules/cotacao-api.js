import { formatarMoeda, formatarDataHora } from './utils.js';

export async function consultarCotacao(moeda, data) {
    try {
        const url = `https://brasilapi.com.br/api/cambio/v1/cotacao/${moeda}/${data}`;
        console.log(`Consultando: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro na consulta:', error);
        throw error;
    }
}

export function exibirResultado(dados, moeda, data) {
    const resultadoDiv = document.getElementById('resultado');
    if (!dados || !dados.cotacoes || dados.cotacoes.length === 0) {
        resultadoDiv.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">❌ Dados não encontrados</h4>
                <p>Não foi possível obter a cotação para ${moeda} na data ${data}.</p>
            </div>
        `;
        return;
    }

    const ultimaCotacao = dados.cotacoes[dados.cotacoes.length - 1];
    
    resultadoDiv.innerHTML = `
        <div class="card mt-3">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0">Cotação do ${moeda}</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Data:</strong> ${data}</p>
                        <p><strong>Compra:</strong> R$ ${formatarMoeda(ultimaCotacao.cotacao_compra)}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Venda:</strong> R$ ${formatarMoeda(ultimaCotacao.cotacao_venda)}</p>
                        <p><strong>Atualizado em:</strong> ${formatarDataHora(ultimaCotacao.data_hora_cotacao)}</p>
                    </div>
                </div>
                <div class="mt-3">
                    <small class="text-muted">Fonte: BrasilAPI - Cotação de Câmbio</small>
                </div>
            </div>
        </div>
    `;
}