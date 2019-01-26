window.onload = function () {
    const checkoutBtn = document.getElementById("checkoutBtn")
    const radioBtn = document.getElementsByName("typeOfPickUp")
    const pickUpBtn = document.getElementById("pickUpBtn")
    const cardBtn = document.getElementById("cardBtn")
    const pickUp = document.getElementById("pickUp")
    const payment = document.getElementById("payment")

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

    const motherFunc = (inputs) => {
        let isValid = true
        let inputObj = {}
        const formData = new FormData(inputs)
        for (const elementInput of formData) {
            if (elementInput[1].length === 0) {
                let label = document.createElement("label")
                label.innerText = `${elementInput[0]} input is empty`
                label.className = "error"
                document.body.appendChild(label)
                isValid = false
            }
            inputObj[elementInput[0]] = elementInput[1]
        }
        return {
            isValid: isValid,
            inputObj: inputObj
        }
    }

    const motherData = (collection, Select) => {
        let option = document.createElement('option')
        option.value = "..."
        Select.appendChild(option)
        for (let elem of collection) {
            let option = document.createElement('option')
            Select.appendChild(option)
            option.value = option.innerHTML = elem.name
        }
    }

    const getCountry = async () => {
        const countries = await sendApi("http://localhost:3000/country", 'GET')
        const countrySelect = document.getElementById("country")
        motherData(countries, countrySelect)
    }

    getCountry()

    const getYears = async () => {
        const years = await sendApi("http://localhost:3000/Years", 'GET')
        const yearsSelect = document.getElementById("eDataY")
        motherData(years, yearsSelect)
    }

    const getMonth = async () => {
        const month = await sendApi("http://localhost:3000/month", 'GET')
        const monthSelect = document.getElementById("eDataM")
        motherData(month, monthSelect)
    }

    checkoutBtn.onclick = (event) => {
        let inputs = document.getElementById("users")
        const result = motherFunc(inputs)
        this.order = { ...result.inputObj }
        console.log(order)
        if (result.isValid === true) {
            sendApi("http://localhost:3000/users",
                'POST',
                JSON.stringify(result.inputObj)
            )
            pickUp.hidden = false
            console.log(pickUp)
        }
        event.preventDefault()
    }

    radioBtn.forEach(typeOfPickUp => {
        typeOfPickUp.onclick = (event) => {
            let delivery = document.getElementById("delivery")
            if (event.target.id === "someone") {
                delivery.style.display = "flex"
                payment.hidden = true
            } else {
                delivery.style.display = "none"
                getYears()
                getMonth()
                payment.hidden = false
            }
        }
    })

    pickUpBtn.onclick = (event) => {
        let inputs = document.getElementById("delivery")
        const result = motherFunc(inputs)
        if (result.isValid) {
            this.order = { ...this.order, ...result.inputObj }
            getYears()
            getMonth()
            payment.hidden = false

        }
        console.log(this.order)
        event.preventDefault()
    }

    const CreateOrder = async () => {
        const order = await sendApi("http://localhost:3000/Orders", 'POST',
            JSON.stringify(this.order)
        )
        localStorage.setItem("order", order.id)
        window.location = 'index2.html'
    }

    cardBtn.onclick = (event) => {
        let inputs = document.getElementById("card")
        const resultCardBtn = motherFunc(inputs)
        if (resultCardBtn.isValid === true) {
            this.order = { ...this.order, ...resultCardBtn.inputObj }
            CreateOrder()
        }

        event.preventDefault()
    }

}



