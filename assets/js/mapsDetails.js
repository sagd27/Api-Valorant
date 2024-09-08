let urlApi =  "https://valorant-api.com/v1/maps"



const {createApp}= Vue;

const app = createApp({

        data(){
                
                return{
                        map: null,
                        callouts: []
                

                }
        },
        created(){
                let urlParams = new URLSearchParams(window.location.search);
               
                
                let mapId = urlParams.get('uuid');
               
                
                this.getData(urlApi +'/'+ mapId);
                console.log(urlApi+'/'+mapId);
                

        },
        methods:{
                getData(url){
                        fetch(url).then(reponse => reponse.json()).then(resp =>{

                               this.map = resp.data
                        //        console.log(this.map)

                               this.callouts = Array.from(new Set(this.map.callouts));
                                console.log(this.callouts);
                             
                                
                                
                        })
                }

             
          
        },
        computed:{
      

        }



}).mount('#app')
