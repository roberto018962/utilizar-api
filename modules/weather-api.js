import { mostrarErroClima, formatarTemperatura } from './utils.js';

export const PRODUTOS = {
    astro: 'Astronômico',
    civil: 'Civil',
    civillight: 'Civil Light', 
    meteo: 'Meteorológico',
    two: 'Two-Week-Overview'
};

function mapearCondicaoTempo(codigoTempo, produto = 'civil') {
    const mapeamento = {
        civil: {
            clearday: { icone: '☀️', descricao: 'Céu limpo' },
            clearnight: { icone: '🌙', descricao: 'Noite limpa' },
            pcloudyday: { icone: '⛅', descricao: 'Parcialmente nublado' },
            pcloudynight: { icone: '☁️', descricao: 'Noite parcialmente nublada' },
            mcloudyday: { icone: '🌤️', descricao: 'Muito nublado' },
            mcloudynight: { icone: '🌥️', descricao: 'Noite muito nublada' },
            cloudyday: { icone: '☁️', descricao: 'Nublado' },
            cloudynight: { icone: '☁️', descricao: 'Noite nublada' },
            humidday: { icone: '🌫️', descricao: 'Neblina' },
            humidnight: { icone: '🌫️', descricao: 'Neblina noturna' },
            lightrainday: { icone: '🌦️', descricao: 'Chuva leve' },
            lightrainnight: { icone: '🌧️', descricao: 'Chuva leve noturna' },
            oshowerday: { icone: '🌦️', descricao: 'Chuva passageira' },
            oshowernight: { icone: '🌧️', descricao: 'Chuva passageira noturna' },
            ishowerday: { icone: '🌦️', descricao: 'Pancadas de chuva' },
            ishowernight: { icone: '🌧️', descricao: 'Pancadas de chuva noturna' },
            lightsnowday: { icone: '🌨️', descricao: 'Neve leve' },
            lightsnownight: { icone: '🌨️', descricao: 'Neve leve noturna' },
            rainday: { icone: '🌧️', descricao: 'Chuva' },
            rainnight: { icone: '🌧️', descricao: 'Chuva noturna' },
            snowday: { icone: '❄️', descricao: 'Neve' },
            snownight: { icone: '❄️', descricao: 'Neve noturna' },
            rainsnowday: { icone: '🌨️', descricao: 'Chuva com neve' },
            rainsnownight: { icone: '🌨️', descricao: 'Chuva com neve noturna' },
            tsday: { icone: '⛈️', descricao: 'Tempestade' },
            tsnight: { icone: '⛈️', descricao: 'Tempestade noturna' },
            tsrainday: { icone: '⛈️', descricao: 'Tempestade com chuva' },
            tsrainnight: { icone: '⛈️', descricao: 'Tempestade com chuva noturna' }
        },
        civillight: {
            cleared: { icone: '☀️', descricao: 'Limpo' },
            pclouded: { icone: '⛅', descricao: 'Parcialmente nublado' },
            mclouded: { icone: '🌤️', descricao: 'Muito nublado' },
            clouded: { icone: '☁️', descricao: 'Nublado' },
            rain: { icone: '🌧️', descricao: 'Chuva' },
            snow: { icone: '❄️', descricao: 'Neve' },
            ts: { icone: '⛈️', descricao: 'Tempestade' },
            tsrain: { icone: '⛈️', descricao: 'Tempestade com chuva' }
        }
    };

    const mapa = mapeamento[produto] || mapeamento.civil;
    return mapa[codigoTempo] || { icone: '❓', descricao: 'Condição desconhecida' };
}

function mapearVelocidadeVento(codigo) {
    const velocidades = {
        1: { descricao: 'Calmo', velocidade: '< 0.3 m/s' },
        2: { descricao: 'Leve', velocidade: '0.3-3.4 m/s' },
        3: { descricao: 'Moderado', velocidade: '3.4-8.0 m/s' },
        4: { descricao: 'Fresco', velocidade: '8.0-10.8 m/s' },
        5: { descricao: 'Forte', velocidade: '10.8-17.2 m/s' },
        6: { descricao: 'Vendaval', velocidade: '17.2-24.5 m/s' },
        7: { descricao: 'Tempestade', velocidade: '24.5-32.6 m/s' },
        8: { descricao: 'Furacão', velocidade: '> 32.6 m/s' }
    };
    return velocidades[codigo] || { descricao: 'Desconhecido', velocidade: 'N/A' };
}

