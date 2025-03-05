import './style.css'

const searchBtn = document.querySelector(".searchBtn");
const location = document.getElementById("location_id");

console.log(searchBtn);
async function getData(url) {
    const response = await fetch(url, {mode: 'cors'});
    const jsonData = await response.json();
    console.log(jsonData);
}
console.log(location.value);

searchBtn.addEventListener("click", e => {
    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location.value +"?key=7WZWAP7QXVP9KJ446MVHALN93";
    console.log(url);
    getData(url);
})

