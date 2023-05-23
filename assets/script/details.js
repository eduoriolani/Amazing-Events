let {createApp} = Vue 

createApp({

    data(){
        return {
            allEvents : [],
            eventId : null,
            event : {},
        }
    },
    created(){
        let url = "https://mindhub-xj03.onrender.com/api/amazing"
        fetch(url)
        .then( response => response.json())
        .then( data => {
        console.log(data);
        this.allEvents = data.events
        console.log(data.events);
        const params = new URLSearchParams (document.location.search)
        this.eventId = params.get('id')
        console.log(this.eventId);
        this.event = this.allEvents.find (event => event._id == this.eventId)



        })
        .catch(error => console.error(error))
    },
    
    
    
}).mount("#app")







// // const details = document.getElementById('details-section')
// const params = new URLSearchParams (document.location.search)
// const idEvent = params.get('id')
// // let events




// function filtrarPorFecha(eventDate, date){
//     if (eventDate > date) {
//         return `<li>Estimate: ${eventInfo.estimate}</li>`
//     } return `<li>Assistance: ${eventInfo.assistance}</li>`
// }
// // const asistOrEstimate = filtrarPorFecha (eventInfo.date, data.currentDate)



// details.innerHTML = ``
// })                     