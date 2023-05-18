const divAllEvents = document.getElementById ("div-allEvents")
const tableUpcomingEvents = document.getElementById("table-upcoming")
const tablePastEvents = document.getElementById("table-past")
let arrayEvents


fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then (response => response.json())
.then (data =>{ 
arrayEvents = data
allEvents = arrayEvents.events



let upcomingEvents = allEvents.filter( event => event.date > arrayEvents.currentDate)
console.log(upcomingEvents);

let pastEvents = allEvents.filter (event => event.date < arrayEvents.currentDate )
console.log(pastEvents);



//////// TABLA UNO /////////

function highestAttendance(events){
    let percentage = 0
    let eventName = ""

    events.forEach(event => {
        let highAttendance = (event.assistance / event.capacity ) * 100;

        if (highAttendance > percentage){
            percentage = highAttendance
            eventName = event.name
        }
    })
    return `${eventName}, ${percentage.toFixed(2)}%`
}

highestAttendance(pastEvents)
console.log(highestAttendance(pastEvents));

function lowestAttendance (events){
    let percentage = 100
    let eventName = ""

    events.forEach(event => {
        let lowAttendance = (event.assistance / event.capacity) * 100
        
        if (lowAttendance < percentage){
            percentage = lowAttendance
            eventName = event.name
        }
    })
    return `${eventName}, ${percentage.toFixed(2)}%`
}

lowestAttendance(pastEvents)
console.log(lowestAttendance(pastEvents));

function highestCapacity(events){
    let eventName = ""
    let capacity = 0
    
    events.forEach(event => {

        if (event.capacity > capacity){
        eventName = event.name
        capacity = event.capacity
    
    }
    })
    return `${eventName}, ${capacity}`

}

highestCapacity(pastEvents)
console.log(highestCapacity(pastEvents));



////////// IMPRIMIR TABLA UNO //////////////

function printTableOne(where){
    where.innerHTML = `<table id="table-allEvents">
    <caption>Event statistics</caption>
    <thead>
        <tr>
            <th>Events with the highest percentage of attendance</th>
            <th>Events with the lowest percentage of attendance</th>
            <th>Event with larger capacity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${highestAttendance(pastEvents)}</td>
            <td>${lowestAttendance(pastEvents)}</td>
            <td>${highestCapacity(allEvents)}</td>
        </tr>
    </tbody>
    </table>`
}

printTableOne(divAllEvents)



////////////// FUNCIONES PARA CALCULAR ASISTENCIA, RECAUDACION Y PREPARAR PARA IMPRIMIR LOS RESULTADOS ////////////////


function calculateRevenues (events){
    let result = 0
    events.forEach(event => {
        result += ( event.assistance || event.estimate) * event.price
    })
    return result
}

function calculateAttendance (events){
    let percentageAttendace = 0 

    events.forEach(event => {
        percentageAttendace += ((event.assistance || event.estimate) / event.capacity) * 100
    })
    return percentageAttendace
}
    
function infoTables(categories, events){
    let result = []

    categories.map( category => {

        let categoryEvents = events.filter ( event => category == event.category)

        let revenues = calculateRevenues(categoryEvents)
        let attendance = calculateAttendance(categoryEvents)

        result.push({
            category,
            revenues,
            attendance: attendance / categoryEvents.length,
        })
    })
    return result
}

const categoriesUpcoming = [... new Set (upcomingEvents.map(event => event.category))]
console.log(categoriesUpcoming);

let infoUpcomingEvents = infoTables(categoriesUpcoming, upcomingEvents)
console.log(infoUpcomingEvents);

///////////// IMPRIMIR TABLA DOS /////////////////


let tableUpcoming = document.createElement("table")
tableUpcoming.className = "flex-grow"
let tBody = document.createElement("tbody")
tableUpcoming.innerHTML = `    <caption>Upcoming events statistics by category</caption>
<thead>
    <tr>
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
    </tr>
</thead>`;

    infoUpcomingEvents.forEach( event => {
        let createTr = document.createElement("tr")
        createTr.innerHTML = `<td>${event.category}</td>
                            <td> $${event.revenues}</td>
                            <td> ${event.attendance.toFixed(2)}%</td>`
        tBody.appendChild(createTr)
    })
    tableUpcoming.appendChild(tBody)


    divAllEvents.appendChild(tableUpcoming)

//////////////// TABLA TRES ////////////////////

const categoriesPast = [...new Set (pastEvents.map (event => event.category))]

let infoPastEvents = infoTables(categoriesPast, pastEvents)
console.log(infoPastEvents);

////////////// IMPRIMIR TABLA TRES //////////////


let tablePast = document.createElement("table")
tablePast.className = "flex-grow"
let tBody2 = document.createElement("tbody")
tablePast.innerHTML = `     <caption>Past events statistic by category</caption>
<thead>
    <tr>
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
    </tr>
</thead>`;

    infoPastEvents.forEach( event => {
        let createTr = document.createElement("tr")
        createTr.innerHTML = `<td>${event.category}</td>
                            <td> $${event.revenues}</td>
                            <td> ${event.attendance.toFixed(2)}%</td>`
        tBody2.appendChild(createTr)
    })
    tablePast.appendChild(tBody2)


    divAllEvents.appendChild(tablePast)
})


.catch (error => console.log(error))



