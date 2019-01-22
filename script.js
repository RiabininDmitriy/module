window.onload = function () {
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


    const checkoutBtn = document.getElementById("checkoutBtn")
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
        }
        event.preventDefault()
    }

    const radioBtn = document.getElementsByName("typeOfPickUp")
    radioBtn.forEach(typeOfPickUp => {
        typeOfPickUp.onclick = (event) => {
            let delivery = document.getElementById("delivery")
            if (event.target.id === "someone") {
                delivery.style.display = "block"
            } else {
                delivery.style.display = "none"
            }
        }
    })



    const pickUpBtn = document.getElementById("pickUpBtn")
    pickUpBtn.onclick = (event) => {
        let inputs = document.getElementById("delivery")
        const result = motherFunc(inputs)
        this.order = { ...this.order, ...result.inputObj }
        console.log(this.order)
        event.preventDefault()
    }


    const getYears = async () => {
        const years = await sendApi("http://localhost:3000/Years", 'GET')
        const yearsSelect = document.getElementById("eDataY")
        motherData(years, yearsSelect)
    }
    getYears()

    const getMonth = async () => {
        const month = await sendApi("http://localhost:3000/month", 'GET')
        const monthSelect = document.getElementById("eDataM")
        motherData(month, monthSelect)
    }
    getMonth()


    const CreateOrder = async () => {
        const order = await sendApi("http://localhost:3000/Orders", 'POST',
            JSON.stringify(this.order)
        )
        localStorage.setItem("order",order.id)
        window.location = 'index2.html' 
    }


    const cardBtn = document.getElementById("cardBtn")
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



