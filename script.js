let aside = document.querySelector("aside")
let main = document.querySelector("main")
let req = new XMLHttpRequest()
req.open("GET","https://api.covid19api.com/countries")
req.send()
req.onreadystatechange=proccess
let resp;

function showdata(element) {
    let url = `https://api.covid19api.com/dayone/country/${element.target.getAttribute("id")}`
    console.log(url)
    let r=new XMLHttpRequest()
    r.open("GET",url)
    r.send()
    function p() {
        if(r.readyState==4 && r.status==200){
            let data = JSON.parse(r.response);
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
        element.addEventListener("click",showdata);
    });

    }
}