let trips = JSON.parse(localStorage.getItem("trips")) || [];

const tripForm = document.getElementById("tripForm");
const tripTable = document.querySelector("#tripTable tbody");

const weightLoaded = document.getElementById("weightLoaded");
const weightDelivered = document.getElementById("weightDelivered");
const shortageRate = document.getElementById("shortageRate");

const shortageField = document.getElementById("shortage");
const shortageAmountField = document.getElementById("shortageAmount");



/* AUTO SHORTAGE CALCULATION */

function calculateShortage(){

let loaded = parseFloat(weightLoaded.value) || 0;
let delivered = parseFloat(weightDelivered.value) || 0;
let rate = parseFloat(shortageRate.value) || 0;

let shortage = loaded - delivered;

if(shortage < 0){
shortage = 0;
}

let shortageAmount = shortage * rate;

shortageField.value = shortage.toFixed(2);
shortageAmountField.value = shortageAmount.toFixed(2);

}

weightLoaded.addEventListener("input", calculateShortage);
weightDelivered.addEventListener("input", calculateShortage);
shortageRate.addEventListener("input", calculateShortage);



/* ADD TRIP */

tripForm.addEventListener("submit", function(e){

e.preventDefault();

let trip = {

loadingDate: document.getElementById("loadingDate").value,
unloadingDate: document.getElementById("unloadingDate").value,
transporter: document.getElementById("transporter").value,
truck: document.getElementById("truckNumber").value,
loading: document.getElementById("loadingPoint").value,
unloading: document.getElementById("unloadingPoint").value,
loaded: parseFloat(weightLoaded.value) || 0,
delivered: parseFloat(weightDelivered.value) || 0,
shortage: parseFloat(shortageField.value) || 0,
rate: parseFloat(shortageRate.value) || 0,
shortageAmount: parseFloat(shortageAmountField.value) || 0,
diesel: parseFloat(document.getElementById("diesel").value) || 0,
driver: parseFloat(document.getElementById("driver").value) || 0,
payment:false

};

trip.totalExpense = trip.diesel + trip.driver + trip.shortageAmount;

trips.push(trip);

localStorage.setItem("trips",JSON.stringify(trips));

renderTable();

tripForm.reset();

shortageField.value="";
shortageAmountField.value="";

});



/* TABLE RENDER */

function renderTable(){

tripTable.innerHTML="";

trips.forEach((trip,index)=>{

let row = `<tr>

<td>${trip.loadingDate}</td>
<td>${trip.unloadingDate}</td>
<td>${trip.transporter}</td>
<td>${trip.truck}</td>
<td>${trip.loading}</td>
<td>${trip.unloading}</td>
<td>${trip.loaded}</td>
<td>${trip.delivered}</td>
<td>${trip.shortage}</td>
<td>${trip.rate}</td>
<td>${trip.shortageAmount}</td>
<td>${trip.diesel}</td>
<td>${trip.driver}</td>
<td>${trip.totalExpense}</td>

<td>
<input type="checkbox"
${trip.payment ? "checked":""}
onchange="togglePayment(${index})">
</td>

</tr>`;

tripTable.innerHTML += row;

});

renderReceivedTable();
renderDueTable();

}

function renderReceivedTable(){

let table = document.querySelector("#receivedTable tbody");

table.innerHTML="";

trips.forEach(trip=>{

if(trip.payment){

let row = `<tr>

<td>${trip.truck}</td>
<td>${trip.loading} → ${trip.unloading}</td>
<td>${trip.totalExpense}</td>

</tr>`;

table.innerHTML += row;

}

});

}
function renderDueTable(){

let table = document.querySelector("#dueTable tbody");

table.innerHTML="";

trips.forEach(trip=>{

if(!trip.payment){

let row = `<tr>

<td>${trip.truck}</td>
<td>${trip.loading} → ${trip.unloading}</td>
<td>${trip.totalExpense}</td>

</tr>`;

table.innerHTML += row;

}

});

}



/* PAYMENT TOGGLE */

function togglePayment(index){

trips[index].payment = !trips[index].payment;

localStorage.setItem("trips",JSON.stringify(trips));

renderTable();

}
function showSection(section){

document.getElementById("addTrip").style.display="none";
document.getElementById("tripData").style.display="none";
document.getElementById("received").style.display="none";
document.getElementById("due").style.display="none";

document.getElementById(section).style.display="block";

}

function resetAllData(){

let confirmReset = confirm("Are you sure you want to delete all trip data?");

if(confirmReset){

localStorage.removeItem("trips");

trips = [];

renderTable();

}

}



/* EXPORT TO EXCEL */

function downloadExcel(){

let worksheet = XLSX.utils.json_to_sheet(trips);

let workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, "Trips");

XLSX.writeFile(workbook, "TransportTrips.xlsx");

}

renderTable();
