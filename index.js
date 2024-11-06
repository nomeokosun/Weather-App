let form = document.getElementById("form")
let input = document.getElementById("input")
let button = document.getElementById("button")
let APIKEY = "87ecd1b95700446b4d4f7c7b601efe31"
let minMaxTempContainer = document.getElementById("min-and-max-temp")
let bottomContainer = document.getElementById("bottom-container")


form.addEventListener("submit", function(event){
    event.preventDefault()
    let inputValue = input.value
    collectWeatherReport(inputValue)
    form.reset()

})
   
  

    
    
function collectWeatherReport(inputValue){
    let weatherRequest = new XMLHttpRequest()
    weatherRequest.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKEY}`)

    weatherRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let data = JSON.parse(this.responseText)
            printWeatherOnUI(data)       
        }
    }
    weatherRequest.send()
}

function printWeatherOnUI(data){
     bottomContainer.innerHTML = ``
     let temperature = data.main.temp
     let highTemp = data.main.temp_max
     let lowTemp = data.main.temp_min
     let humidity = data.main.humidity
     let nameOfCity = data.name
     console.log(data)

     let nameOfCityAndDate = document.createElement("div")
     nameOfCityAndDate.classList.add("name-of-city-and-date")

     let cityName = document.createElement("h2")
     cityName.textContent = `${nameOfCity}`

     let  tempContainer = document.createElement("div")
     tempContainer.classList.add("temperature-container")

     let displayCurrentTemp = document.createElement("h2")
     displayCurrentTemp.textContent = `${(temperature - 273.15). toFixed()}°C`

     let maxTemp = document.createElement("high-temp")
     maxTemp.textContent = `High:${(highTemp - 273.15).toFixed()}°C`

     let minTemp = document.createElement("low-temp")
     minTemp.textContent = `Low:${(lowTemp - 273.15).toFixed()}°C`

     let humidityContainer = document.createElement("div")
     humidityContainer.classList.add("min-and-max-temp")

     let humidityTitle = document.createElement("p")
     humidityTitle.textContent = `Humidity: `

     let displayHumidity = document.createElement("h5")
     displayHumidity.textContent = `${humidity}%`
     

     nameOfCityAndDate.append(cityName)
     tempContainer.append(displayCurrentTemp, maxTemp, minTemp)
     humidityContainer.append(humidityTitle, displayHumidity)
     bottomContainer.append(nameOfCityAndDate, tempContainer, humidityContainer)

     
}

