let cards = document.getElementById("card-section")

    function armarCards(objeto) {
        return `<div class="card m-2 align-items-center" style="width: 18rem;">
        <img src=${objeto.image} class="card-img-top" alt="books">
        <div class="card-body">
        <h5 class="card-title">${objeto.name}</h5>
        <p class="card-text">${objeto.description}</p>
        <div class="card-bottom">
            <h6>${objeto.price}</h6>
            <a href="./pages/details.html" class="btn btn-primary text-bg-dark button-pos">Show More</a>
        </div>
        </div>
    </div>`
    }

    // function filter(arrayEventosDate, date) {
    //     const eventosFiltro = [];
    //     for (let objetoEvento of arrayEventosDate) {
    //      if (objetoEvento.date >= date) {
    //             eventosFiltro.push(objetoEvento);
    //         }
    //     }
    //     return eventosFiltro;
    // }
    
    
    // filter(data.events, data.currentDate);
    // let eventosFiltro = filter(data.events, data.currentDate);
    const futureEvents = data.events.filter (events => events.date > data.currentDate)

    

    
    function cardLoop(events, cardList) {
        let template = "";
        for (let infoCard of events) {
            template += armarCards(infoCard)
        }
        cardList.innerHTML += template;
    }

cardLoop(futureEvents,cards)