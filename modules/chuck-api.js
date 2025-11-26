export async function consultarChuck() {
    try {
        const url = 'https://api.chucknorris.io/jokes/random';
        
        console.log('Consultando Chuck Norris...');
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error('Erro ao consultar Chuck Norris:', error);
        throw error;
    }
}

export function exibirChuck(dados) {
    const container = document.getElementById('chuck-container');
    if (!container) return;
    
    if (!dados || !dados.value) {
        container.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">❌ Piada não encontrada</h4>
                <p>Não foi possível obter uma piada do Chuck Norris.</p>
                <button onclick="carregarPiadaChuck()" class="btn btn-warning mt-2">Tentar Novamente</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">💪 Chuck Norris Facts</h5>
                <p class="card-text">"${dados.value}"</p>
                <div class="mt-2">
                    <small class="text-muted">
                        Atualizado em: ${new Date(dados.updated_at).toLocaleDateString('pt-BR')}
                    </small>
                </div>
                <button onclick="carregarPiadaChuck()" class="btn btn-warning mt-3">Nova Piada 💪</button>
            </div>
        </div>
    `;
}