let urlApi =  "https://valorant-api.com/v1/maps"

const {createApp}= Vue;

const app = createApp({

        data(){
                
                return{
                        maps: [],
                        textSearch: "",
                        Nregions: [],
                        mapsBk: [],
                        regionSelection: "28",
                        mapsFavorites: [],
                }
        },
        created(){
                this.getData(urlApi);
                let localData = JSON.parse(localStorage.getItem("mapsFavorites"))
                if(localData){
                        this.mapsFavorites = localData;
                }
        },
        methods:{

                getData(url){
                        fetch(url).then(response => response.json()).then(resp =>{
                                this.maps = resp.data.filter(maps => maps.callouts != null)
                                this.mapsBk = this.maps; 
                                
                               
                         
                               
                        })
                        
                },
                agregarFavorito(maps) {
                        if (!this.mapsFavorites.includes(maps)) {
                          this.mapsFavorites.push(maps);
                          localStorage.setItem(
                            "mapsFavorites",
                            JSON.stringify(this.mapsFavorites)
                          );
                        }
                      },
                      eliminarFavorito(maps) {
                        let index = this.mapsFavorites.findIndex(
                          (res) => res.uuid == maps.uuid
                        );
                        if (index !== -1) {
                          this.mapsFavorites.splice(index, 1);
                          localStorage.setItem(
                            "mapsFavorites",
                            JSON.stringify(this.mapsFavorites)
                          );
                        }
                      },
                      limpiarStorage() {
                        localStorage.setItem("mapsFavorites", JSON.stringify(""));
                        this.mapsFavorites = [];
                      },
          
        },
        computed:{
                filterData(){
                        
                        const filterText = this.mapsBk.filter(maps => maps.displayName.toLowerCase().includes(this.textSearch.toLowerCase()));         
                        this.maps = filterText;
            
                        
                         this.maps = filterText.filter(maps => this.regionSelection >= maps.callouts.length)
                        
                },
               

        }



}).mount('#app')
