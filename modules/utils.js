// Funções utilitárias simplificadas
export function formatarMoeda(valor) {
    if (valor === null || valor === undefined) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    }).format(valor);
}

export function formatarDataHora(dataHora) {
    if (!dataHora) return 'N/A';
    try {
        const data = new Date(dataHora);
        return data.toLocaleString('pt-BR');
    } catch (error) {
        return dataHora;
    }
}

export function mostrarErro(mensagem, elementoId = 'resultado') {
    const elemento = document.getElementById(elementoId);
    if (!elemento) return;
    
    elemento.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">❌ Erro na Consulta</h4>
            <p>${mensagem}</p>
            <small>Tente novamente mais tarde.</small>
        </div>
    `;
}

export function validarDataNaoFutura(data) {
    const hoje = new Date().toISOString().split('T')[0];
    return data <= hoje;
}

export function validarDataLimite(data) {
    const cincoAnosAtras = new Date();
    cincoAnosAtras.setFullYear(cincoAnosAtras.getFullYear() - 5);
    const dataLimite = cincoAnosAtras.toISOString().split('T')[0];
    return data >= dataLimite;
}

export function formatarPercentual(valor) {
    if (valor === null || valor === undefined) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor / 100);
}

export function formatarTemperatura(temp) {
    if (temp === null || temp === undefined) return 'N/A';
    return Math.round(temp);
}

// ... (outras funções)

// Função para mostrar erro específico para clima
export function mostrarErroClima(mensagem) {
    const container = document.getElementById('weather-container');
    if (!container) {
        console.error('Container weather-container não encontrado para exibir erro:', mensagem);
        return;
    }
    
    container.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <div class="d-flex align-items-center">
                <i class="bi bi-exclamation-triangle-fill me-2 fs-4"></i>
                <div>
                    <h4 class="alert-heading mb-2">Erro na Previsão do Tempo</h4>
                    <p class="mb-3">${mensagem}</p>
                    <div class="d-flex gap-2 flex-wrap">
                        <button onclick="mostrarFormularioLocalizacao()" class="btn btn-info btn-sm">
                            <i class="bi bi-geo-alt me-1"></i>Tentar Outra Localização
                        </button>
                        <button onclick="carregarPrevisaoTempo()" class="btn btn-secondary btn-sm">
                            <i class="bi bi-arrow-return-left me-1"></i>Voltar ao Padrão
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}