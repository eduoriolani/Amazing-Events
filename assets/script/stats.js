let {createApp} = Vue

createApp({
    
    data(){
        return {
            allEvents : [],
            pastEvents : [],
            upcomingEvents : [],
            categoriesPast : [],
            categoriesUpcoming : [],
            estadisticaPast : {},
            estadisticaUpcoming : {},
            capacity : "",
            lowestAssistance : "",
            highestAssistance : "",

        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then (response => response.json())
        .then (data =>{ 
            this.allEvents = [...data.events]

            this.pastEvents = this.allEvents.filter (event => event.date < data.currentDate)


            this.upcomingEvents = this.allEvents.filter (event => event.date > data.currentDate)



            let arrayEvents = this.pastEvents.map( events => events.category)
            const categorias = [...new Set(arrayEvents)]
            this.categoriesPast = categorias
            let arrayUpcoming = this.upcomingEvents.map ( events => events.category)
            const categoriasUp = [...new Set(arrayUpcoming)]
            this.categoriesUpcoming = categoriasUp


            this.estadisticaPast = this.calculateStadistics(this.pastEvents,"assistance", this.categoriesPast)
            this.estadisticaUpcoming = this.calculateStadistics(this.upcomingEvents,"estimate", this.categoriesUpcoming)
            this.highestCapacity()
            this.lowestAttendance()
            this.highestAttendance()
            
        })
        .catch (error => console.error(error))
    },
    methods : {
        calculateStadistics(events, property, categories) {
            let aux = {}

            categories.forEach((category) => {
                const categoryEvents = events.filter((event) => event.category === category);
                let totalAttendance = 0;
                let totalRevenue = 0;
                let totalEvents = categoryEvents.length;
        
                categoryEvents.forEach((event) => {
                  totalAttendance += (event[property] / event.capacity) * 100;
                  totalRevenue += event[property] * event.price;
                });

                if (totalEvents > 0) {
                  totalAttendance /= totalEvents;
                
                }   
        
                aux[category] = {
                  attendance : totalAttendance.toFixed(2),
                  revenues : totalRevenue,
                }
                
              });
              return aux      
        },
       
        highestAttendance(){
            let percentage = 0
            let eventName = ""

            this.pastEvents.forEach(event => {
                let highAttendance = (event.assistance / event.capacity) * 100
                if(highAttendance > percentage){
                    percentage = highAttendance
                    eventName = event.name
                }
                this.highestAssistance = `${eventName}, ${percentage.toFixed(2)}%`
            })
        },
        lowestAttendance(){
            let percentage = 100
            let eventName = ""

            this.pastEvents.forEach(event => {
                let lowAttendance = (event.assistance / event.capacity) * 100
        
                if (lowAttendance < percentage){
                percentage = lowAttendance
                eventName = event.name
                }
                this.lowestAssistance = `${eventName}, ${percentage.toFixed(2)}%`
            })
        },
        highestCapacity(){
            let eventName = ""
            let capacity = 0
            
            this.pastEvents.forEach(event => {
        
                if (event.capacity > capacity){
                eventName = event.name
                capacity = event.capacity
            
            }
        })
        this.capacity = `${eventName}, ${capacity}`
        },
    },

}).mount("#app")