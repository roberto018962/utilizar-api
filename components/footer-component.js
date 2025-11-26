class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                }
                
                .footer-container {
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                a {
                    color: white;
                    text-decoration: none;
                }
                
                a:hover {
                    text-decoration: underline;
                }
                
                .tagline {
                    font-size: 0.9rem;
                    opacity: 0.8;
                    margin-top: 0.2rem;
                }
                
                @media (max-width: 768px) {
                    .footer-container {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                }
            </style>
            
            <footer class="footer-container">
                <div>
                    <a href="https://mit-license.org/" target="_blank">Página criada sob a licença MIT</a>
                    <div class="tagline">Explorando o poder das APIs</div>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);
export default FooterComponent;