export function exibirPrevisaoTempo(dados, localizacao, produto = 'civil') {
    const container = document.getElementById('weather-container');
    
    if (!container) {
        console.error('Elemento com id "weather-container" não encontrado');
        return;
    }
    
    // Verificação mais tolerante da estrutura dos dados
    if (!dados || !dados.dataseries) {
        console.error('Estrutura de dados inválida:', dados);
        mostrarErroClima('Estrutura de dados inválida recebida da API');
        return;
    }
    
    const previsoes = Array.isArray(dados.dataseries) ? 
        dados.dataseries.slice(0, 7).filter(item => item && typeof item === 'object') : [];
    
    if (previsoes.length === 0) {
        container.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">⚠️ Sem dados disponíveis</h4>
                <p>Não há previsões disponíveis para esta localização.</p>
                <button onclick="mostrarFormularioLocalizacao()" class="btn btn-info mt-2">
                    🔄 Tentar Outra Localização
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="card shadow-sm border-0">
            <div class="card-header bg-info text-white">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 class="mb-1">🌤️ Previsão do Tempo</h4>
                        <p class="mb-0">${localizacao}</p>
                        <small>Produto: ${PRODUTOS[produto]}</small>
                    </div>
                    <div class="text-end">
                        <small>Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</small>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="row g-0">
                    ${previsoes.map((previsao, index) => {
                        const data = new Date();
                        data.setDate(data.getDate() + index);
                        
                        // Valores padrão para dados faltantes
                        const condicao = mapearCondicaoTempo(previsao.weather || 'clearday', produto);
                        const vento = mapearVelocidadeVento(previsao.wind10m?.speed || 0);
                        const temperatura = previsao.temp2m !== undefined && previsao.temp2m !== null ? 
                            formatarTemperatura(previsao.temp2m) : 'N/A';
                        const umidade = previsao.rh2m && previsao.rh2m !== "N/A" ? previsao.rh2m : 'N/A';
                        
                        return `
                            <div class="col-md-3 col-sm-6">
                                <div class="card h-100 border-0 border-end">
                                    <div class="card-body text-center">
                                        <h6 class="card-title text-primary fw-bold">
                                            ${index === 0 ? 'Hoje' : index === 1 ? 'Amanhã' : `Dia ${index + 1}`}
                                        </h6>
                                        <p class="card-text text-muted small mb-2">
                                            ${data.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}
                                        </p>
                                        
                                        <div class="my-3">
                                            <div style="font-size: 2.5rem;">${condicao.icone}</div>
                                            <p class="card-text small text-muted mt-1">${condicao.descricao}</p>
                                        </div>
                                        
                                        <div class="temperature mb-3">
                                            <span class="h4 text-danger fw-bold">
                                                ${temperatura}${temperatura !== 'N/A' ? '°C' : ''}
                                            </span>
                                        </div>
                                        
                                        <div class="weather-details">
                                            <div class="d-flex justify-content-between small mb-1">
                                                <span class="text-muted">Vento:</span>
                                                <span class="fw-semibold">${vento.descricao}</span>
                                            </div>
                                            <div class="d-flex justify-content-between small mb-1">
                                                <span class="text-muted">Umidade:</span>
                                                <span class="fw-semibold ${umidade === 'N/A' ? 'text-muted' : ''}">
                                                    ${umidade}${umidade !== 'N/A' ? '%' : ''}
                                                </span>
                                            </div>
                                            ${previsao.prec_amount !== undefined && previsao.prec_amount !== null ? `
                                                <div class="d-flex justify-content-between small">
                                                    <span class="text-muted">Precipitação:</span>
                                                    <span class="fw-semibold">Nível ${previsao.prec_amount}</span>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <div class="card-footer bg-light">
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <small class="text-muted">
                        Fonte: 7Timer! Weather API | 
                        Total de previsões: ${previsoes.length} dias
                    </small>
                    <div class="mt-2 mt-md-0">
                        <button onclick="recarregarPrevisao()" class="btn btn-sm btn-outline-info">
                            <i class="bi bi-arrow-clockwise"></i> Atualizar
                        </button>
                        <button onclick="alterarLocalizacao()" class="btn btn-sm btn-outline-secondary ms-1">
                            <i class="bi bi-geo-alt"></i> Alterar Local
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function obterLocalizacaoUsuario() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocalização não suportada pelo navegador'));
            return;
        }
        
        const options = {
            enableHighAccuracy: true,
            timeout: 10000, // 10 segundos
            maximumAge: 60000 // 1 minuto
        };
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
            },
            (error) => {
                let mensagemErro = 'Erro desconhecido na geolocalização';
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        mensagemErro = 'Permissão de localização negada pelo usuário';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        mensagemErro = 'Informação de localização indisponível';
                        break;
                    case error.TIMEOUT:
                        mensagemErro = 'Tempo esgotado para obter localização';
                        break;
                }
                
                reject(new Error(mensagemErro));
            },
            options
        );
    });
}

