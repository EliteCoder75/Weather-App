import './style.css'


const searchBtn = document.querySelector(".searchBtn");
const location = document.getElementById("location_id");
const displayContent = document.querySelector(".content");
const displayContentDetailed = document.querySelector(".contentDetailed");
const next_seven_days_ctr = document.querySelector(".next_seven_days_ctr");
const toggleBtn = document.querySelector(".toggleBtn");
const current_unit_grp = document.querySelector(".current_unit_grp");

console.log(searchBtn);
async function getData(url) {
    const response = await fetch(url, {mode: 'cors'});
    if (response.status == 200) {
        let jsonData = await response.json(); 
        return jsonData;
      }
    if (response.status == 400) {
    alert("ERROR: "+response.status+ " / check the Location Name");
    defaultLoad();
    } 

    throw new Error(response.status);
}

// setting dafault location when loaded or refreshed
function defaultLoad(){
    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Algiers,dz/next6days?unitGroup=metric&key=7WZWAP7QXVP9KJ446MVHALN93";
    let obj = getData(url);
    location.value="Algiers";
    toggleBtn.innerText= "change to Farenheit";
    obj.then(result => {
        renderfewDetails(result);
        renderWithDetails(result);
        renderSevenDays(result);
        console.log(result)})
    .catch(err => console.log(err));
} 

defaultLoad();
let unitgrp = "metric";
let temp = "°C";
let speed_m_unit = "Kmh"

searchBtn.addEventListener("click", e => {

    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location.value +"/next6days?unitGroup=metric&key=7WZWAP7QXVP9KJ446MVHALN93";
    let obj = getData(url);
    displayContent.innerHTML = "";
    displayContentDetailed.innerHTML = "";
    next_seven_days_ctr.innerHTML = "";
    obj.then(result => {
        renderfewDetails(result);
        renderWithDetails(result);
        renderSevenDays(result);
        console.log(result)})
    .catch(err => console.log(err));
});

toggleBtn.addEventListener("click", e => {
    let url;
    if (unitgrp == "metric"){
        unitgrp = "uk";
        temp = "°F";
        speed_m_unit = "mph";
        toggleBtn.innerText="change to Celsius";
        url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location.value +"/next6days?unitGroup=us&key=7WZWAP7QXVP9KJ446MVHALN93";
    }
    else {
        unitgrp = "metric";
        temp = "°C";
        speed_m_unit = "Kmh";
        toggleBtn.innerText="change to Farenheit";
        url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location.value +"/next6days?unitGroup=metric&key=7WZWAP7QXVP9KJ446MVHALN93";
    }
    let obj = getData(url);
    displayContent.innerHTML = "";
    displayContentDetailed.innerHTML = "";
    next_seven_days_ctr.innerHTML = "";
    obj.then(result => {
        renderfewDetails(result);
        renderWithDetails(result);
        renderSevenDays(result);
        console.log(result)})
    .catch(err => console.log(err));
});



function renderfewDetails(result){
    let newproject = document.createElement("div");
        //newproject.classList.add("newproject"); // also removed the dot prefix here
        newproject.innerHTML = `
                    <div class= "headerPart">
                        <div >${result.resolvedAddress}</div>
                        <div >${result.currentConditions.datetime}</div>
                    </div>
                    <div class= "bodyPart">
                        <img class="image" />
                        <div >${result.currentConditions.temp}<span class="temp">${temp}</span></div>
                        <div >${result.currentConditions.conditions}</div>
                        <div >${result.description}</div>
                     </div>    
                `;
        const image = newproject.querySelector(".image");

        const graphImage = require('./images/' + result.currentConditions.icon + '.png')

        image.src = graphImage;

        displayContent.append(newproject); 
}

function renderWithDetails(result){
    let newproject = document.createElement("div");
        newproject.classList.add("renderWithDetails"); // also removed the dot prefix here
        newproject.innerHTML = `
                    <div class= "feelsLike">
                        <div >Feels Like</div>
                        <div >${result.currentConditions.feelslike}<span class="temp">${temp}</span></div>
                    </div>
                    <div class= "feelsLike">
                        <div >rainProbability </div>
                        <div >${result.currentConditions.precipprob}</div>
                    </div>
                    <div class= "feelsLike">
                        <div >Wind Speed</div>
                        <div >${result.currentConditions.windspeed} <span class="temp">${speed_m_unit}</span></div>
                    </div>
                    <div class= "feelsLike">
                        <div >Air Humidity</div>
                        <div >${result.currentConditions.humidity}</div>
                    </div>
                    <div class= "feelsLike">
                        <div >UV index</div>
                        <div >${result.currentConditions.uvindex}</div>
                    </div>
                `;
        displayContentDetailed.append(newproject); 
}

function renderSevenDays(result){
    let newproject = document.createElement("div");
        newproject.classList.add("newproject"); // also removed the dot prefix here
        newproject.innerHTML = `
                    <div class= "day">
                        <div >${result.days[0].datetime}</div>
                        <img class="image" />
                        <div >${result.days[0].conditions}</div>
                        <div >${result.days[0].tempmin}<span class="temp">${temp}</span> / ${result.days[0].tempmax}<span class="temp">${temp}</span></div>
                    </div> 
                    <div class= "day">
                        <div >${result.days[1].datetime}</div>
                        <img class="image" />
                        <div >${result.days[1].conditions}</div>
                        <div >${result.days[1].tempmin}<span class="temp">${temp}</span> / ${result.days[1].tempmax}<span class="temp">${temp}</span></div>
                    </div>
                    <div class= "day">
                        <div >${result.days[2].datetime}</div>
                        <img class="image" />
                        <div >${result.days[2].conditions}</div>
                        <div >${result.days[2].tempmin}<span class="temp">${temp}</span> / ${result.days[2].tempmax}<span class="temp">${temp}</span></div>
                    </div>
                    <div class= "day">
                        <div >${result.days[3].datetime}</div>
                        <img class="image" />
                        <div >${result.days[3].conditions}</div>
                        <div >${result.days[3].tempmin}<span class="temp">${temp}</span> / ${result.days[3].tempmax}<span class="temp">${temp}</span></div>
                    </div>
                    <div class= "day">
                        <div >${result.days[4].datetime}</div>
                        <img class="image" />
                        <div >${result.days[4].conditions}</div>
                        <div >${result.days[4].tempmin}<span class="temp">${temp}</span> / ${result.days[4].tempmax}<span class="temp">${temp}</span></div>
                    </div>
                    <div class= "day">
                        <div >${result.days[5].datetime}</div>
                        <img class="image" />
                        <div >${result.days[5].conditions}</div>
                        <div >${result.days[5].tempmin}<span class="temp">${temp}</span> / ${result.days[5].tempmax}<span class="temp">${temp}</span></div>
                    </div>
                    <div class= "day">
                        <div >${result.days[6].datetime}</div>
                        <img class="image" />
                        <div >${result.days[6].conditions}</div>
                        <div >${result.days[6].tempmin}<span class="temp">${temp}</span> / ${result.days[6].tempmax}<span class="temp">${temp}</span></div>
                    </div>
                     
                `;

        const images = newproject.querySelectorAll(".image");

        images.forEach( (image, index) => {
            
            let graphImage = require('./images/' + result.days[index].icon + '.png')

            image.src = graphImage;})

        next_seven_days_ctr.append(newproject); 
}