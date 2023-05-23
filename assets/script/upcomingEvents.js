let {createApp} = Vue



createApp({

    data(){
        return {
            upcomingEvents : [],
            categories : [],
            filteredEvents: [],
            filteredCheckbox : [],
            searchValue : "",
            
        }
    },

    created(){
        const url = "https://mindhub-xj03.onrender.com/api/amazing"
        fetch(url)
        .then( response => response.json())
        .then( data => {
            let allEvents = data.events
            console.log(allEvents);
            this.upcomingEvents = allEvents.filter(event => event.date > data.currentDate)
            console.log(this.upcomingEvents);
            let arrayEvents = this.upcomingEvents.map( events => events.category)
            const categorias = [...new Set(arrayEvents)]
            this.categories = categorias

        })
        .catch(error => console.error(error))       
    },
    methods : {

    },
    computed: {
        filtroBusqueda (){
            let aux = this.upcomingEvents.filter( event => event.name.toLowerCase().includes(this.searchValue.toLowerCase()))
            this.filteredEvents = aux.filter( event => this.filteredCheckbox.includes(event.category) || this.filteredCheckbox.length == 0)
            
        },
        
    }
}).mount("#app")


