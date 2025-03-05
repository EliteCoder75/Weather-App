import './style.css'

const searchBtn = document.querySelector(".searchBtn");
const location = document.getElementById("location_id");
const displayContent = document.querySelector(".content");
const displayContentDetailed = document.querySelector(".contentDetailed");


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

    obj.then(result => {
        renderfewDetails(result);
        renderWithDetails(result);
               
        console.log(result)})
    .catch(err => console.log(err));
});


function renderfewDetails(result){
    let newproject = document.createElement("div");
        newproject.classList.add("newproject"); // also removed the dot prefix here
        newproject.innerHTML = `
                    <div class= "headerPart">
                        <div >${result.resolvedAddress}</div>
                        <div >${result.currentConditions.datetime}</div>
                    </div>
                    <div class= "bodyPart">
                        <div >${result.currentConditions.icon}</div>
                        <div >${result.currentConditions.temp}</div>
                        <div >${result.currentConditions.conditions}</div>
                        <div >${result.description}</div>
                     </div>    
                `;
        displayContent.append(newproject); 
}

function renderWithDetails(result){
    let newproject = document.createElement("div");
        //newproject.classList.add("newproject"); // also removed the dot prefix here
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