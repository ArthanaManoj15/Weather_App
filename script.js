const search = async () => {
    console.log('Trial search');
    let cityname = city.value.trim(); 
    console.log(cityname);

    function setBackground(weather) {
        const body = document.body;
        switch (weather) {
            case 'Clear':
                body.style.backgroundImage = "url('images/clear.gif')";
                break;
            case 'Clouds':
                body.style.backgroundImage = "url('images/clouds.gif')";
                break;
            case 'Rain':
            case 'Drizzle':
                body.style.backgroundImage = "url('images/rain.gif')";
                break;
            case 'Thunderstorm':
                body.style.backgroundImage = "url('images/thunderstorm.gif')";
                break;
            case 'Snow':
                body.style.backgroundImage = "url('images/snow.gif')";
                break;
            case 'Haze':
                body.style.backgroundImage = "url('images/haze.gif')";
                break;
            default:
                body.style.backgroundImage = 'url(https://static.vecteezy.com/system/resources/thumbnails/033/352/730/small/sunny-sky-background-sunny-day-background-sun-wallpaper-sunny-sky-landscape-blue-sky-background-summer-sky-background-ai-generative-photo.jpg)';
                break;
        }
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.color = "white";
        document.body.style.textShadow = "2px 2px 4px #000000";
    }

    // Check if data is valid
    if (cityname !== "") {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=fd4c8e42cb75898565ea1e415c390d75`);

        // Check if response is valid
        if (response.ok) {
            response.json().then((data) => {
                console.log(data[0]);

                // Background
                const weather = data.weather[0].main;
                setBackground(weather);

                // Temperature
                temp = parseInt(data.main.temp - 273.15);

                // Feels like
                feelslike = parseInt(data.main.feels_like - 273.15);

                // City name
                cname = data.name;

                // Weather icon
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

                // Country name
                countryname = data.sys.country;
                let temp_max = parseInt(data.main.temp_max - 273.15);
                let temp_min = parseInt(data.main.temp_min - 273.15);

                // Wind speed
                windspeed = data.wind.speed;
                humidity = data.main.humidity;

                // Latitude
                latitude = data.coord.lat;

                // Longitude
                let longitude = data.coord.lon;
             
              
                // Sunrise
                let sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
                let sunriseOffset = sunrise.getTimezoneOffset() * 60 * 1000; // Offset in milliseconds
                sunrise.setMilliseconds(sunriseOffset);
                let sunriseTime = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

                // Sunset
                let sunset = new Date((data.sys.sunset + data.timezone) * 1000);
                let sunsetOffset = sunset.getTimezoneOffset() * 60 * 1000; // Offset in milliseconds
                sunset.setMilliseconds(sunsetOffset);
                let sunsetTime = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });



                // Description
                let desc = data.weather[0].description;

                // Time
                let time = new Date(data.dt * 1000);
                let utcString = time.toLocaleString();

                result.innerHTML = `<section class="features-icons  text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 mx-auto">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex"><i class="bi-window m-auto text-primary"></i></div>
                                <h3 style="font-size: 30px;">${cname} ,${countryname} </h3>
                                <p class="lead mb-0">${utcString}</p>
                            </div>
                        </div>
                        <div class="col-lg-4"></div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div class="features-icons-icon d-flex"><i class="bi-terminal m-auto text-primary"></i>
                                </div>
                                <h6 class="card-subtitle mb-2 text-body-secondary"><img src="images/direction.png" alt="" height="30px" width="30px"><span style="color: white;font-weight: bold;text-shadow: 2px 2px black;">Longitude:  ${longitude}</span></h6>

                                <h6 class="card-subtitle mb-2 text-body-secondary"><img src="images/direction.png" alt="" height="30px" width="30px"  ><span style="color: white;font-weight: bold;text-shadow: 2px 2px black;">Latitude:  ${latitude}</span></h6>

                                <h6 class="card-subtitle mb-2 text-body-secondary"><img src="images/sunrise.png" alt="" height="30px" width="30px"><span style="color: white;font-weight: bold;text-shadow: 2px 2px black;">Sunrise:  ${sunriseTime}</span></h6>

                                <h6 class="card-subtitle mb-2 text-body-secondary"><img src="images/sunset.png" alt="" height="30px" width="30px"><span style="color: white;font-weight: bold;text-shadow: 2px 2px black;">Sunset:  ${sunsetTime}</span></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- TEMP -->
             <section class="features-icons  text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                        </div>
                        <div class="col-lg-4 ">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div>
                                    <div style="display: flex;text-align: center;">
                                        <div class="row" id="icon" class="weather-icon mx-auto"><img src="${iconUrl}" alt="" ></div>
                                        <div class="row">
                                            <h3>${desc}</h3>
                                        </div>
                                    </div>
                                    <h1 style="font-size: 100px;">${temp}&deg;C</h1>
                                    <p class="lead mb-0"><i>Feels like ${feelslike}&deg;C</i></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                        </div>
                    </div>
                </div>
            </section> 
            <!-- Details -->

            <section class="page-section" id="services">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5">
                    <div class="col-lg-3 col-md-6 text-center ">
                        <div class="mt-2     ">
                            <div class="mb-2"><i class="fa-solid fa-wind"></i> <span
                                    style="font-size: 18px;font-weight: bolder;">Wind Speed</span></div>
                            <div>
                                <h5>${windspeed} mph</h5>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-2     ">
                            <div class="mb-2"><i class="fa-solid fa-droplet"></i> <span
                                    style="font-size: 18px;font-weight: bolder;">Humidity</span></div>
                            <div>
                                <h5>${humidity}%</h5>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-2     ">
                            <div class="mb-2"><i class="fa-solid fa-temperature-high"></i> <span
                                    style="font-size: 18px;font-weight: bolder;">High-heat</span></div>
                            <div>
                                <h5>${temp_max}&deg;C</h5>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-2     ">
                            <div class="mb-2"><i class="fa-solid fa-temperature-low"></i> <span
                                    style="font-size: 18px;font-weight: bolder;">Low-heat</span></div>
                            <div>
                                <h5>${temp_min}&deg;C</h5>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
            });
        } else {
            alert('Entered data is invalid');
        }
    } else {
        alert('Enter a city name');
    }
};

