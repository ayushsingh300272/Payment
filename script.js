let trips = JSON.parse(localStorage.getItem("trips")) || [];

const tripForm = document.getElementById("tripForm");
const tripTable = document.querySelector("#tripTable tbody");
const paymentTable = document.querySelector("#paymentTable tbody");

const menuSelect = document.getElementById("menuSelect");
const tripSection = document.getElementById("tripSection");
const paymentSection = document.getElementById("paymentSection");

menuSelect.addEventListener("change", () => {

if(menuSelect.value === "trip"){
tripSection.style.display="block";
paymentSection.style.display="none";
}

else{
tripSection.style.display="none";
paymentSection.style.display="block";
}

});


tripForm.addEventListener("submit", function(e){

e.preventDefault();

let transporter = document.getElementById("transporter").value;
let truck = document.getElementById("truckNumber").value;
let date = document.getElementById("tripDate").value;
let start = document.getElementById("startLocation").value;
let end = document.getElementById("endLocation").value;

let loaded = Number(document.getElementById("weightLoaded").value);
let delivered = Number(document.getElementById("weightDelivered").value);

let diesel = Number(document.getElementById("diesel").value);
let toll = Number(document.getElementById("toll").value);
let driver = Number(document.getElementById("driver").value);

let shortage = loaded - delivered;
let totalExpense = diesel + toll + driver;

let trip = {
date,
transporter,
truck,
start,
end,
loaded,
delivered,
shortage,
diesel,
toll,
driver,
totalExpense,
payment:false
};

trips.push(trip);

localStorage.setItem("trips",JSON.stringify(trips));

renderTables();

tripForm.reset();

});



function renderTables(){

tripTable.innerHTML="";
paymentTable.innerHTML="";

trips.forEach((trip,index)=>{

let row = `<tr>

<td>${trip.date}</td>
<td>${trip.transporter}</td>
<td>${trip.truck}</td>
<td>${trip.start}</td>
<td>${trip.end}</td>
<td>${trip.loaded}</td>
<td>${trip.delivered}</td>
<td>${trip.shortage}</td>
<td>${trip.diesel}</td>
<td>${trip.toll}</td>
<td>${trip.driver}</td>
<td>${trip.totalExpense}</td>

<td>
<input type="checkbox"
${trip.payment ? "checked":""}
onchange="togglePayment(${index})">
</td>

</tr>`;

tripTable.innerHTML += row;


let payRow = `<tr>

<td>${trip.date}</td>
<td>${trip.truck}</td>
<td>${trip.start} → ${trip.end}</td>
<td>${trip.payment ? "✅ Received" : "❌ Pending"}</td>

</tr>`;

paymentTable.innerHTML += payRow;

});

}



function togglePayment(index){

trips[index].payment = !trips[index].payment;

localStorage.setItem("trips",JSON.stringify(trips));

renderTables();

}



function downloadExcel(){

let worksheet = XLSX.utils.json_to_sheet(trips);

let workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, "Trips");

XLSX.writeFile(workbook, "Transport_Data.xlsx");

}



renderTables();
