let isCelsius = true;

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;
  const apiKey = "58dfe256cc9e5b3b33a02a62c1533859";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(`${url}`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    document.getElementById("cityName").innerText = data.name.toUpperCase();
    document.getElementById(
      "temperature"
    ).innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById(
      "humidity"
    ).innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById(
      "windSpeed"
    ).innerText = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById(
      "description"
    ).innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById(
      "weatherIcon"
    ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById("weatherInfo").classList.remove("hidden");
    document.getElementById("errorMessage").classList.add("hidden");
    setBackgroundBasedOnWeather();
  } catch (error) {
    document.getElementById("errorMessage").innerText = error.message;
    document.getElementById("errorMessage").classList.remove("hidden");
    document.getElementById("weatherInfo").classList.add("hidden");
  }
}

async function setBackgroundBasedOnWeather() {
  try {
    const imageContainer = document.querySelector(".container");
    const city = document.getElementById("cityInput").value;

    const apiKey = "58dfe256cc9e5b3b33a02a62c1533859";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(`${url}`);
    const data = await response.json();

    let weatherCondition = data.weather[0].main.toLowerCase();
    let backgroundImage = "";
    let videoSource = document.getElementById("video-source");

    if (weatherCondition.includes("cloud")) {
      backgroundImage = "./image/cloudy.jpg";
      videoSource.src = "./video/cloudy.mp4";
    } else if (weatherCondition.includes("rain")) {
      backgroundImage = "./image/Rainy.jpg";
      videoSource.src = "./video/rainy.mp4";
    } else if (weatherCondition.includes("clear")) {
      backgroundImage = "./image/clear sky.jpg";
      videoSource.src = "./video/clear sky.mp4";
    } else if (weatherCondition.includes("sunny")) {
      backgroundImage = "./image/sunny.jpg";
      videoSource.src = "./video/sunny.mp4";
    } else if (weatherCondition.includes("haze")) {
      backgroundImage = "./image/haze.jpg";
      videoSource.src = "./video/haze.mp4";
    } else if (weatherCondition.includes("smoke")) {
      backgroundImage = "./image/smoke.jpg";
      videoSource.src = "./video/smoke.mp4";
    } else if (weatherCondition.includes("snow")) {
      videoSource.src = "./video/snow.mp4";
    } else {
      backgroundImage = "";
    }
    document.querySelector(".background-video").load();
    imageContainer.style.backgroundImage = `url('${backgroundImage}')`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function toggleTemperature() {
  const tempElement = document.getElementById("temperature");
  if (!tempElement.innerText) return;
  const tempValue = parseFloat(tempElement.innerText.split(" ")[1]);
  if (isCelsius) {
    tempElement.innerText = `Temperature: ${((tempValue * 9) / 5 + 32).toFixed(
      2
    )} °F`;
  } else {
    tempElement.innerText = `Temperature: ${(
      ((tempValue - 32) * 5) /
      9
    ).toFixed(2)} °C`;
  }
  isCelsius = !isCelsius;
}
