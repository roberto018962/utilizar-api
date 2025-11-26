import { 
    consultarPrevisaoTempo, 
    exibirPrevisaoTempo, 
    obterLocalizacaoUsuario,
    PRODUTOS 
} from './weather-api.js';
import { mostrarErroClima } from './utils.js';

const CONFIG_PADRAO = {
    latitude: -23.5505,  // São Paulo
    longitude: -46.6333,
    produto: 'civil'
};

let configAtual = { ...CONFIG_PADRAO };

export async function carregarPrevisaoTempo(latitude = null, longitude = null, produto = null) {
    const container = document.getElementById('weather-container');
    
    if (!container) {
        console.error('Container de previsão do tempo não encontrado no DOM');
        return;
    }
    
    try {
        if (latitude !== null) configAtual.latitude = latitude;
        if (longitude !== null) configAtual.longitude = longitude;
        if (produto !== null) configAtual.produto = produto;
        
        container.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-info" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
                <p class="mt-2">Carregando previsão do tempo...</p>
                <small>Aguarde enquanto buscamos os dados meteorológicos</small>
            </div>
        `;
        
  
        const dados = await consultarPrevisaoTempo(
            configAtual.latitude, 
            configAtual.longitude, 
            configAtual.produto
        );
        
        
        const localizacao = `Lat: ${configAtual.latitude.toFixed(4)}, Lon: ${configAtual.longitude.toFixed(4)}`;
        exibirPrevisaoTempo(dados, localizacao, configAtual.produto);
        salvarConfiguracao(configAtual);
        
    } catch (error) {
        console.error('Erro ao carregar previsão:', error);
        mostrarErroClima(`Erro: ${error.message}`);
    }
}

async function usarLocalizacaoUsuario() {
    try {
        const coords = await obterLocalizacaoUsuario();
        console.log('Localização obtida:', coords);
        await carregarPrevisaoTempo(coords.latitude, coords.longitude);
    } catch (error) {
        console.warn('Erro na geolocalização:', error.message);
        
 
        const mensagem = `
            Não foi possível obter sua localização automaticamente. 
            Motivo: ${error.message}
            <br><br>
            Usando localização padrão (São Paulo).
        `;
        
        mostrarErroClima(mensagem);
        
  
        setTimeout(() => {
            carregarPrevisaoTempo();
        }, 3000);
    }
}


export function mostrarFormularioLocalizacao() {
    const container = document.getElementById('weather-container');
    
    if (!container) {
        console.error('Container de previsão do tempo não encontrado');
        return;
    }
    
    container.innerHTML = `
        <div class="location-form-container">
            <h3>📍 Configurar Localização</h3>
            
            <form id="form-localizacao">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="latitude" class="form-label">Latitude</label>
                        <input type="number" id="latitude" class="form-control" step="any" 
                               value="${configAtual.latitude}" required
                               min="-90" max="90">
                        <small class="form-text text-muted">Ex: -23.5505 (São Paulo)</small>
                    </div>
                    
                    <div class="col-md-6">
                        <label for="longitude" class="form-label">Longitude</label>
                        <input type="number" id="longitude" class="form-control" step="any" 
                               value="${configAtual.longitude}" required
                               min="-180" max="180">
                        <small class="form-text text-muted">Ex: -46.6333 (São Paulo)</small>
                    </div>
                </div>
                
                <div class="mb-3">
                    <label for="produto" class="form-label">Tipo de Previsão</label>
                    <select id="produto" class="form-select">
                        ${Object.entries(PRODUTOS).map(([valor, nome]) => `
                            <option value="${valor}" ${configAtual.produto === valor ? 'selected' : ''}>
                                ${nome}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" onclick="voltarParaPrevisao()" class="btn btn-secondary me-md-2">
                        ↩️ Voltar
                    </button>
                    <button type="submit" class="btn btn-primary">
                        🌤️ Buscar Previsão
                    </button>
                    <button type="button" onclick="usarMinhaLocalizacao()" class="btn btn-info ms-md-2">
                        📍 Minha Localização
                    </button>
                </div>
            </form>
            
            <div class="mt-4">
                <h4>🌍 Exemplos de Cidades:</h4>
                <div class="d-grid gap-2 d-md-block">
                    <button onclick="selecionarCidade(-23.5505, -46.6333)" class="btn btn-outline-secondary btn-sm me-1 mb-1">São Paulo</button>
                    <button onclick="selecionarCidade(-22.9068, -43.1729)" class="btn btn-outline-secondary btn-sm me-1 mb-1">Rio de Janeiro</button>
                    <button onclick="selecionarCidade(-15.7975, -47.8919)" class="btn btn-outline-secondary btn-sm me-1 mb-1">Brasília</button>
                    <button onclick="selecionarCidade(-12.9714, -38.5014)" class="btn btn-outline-secondary btn-sm me-1 mb-1">Salvador</button>
                    <button onclick="selecionarCidade(-3.7327, -38.5270)" class="btn btn-outline-secondary btn-sm me-1 mb-1">Fortaleza</button>
                </div>
            </div>
        </div>
    `;
    

    const form = document.getElementById('form-localizacao');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const latitude = parseFloat(document.getElementById('latitude').value);
            const longitude = parseFloat(document.getElementById('longitude').value);
            const produto = document.getElementById('produto').value;
            
            await carregarPrevisaoTempo(latitude, longitude, produto);
        });
    }
    

    carregarConfiguracao();
}


window.selecionarCidade = function(latitude, longitude) {
    document.getElementById('latitude').value = latitude;
    document.getElementById('longitude').value = longitude;
};


window.usarMinhaLocalizacao = async function() {
    try {
        const coords = await obterLocalizacaoUsuario();
        document.getElementById('latitude').value = coords.latitude;
        document.getElementById('longitude').value = coords.longitude;
    } catch (error) {
        mostrarErroClima(`Não foi possível obter sua localização: ${error.message}`);
    }
};

window.voltarParaPrevisao = function() {
    carregarPrevisaoTempo();
};


function salvarConfiguracao(config) {
    try {
        localStorage.setItem('weather-config', JSON.stringify(config));
    } catch (error) {
        console.warn('Não foi possível salvar configuração:', error);
    }
}

function carregarConfiguracao() {
    try {
        const salvo = localStorage.getItem('weather-config');
        if (salvo) {
            const config = JSON.parse(salvo);
            configAtual = { ...configAtual, ...config };
        }
    } catch (error) {
        console.warn('Não foi possível carregar configuração:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('Módulo de previsão do tempo carregado!');

    carregarConfiguracao();
    

    if (document.getElementById('weather-container')) {
            setTimeout(() => {
            usarLocalizacaoUsuario();
        }, 500);
    }
});

window.carregarPrevisaoTempo = carregarPrevisaoTempo;
window.mostrarFormularioLocalizacao = mostrarFormularioLocalizacao;
