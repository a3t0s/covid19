let aside = document.querySelector("aside")
let main = document.querySelector("main")
const ctx = document.getElementById('myChart').getContext('2d');
let req = new XMLHttpRequest()
req.open("GET","https://api.covid19api.com/countries")
req.send()
req.onreadystatechange=proccess
let resp;
let data = '';
let xValues = [];
let actives = [];
let deaths=[]
let confirmed = []
let recovered=[]
function showData() {
    let obj ={type: 'line',
        data: 
        {
            labels: xValues,
            datasets: [
                {
                label: 'deaths',
                data: deaths,
                borderColor:['black'],
                borderWidth: 2,
                fill: false,
                pointRadius: 0
                },
                {
                label: 'active',
                data: actives,
                borderColor: ['darkblue'],
                borderWidth: 2,
                fill: false,
                pointRadius: 0
                },
                {
                label: 'recovered',
                data: recovered,
                borderColor: ['green'],
                borderWidth: 2,
                fill: false,
                pointRadius: 0
                },
                {
                label: 'confirmed',
                data: confirmed,
                borderColor: ['red'],
                borderWidth: 2,
                fill: false,
                pointRadius: 0
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
    let myChart = new Chart(ctx, obj);
}
function getData(element) {
    let url = `https://api.covid19api.com/dayone/country/${element.target.getAttribute("id")}`
    let r=new XMLHttpRequest()
    r.open("GET",url)
    r.send()
    function p() {
        console.log(url)
        if(r.readyState==4 && r.status==200){
            xValues=[]
            actives=[]
            data = JSON.parse(r.response);
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                xValues.push(i.toString())
                actives.push(data[i].Active)
                deaths.push(data[i].Deaths)
                confirmed.push(data[i].Confirmed)
                recovered.push(data[i].Recovered)
            }
            showData()
        }
    }
    r.onreadystatechange=p;
}
function proccess(){
    if (req.readyState==4) {
        resp = JSON.parse(req.response)
        str =""
        resp.forEach(e=>{
            console.log(e)
            str+= `<div id="${e.ISO2}" class='country'>${e.Country}</div>`});
        aside.innerHTML=str
    let countries = document.querySelectorAll(".country")
    countries.forEach(element => {
        element.addEventListener("click",getData);
    });

    }
}