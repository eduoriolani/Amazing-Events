const details = document.getElementById('details-section')
const params = new URLSearchParams (document.location.search)
const idEvent = params.get('id')
const allEvents = data.events
const eventInfo = allEvents.find(event => event._id == idEvent)
document.title = `Details of ${eventInfo.name}`

function definirFecha(evento, date){
    if (evento > date) {
        return `<li>Estimate: ${eventInfo.estimate}</li>`
    } return `<li>Assistance: ${eventInfo.assistance}</li>`
}
const asistOrEstimate = definirFecha (eventInfo.date, data.currentDate)
console.log(asistOrEstimate);


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



                // {
                //     _id: "639c723b992482e5f2834be9",
                //     name: "Collectivities Party",
                //     image: "https://i.postimg.cc/Fs03hQDt/Collectivities-Party.jpg",
                //     date: "2022-12-12",
                //     description:
                //       "Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
                //     category: "Food Fair",
                //     place: "Room A",
                //     capacity: 45000,
                //     assistance: 42756,
                //     price: 5,
                //     __v: 0,
                //   },