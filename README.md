# APIs Diversas com Web Components e Módulos ES

[](https://github.com/seu-usuario/seu-repo)
[](LICENSE)

## 🚀 Descrição do Projeto

Este projeto foi desenvolvido com o objetivo de demonstrar a integração de múltiplas APIs externas utilizando as tecnologias modernas de **Web Components** e **Módulos ES (ESM)**. A aplicação é dividida em duas páginas principais: uma que exibe dados de três APIs simultaneamente e outra dedicada à consulta de cotação de moedas.

A arquitetura é modular, garantindo um código limpo, reativo e de fácil manutenção, seguindo as melhores práticas de desenvolvimento front-end.

## ✨ Funcionalidades

### Página Principal (`index.html`)

- **Chuck Norris Facts:** Exibe uma piada aleatória do Chuck Norris. Possui um botão para carregar uma nova piada.
- **Cotação do Bitcoin:** Exibe dados em tempo real da cotação do Bitcoin (BTC), incluindo preço, volume e variações. Possui um botão para atualizar os dados.
- **Previsão do Tempo:** Exibe a previsão do tempo para 7 dias. Tenta obter a localização do usuário via Geolocation API e, em caso de falha (como em ambientes de sandbox), utiliza uma localização padrão (São Paulo, Brasil).

### Página de APIs (`apis.html`)

- **Consulta de Cotação de Moedas:** Permite ao usuário selecionar uma moeda (Dólar Americano, Euro, Libra, etc.) e uma data para consultar a cotação histórica em relação ao Real (BRL).

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura da aplicação.
- **CSS3:** Estilização básica e responsividade.
- **JavaScript (ESM):** Lógica de programação, manipulação do DOM e chamadas de API.
- **Web Components (Custom Elements):** Utilizado para criar componentes reutilizáveis de `Header`, `Menu` e `Footer`.
- **Bootstrap 5:** Framework CSS para estilização e layout.

## 📂 Estrutura do Projeto

```
projeto-js-api/
├── apis.html                 # Página de consulta de cotação
├── index.html                # Página principal (Chuck, Bitcoin, Tempo)
├── components/
│   ├── footer-component.js   # Web Component do rodapé
│   ├── header-component.js   # Web Component do cabeçalho
│   └── menu-component.js     # Web Component do menu de navegação
├── modules/
│   ├── bitcoin-api.js        # Módulo para a API do Bitcoin
│   ├── bitcoin-main.js       # Lógica principal do Bitcoin
│   ├── chuck-api.js          # Módulo para a API do Chuck Norris
│   ├── chuck-main.js         # Lógica principal do Chuck Norris
│   ├── cotacao-api.js        # Módulo para a API de Cotação de Moedas
│   ├── main.js               # Lógica principal da página de Cotação
│   ├── utils.js              # Funções utilitárias (formatação de moeda e data)
│   ├── weather-api.js        # Módulo para a API de Previsão do Tempo
│   └── weather-main.js       # Lógica principal da Previsão do Tempo
└── styles/
    └── style.css             # Estilos customizados
```

## ⚙️ Instalação e Uso

Para rodar o projeto localmente, você precisará de um servidor web simples, pois o uso de Módulos ES (`import ... from './...'`) exige que os arquivos sejam servidos via HTTP e não diretamente pelo protocolo `file://`.

1. **Clone o repositório:**
  
  ```bash
  git clone https://github.com/seu-usuario/seu-repo.git
  cd seu-repo
  ```
  
2. **Inicie um servidor HTTP local:**
  Você pode usar o Python para iniciar um servidor simples:
  
  ```bash
  python3 -m http.server 8080
  ```
  
3. **Acesse a aplicação:**
  Abra seu navegador e acesse:
  
  - **Página Principal:** `http://localhost:8080/index.html`
  - **Página de APIs:** `http://localhost:8080/apis.html`

## 🌐 APIs Utilizadas

| Funcionalidade | API | Endpoint Principal |
| --- | --- | --- |
| Chuck Norris Facts | Chuck Norris API | `https://api.chucknorris.io/jokes/random` |
| Cotação do Bitcoin | CoinLore API | `https://api.coinlore.net/api/ticker/?id=90` |
| Previsão do Tempo | 7Timer! Weather API | `https://www.7timer.info/bin/api.pl` |
| Cotação de Moedas | Brasil API | `https://brasilapi.com.br/api/cambio/v1/cotacao/{moeda}/{data}` |

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
