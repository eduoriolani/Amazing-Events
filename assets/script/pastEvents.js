const cards = document.getElementById("card-section")
const form = document.getElementById("form-home")
const allCheckbox = document.getElementById("checkbox-home")
const search = document.getElementById("search")
let events

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then( response => response.json())
    .then( data => {
        events = data
        let allEvents = events.events
        const pastEvents = allEvents.filter(events => events.date < data.currentDate)


function cardTemplate( events ){
    return events.reduce((acc, event) =>{
        return acc += `<div class="card m-2 align-items-center" style="width: 18rem;">
    <img src=${event.image} class="card-img-top" alt="books">
    <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <div class="card-bottom d-flex flex-row w-100 justify-content-between align-content-end">
        <h6>$${event.price}</h6>
        <a href="../pages/details.html?name=${event.name}&id=${event._id}" class="btn btn-primary text-bg-dark button-pos">Show More</a>
    </div>
    </div>
</div>`
    }, "");
}
cards.innerHTML = cardTemplate(pastEvents)

// Reduciendo a 7 categorias
const arrayEvents = allEvents.map( events => events.category)
const categories = [...new Set(arrayEvents)]


function checkBuild(category){
    return `<input type="checkbox" name="${category}" id="${category}" value="${category}">
    <label for="${category}" class="p-3">${category}</label>`
}

function checkLoop(events, checkList) {
    let template = "";
    for (let infoCheck of events) {
        template += checkBuild(infoCheck)
    }
    checkList.innerHTML = template;
}
    checkLoop(categories, allCheckbox)



    search.addEventListener("input", ()=>{
        const checkedCheckbox = Array.from( document.querySelectorAll('input[type="checkbox"]:checked')).map( check => check.value)
        const filteredEvents = filtroEventos(pastEvents, checkedCheckbox)
        cards.innerHTML = "";
        let aux = filtroBusqueda(filteredEvents, search.value)
        resultadoFiltro(aux, cards)
    })

    allCheckbox.addEventListener ("change", (e)=>{
        const checkedCheckbox = Array.from( document.querySelectorAll('input[type="checkbox"]:checked')).map( check => check.value)
        const filteredEvents = filtroEventos(pastEvents, checkedCheckbox)
        cards.innerHTML = "";
        let aux = filtroBusqueda(filteredEvents, search.value)
        resultadoFiltro(aux, cards)
    })


    function filtroBusqueda ( events, busqueda){
        return events.filter( event => event.name.toLowerCase().includes(busqueda.toLowerCase()))
  }
    

    function filtroEventos (arrayEvents, category){
        if(category.length == 0)return arrayEvents
        return arrayEvents.filter( events => category.includes(events.category))
    }


    function resultadoFiltro(arrayFiltrado, imprimir) {
        if (arrayFiltrado.length === 0) {
            imprimir.innerHTML = `<h3>No results found</h3>`
            } else {
            imprimir.innerHTML = cardTemplate (arrayFiltrado, imprimir)
            } 
    }

    })
        .catch(error => console.log(error))

   


 
    

