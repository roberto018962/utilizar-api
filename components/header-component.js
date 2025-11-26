class HeaderComponent extends HTMLElement {
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
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                }
                
                .header-container {
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    color: white;
                }
                
                .logo h1 {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                }
                
                .logo-icon {
                    font-size: 1.8rem;
                }
                
                .tagline {
                    font-size: 0.9rem;
                    opacity: 0.8;
                    margin-top: 0.2rem;
                }
                
                @media (max-width: 768px) {
                    .header-container {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .logo h1 {
                        font-size: 1.3rem;
                    }
                }
            </style>
            
            <header class="header-container">
                <a href="index.html" class="logo">
                    <span class="logo-icon">🚀</span>
                    <div>
                        <h1>Usando APIs com Javascript</h1>
                        <div class="tagline">Explorando o poder das APIs</div>
                    </div>
                </a>
                
                <slot name="menu"></slot>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);
export default HeaderComponent;