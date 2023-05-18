const cards = document.getElementById("card-section")
const form = document.getElementById("form-home")
const allCheckbox = document.getElementById("checkbox-home")
const search = document.getElementById("search")
let allEvents 

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then( response => response.json())
    .then( data => {
        allEvents = data ;
        const arrayEvents = allEvents.events.map( events => events.category)
        const categories = [...new Set(arrayEvents)]
        
        // Imprimir Cards
        cards.innerHTML = cardTemplate(allEvents.events);
        
        console.log(categories);
        // Imprimir Checkbox
        allCheckbox.innerHTML = checkTemplate(categories)
        
        
        
        
        
        function cardTemplate( allEvents ){
            return allEvents.reduce((acc, event) =>{
                return acc += `<div class="card m-2 align-items-center" style="width: 18rem;">
                <img src=${event.image} class="card-img-top" alt="books">
                <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <div class="card-bottom d-flex flex-row w-100 justify-content-between align-content-end">
                <h6>$${event.price}</h6>
                <a href="./pages/details.html?name=${event.name}&id=${event._id}" class="btn btn-primary text-bg-dark button-pos">Show More</a>
                </div>
                </div>
                </div>`
            }, "");
}

function checkTemplate ( categories ){
    return categories.reduce((acc, category)=> {
        return acc += `<input type="checkbox" name="${category}" id="${category}" value="${category}">
        <label for="${category}" class="p-3">${category}</label>`
    }, "")
}


// Eventos y sus respectivas funciones de filtro 

search.addEventListener("input", ()=>{
    const checkedCheckbox = Array.from( document.querySelectorAll('input[type="checkbox"]:checked')).map( check => check.value)
    const filteredEvents = filtroEventos(allEvents.events, checkedCheckbox)
    cards.innerHTML = "";
    let aux = filtroBusqueda(filteredEvents, search.value)
    resultadoFiltro(aux, cards)
})

allCheckbox.addEventListener ("change", (e)=>{
    const checkedCheckbox = Array.from( document.querySelectorAll('input[type="checkbox"]:checked')).map( check => check.value)
    const filteredEvents = filtroEventos(allEvents.events, checkedCheckbox)
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

 
    

