class MenuComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    padding: 10px;
                }
                ul {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                li {
                    margin: 0 10px;
                }
                a {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
            <nav>
                <ul>
                    <li><a href="index.html">Página Principal</a></li>
                    <li><a href="apis.html">Página de APIs</a></li>
                </ul>
            </nav>
        `;
    }
}

customElements.define('menu-component', MenuComponent);
export default MenuComponent;