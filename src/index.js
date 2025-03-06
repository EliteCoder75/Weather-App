import './style.css'


const searchBtn = document.querySelector(".searchBtn");
const location = document.getElementById("location_id");
const displayContent = document.querySelector(".content");
const displayContentDetailed = document.querySelector(".contentDetailed");
const next_seven_days_ctr = document.querySelector(".next_seven_days_ctr");


console.log(searchBtn);
async function getData(url) {
    const response = await fetch(url, {mode: 'cors'});
    if (response.status == 200) {
        let jsonData = await response.json(); 
        return jsonData;
      }
    
    throw new Error(response.status);
}

searchBtn.addEventListener("click", e => {
    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location.value +"/next6days?key=7WZWAP7QXVP9KJ446MVHALN93";
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
                        <div >${result.currentConditions.temp}</div>
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
                        <div >${result.currentConditions.feelslike}</div>
                    </div>
                    <div class= "feelsLike">
                        <div >rainProbability </div>
                        <div >${result.currentConditions.precipprob}</div>
                    </div>
                    <div class= "feelsLike">
                        <div >Wind Speed</div>
                        <div >${result.currentConditions.windspeed}</div>
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
                        <div >${result.days[0].tempmin} / ${result.days[0].tempmax}</div>
                    </div> 
                    <div class= "day">
                        <div >${result.days[1].datetime}</div>
                        <img class="image" />
                        <div >${result.days[1].conditions}</div>
                        <div >${result.days[1].tempmin} / ${result.days[1].tempmax}</div>
                    </div>
                    <div class= "day">
                        <div >${result.days[2].datetime}</div>
                        <img class="image" />
                        <div >${result.days[2].conditions}</div>
                        <div >${result.days[2].tempmin} / ${result.days[2].tempmax}</div>
                    </div>
                    <div class= "day">
                        <div >${result.days[3].datetime}</div>
                        <img class="image" />
                        <div >${result.days[3].conditions}</div>
                        <div >${result.days[3].tempmin} / ${result.days[3].tempmax}</div>
                    </div>
                    <div class= "day">
                        <div >${result.days[4].datetime}</div>
                        <img class="image" />
                        <div >${result.days[4].conditions}</div>
                        <div >${result.days[4].tempmin} / ${result.days[4].tempmax}</div>
                    </div>
                    <div class= "day">
                        <div >${result.days[5].datetime}</div>
                        <img class="image" />
                        <div >${result.days[5].conditions}</div>
                        <div >${result.days[5].tempmin} / ${result.days[5].tempmax}</div>
                    </div>
                    <div class= "day">
                        <div >${result.days[6].datetime}</div>
                        <img class="image" />
                        <div >${result.days[6].conditions}</div>
                        <div >${result.days[6].tempmin} / ${result.days[6].tempmax}</div>
                    </div>
                     
                `;

        const images = newproject.querySelectorAll(".image");

        images.forEach( (image, index) => {
            
            let graphImage = require('./images/' + result.days[index].icon + '.png')

            image.src = graphImage;})

        

        next_seven_days_ctr.append(newproject); 
}