function corrigirJSONPrevisao(textoJSON) {
    try {
        return JSON.parse(textoJSON);
    } catch (erroParse) {
        console.warn('JSON malformado detectado. Tentando correção...', erroParse);
        
        try {
     
            let jsonCorrigido = textoJSON
                .replace(/"temp2m",\s*"rh2m"/g, '"temp2m": null, "rh2m"')
                .replace(/"temp2m",\s*"wind10m"/g, '"temp2m": null, "wind10m"')
                .replace(/"temp2m",\s*}/g, '"temp2m": null }')
                .replace(/"rh2m": ""/g, '"rh2m": "N/A"')
                .replace(/"prec_amount": -?\d+/g, (match) => {
                    const valor = parseInt(match.split(':')[1].trim());
                    return valor >= 0 ? match : `"prec_amount": 0`;
                })
                
                 .replace(/"direction": "-9999"/g, '"direction": "N/A"')
                
                 .replace(/"speed": -9999/g, '"speed": 0');

       
            const dados = JSON.parse(jsonCorrigido);
            
            // Pós-processamento: limpar dados problemáticos
            if (dados.dataseries && Array.isArray(dados.dataseries)) {
                dados.dataseries = dados.dataseries.map(item => {
                    // Garantir que todos os campos obrigatórios existam
                    return {
                        timepoint: item.timepoint || 0,
                        cloudcover: item.cloudcover === -9999 ? 0 : (item.cloudcover || 0),
                        lifted_index: item.lifted_index === -9999 ? 0 : (item.lifted_index || 0),
                        prec_type: item.prec_type || 'none',
                        prec_amount: item.prec_amount < 0 ? 0 : (item.prec_amount || 0),
                        temp2m: item.temp2m === undefined || item.temp2m === null ? 20 : item.temp2m, // Valor padrão 20°C
                        rh2m: item.rh2m === "" ? "N/A" : (item.rh2m || "N/A"),
                        wind10m: {
                            direction: item.wind10m?.direction === "-9999" ? "N/A" : (item.wind10m?.direction || "N/A"),
                            speed: item.wind10m?.speed === -9999 ? 0 : (item.wind10m?.speed || 0)
                        },
                        weather: item.weather || 'clearday'
                    };
                });
            }
            
            console.log('JSON corrigido com sucesso');
            return dados;
            
        } catch (erroCorrecao) {
            console.error('Falha na correção do JSON:', erroCorrecao);
            throw new Error('Não foi possível processar os dados da API (JSON inválido)');
        }
    }
}


export async function consultarPrevisaoTempo(latitude, longitude, produto = 'civil') {
    try {
        if (!latitude || !longitude) {
            throw new Error('Latitude e longitude são obrigatórios');
        }

        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            throw new Error('Coordenadas inválidas');
        }

        if (!Object.keys(PRODUTOS).includes(produto)) {
            throw new Error('Produto de previsão inválido');
        }


        const url = `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=${produto}&output=json`;
        
        console.log(`Consultando previsão: ${url}`);
        

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos

        const response = await fetch(url, { 
            signal: controller.signal,
            mode: 'cors'
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('Resposta bruta:', text.substring(0, 500)); // Log mais extenso para debug
        

        const dados = corrigirJSONPrevisao(text);
        
        return dados;
        
    } catch (error) {
        console.error('Erro ao consultar previsão do tempo:', error);
        
        if (error.name === 'AbortError') {
            throw new Error('Timeout: A API demorou muito para responder');
        } else if (error.message.includes('Failed to fetch')) {
            throw new Error('Erro de conexão. Verifique sua internet.');
        } else if (error.message.includes('JSON') || error.message.includes('dados da API')) {
            throw new Error('Resposta inválida da API de previsão');
        }
        
        throw error;
    }
}


window.recarregarPrevisao = function() {
    if (typeof carregarPrevisaoTempo === 'function') {
        carregarPrevisaoTempo();
    }
};

window.alterarLocalizacao = function() {
    if (typeof mostrarFormularioLocalizacao === 'function') {
        mostrarFormularioLocalizacao();
    }
};
