class CustomElement extends HTMLElement {
    constructor() {
        super ()
        let elem = document.createElement ( 'div' )
        elem.className = "elem"
        this.picture = document.createElement ( 'img' )
        this.setPicture ( "https://www.metaltoad.com/sites/default/files/wat_0.png" )
        elem.appendChild ( this.picture )
        let style = document.createElement ( 'style' )
        style.textContent = `
            .elem {
                background-color: grey;
            }
            img {
                width:800px;
                margin: 1.5%;
                 border: dotted 1px red;
            }
        `

        this.shadow = this.attachShadow ( { mode: 'open' } )
        this.shadow.appendChild ( style )
        this.shadow.appendChild ( elem )
    }
    setPicture ( url ) {
        this.picture.src = url
    }
}
customElements.define ('custom-element',CustomElement)
let elem = document.createElement ( 'custom-element' )
document.body.appendChild ( elem )
