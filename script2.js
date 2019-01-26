
class CustomElement extends HTMLElement {
    constructor() {
        super()
        let elem = document.createElement('div')
        elem.className = "elem"
        this.picture = document.createElement('img')
        this.setPicture("https://www.metaltoad.com/sites/default/files/wat_0.png")
        elem.appendChild(this.picture)
        let style = document.createElement('style')
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

        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(style)
        this.shadow.appendChild(elem)
    }
    setPicture(url) {
        this.picture.src = url
    }
}

window.onload = () => {
    customElements.define('custom-element', CustomElement)
    let elem = document.createElement('custom-element')
    document.body.appendChild(elem)

    const orderInfoBtn = document.getElementById("orderInfoBtn")
    const buyContinue = document.getElementById("buyContinue")
    const orderId = localStorage.getItem("order")
    const orderInfo = document.getElementById("orderInfo")

    alert(`Ваш заказ № ${orderId}`)

    const sendApi = (url, method, body) => {
        return fetch(url, {
            method: method,
            body: body,
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
    }

    const payInfo = async () => {
        let info = await sendApi(`http://localhost:3000/Orders/${orderId}`, 'GET')
        for (let element in info) {
            let lbl = document.createElement('label')
            lbl.innerText = `${element} : ${info[element]} `
            orderInfo.appendChild(lbl)
        }
    }
    orderInfoBtn.onclick = () => {
        payInfo()
    }

    buyContinue.onclick = () => {
        window.location = 'index.html'
    }
}
