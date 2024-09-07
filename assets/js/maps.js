let urlApi =  "https://valorant-api.com/v1/maps"

const {createApp}= Vue;

const app = createApp({

        data(){
                
                return{
                        maps: [],
                        textSearch: "",
                        Nregions: [],
                }
        },
        created(){
                this.getData(urlApi)
                
        },
        methods:{

                getData(url){
                        fetch(url).then(response => response.json()).then(resp =>{
                                this.maps = resp.data 

                                console.log(this.maps);
                                
                                
                              
                               
                        })
                        
                }
        },
        computed:{

        }



}).mount('#app')
