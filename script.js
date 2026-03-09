function checkTransporter(){

let t = document.getElementById("transporter").value;

if(t === "efc"){
    document.getElementById("extraFields").classList.remove("hidden");
}
else{
    document.getElementById("extraFields").classList.add("hidden");
}

}

function calculate(){

let transporter = document.getElementById("transporter").value;

let l = parseFloat(document.getElementById("load").value);
let u = parseFloat(document.getElementById("unload").value);
let r = parseFloat(document.getElementById("rate").value);
let d = parseFloat(document.getElementById("diesel").value);
let a = parseFloat(document.getElementById("allowance").value);

let w = (l*1000) - (u*1000);

let p = u*r;

let tds = a*0.02;

let total = 0;
let sortage = 0;

if(transporter === "andal")
{
    total = p - d - a - 630 - tds;
}

if(transporter === "efc")
{
    let extra = parseFloat(document.getElementById("extra").value);
    let s = parseFloat(document.getElementById("sortRate").value);

    sortage = w*s;

    total = p - d - a - extra - tds - sortage;
}

document.getElementById("result").innerHTML =
"Weight Shortage : " + w + " Kg <br>" +
"Sortage Amount : ₹" + sortage + "<br>" +
"Total Payment : ₹" + total;

}
