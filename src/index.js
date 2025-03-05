import './style.css'

const searchBtn = document.querySelector(".searchBtn");
const location = document.getElementById("location_id");

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
    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location.value +"?key=7WZWAP7QXVP9KJ446MVHALN93";
    let obj = getData(url);
    obj.then(result => console.log(result.resolvedAddress, result.currentConditions.conditions, result.currentConditions.datetime,result.currentConditions.temp, result.currentConditions.icon))
    .catch(err => console.log(err));
});
