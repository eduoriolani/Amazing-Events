const details = document.getElementById('details-section')
const params = new URLSearchParams (document.location.search)
const idEvent = params.get('id')
let events

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then( response => response.json())
.then( data => {
    events = data
    let allEvents = events.events
const eventInfo = allEvents.find(event => event._id == idEvent)
document.title = `Details of ${eventInfo.name}`


function filtrarPorFecha(eventDate, date){
    if (eventDate > date) {
        return `<li>Estimate: ${eventInfo.estimate}</li>`
    } return `<li>Assistance: ${eventInfo.assistance}</li>`
}
const asistOrEstimate = filtrarPorFecha (eventInfo.date, data.currentDate)



details.innerHTML = `<div class="detail-div pt-3">
                    <figure>
                        <img src="${eventInfo.image}" alt="${eventInfo.name}">
                        <figcaption>
                        <h2>${eventInfo.name}</h2>
                            <p>${eventInfo.description}</p>
                            <ul>
                                <li>Date: ${eventInfo.date}</li>
                                <li>Price: $${eventInfo.price}</li>
                                <li>Capacity: ${eventInfo.capacity}</li>
                                ${asistOrEstimate}
                                <li>Place: ${eventInfo.place}</li>
                                
                                </ul>
                                </figcaption>
                                </figure>
                                </div>`
})                     