const inputCity = document.querySelector("#city"),
    deviceLocationBtn = document.querySelector(".device-location"),
    info_text = document.querySelector(".info-text"),
    weatherPart=document.querySelector(".weather-part"),
    inputPart=document.querySelector(".input-part"),
    arr=document.querySelector(".arr");
let api;
let api_key = "d9c89362e1f3ed781c8dfeab1c8a9969";
inputCity.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && inputCity.value != "") {
        requestApi(inputCity.value);
        
    }
})
deviceLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
        alert("your browser does not support geolocation api you can manually search by writing you city name.");
    }
})
function success(data) {
    const { longitude, latitude } = data.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;

    fetchdata();
}
function error(e) {
    info_text.textContent = e.message;
    if (info_text.classList.contains("pending")) {
        info_text.classList.replace("pending", "error");
    }
    else{
        info_text.classList.add("error")
    }
}
function requestApi(val) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&appid=${api_key}`;
    fetchdata();
}
function fetchdata() {
    info_text.classList.add("pending");
    info_text.innerHTML = "Getting Weather Details...";
    fetch(api).then(res => {
        return res.json()
    }).then(data => {
        weatherDetails(data);
    })

}

function weatherDetails(data) {
    if (data.cod=="404") {
        if (info_text.classList.contains("pending")) {
            info_text.classList.replace("pending","error") ;
            info_text.innerText=`${inputCity.value} city not found`;
        }
    }
    else{
        info_text.classList.remove("pending","error");
        weatherPart.classList.add("active");
        inputPart.classList.add("disable");
        arr.classList.remove("hide");
        document.querySelector(".cityLoc").textContent=`${data.name},${data.sys.country}`;
        document.querySelector(".cloudy").textContent=`${data.weather[0].description}`;
        document.querySelector(".num").textContent=`${data.main.temp}`;
        document.querySelector(".like").innerHTML=`${data.main.feels_like}°C`;
        document.querySelector(".hum").innerHTML=`${data.main.humidity}%`;
        
    }
}
arr.addEventListener("click",()=>{
    weatherPart.classList.remove("active");
    inputPart.classList.remove("disable");
    arr.classList.add("hide");
})



