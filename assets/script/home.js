let {createApp} = Vue
console.log(Vue);


createApp({

    data(){
        return {
            allEvents : [],
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
            this.allEvents = data.events
            console.log(this.allEvents);
            
            let arrayEvents = this.allEvents.map( events => events.category)
            const categorias = [...new Set(arrayEvents)]
            this.categories = categorias
            console.log(this.categories);

        })
        .catch(error => console.error(error))       
    },
    methods : {

    },
    computed: {
        filtroBusqueda (){
            let aux = this.allEvents.filter( event => event.name.toLowerCase().includes(this.searchValue.toLowerCase()))
            this.filteredEvents = aux.filter( event => this.filteredCheckbox.includes(event.category) || this.filteredCheckbox.length == 0)
            
        },
        
    }
}).mount("#app")


        
        
        
        
 
    

