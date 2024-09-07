let url = 'https://valorant-api.com/v1/agents';

const {createApp} = Vue

const app = createApp({
    data() {
        return {
            agents: null,
            popoverIndex: null
        }
    },
    created() {
        const URLParams = new URLSearchParams(window.location.search);
        const id = URLParams.get('uuid'); 
        console.log(id);
        
        if (id) {
            
            fetch(url + '/' + id)
            .then(response => response.json())
            .then(data => {
                this.agents = data.data;       
                console.log(this.agents);
                
            })
            .catch(error => console.log('Error fetching agent details:' , error))
        }
        
    },
    methods: {
        showPopover(index, description) {
            this.popoverIndex = index;
        },
        hidePopover() {
            this.popoverIndex = null;
        }
    
    },
    computed: {
        
    }
}).mount('#app')