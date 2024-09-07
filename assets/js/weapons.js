const urlApiWeapons = 'https://valorant-api.com/v1/weapons';

const {createApp} = Vue

const appWeapons = createApp({
    data(){
        return{
            elementos: [],
            elementosBk: [],
            categorias: [],
            categoriaSeleccionada: [],
            elementosFavoritos: [],
            eliminarFavoritos: [],
            buscarTexto:""
        }
    },
    created(){
        this.obtenerDatos(urlApiWeapons);
        
    },
    methods:{
        obtenerDatos(url){
            fetch(url).then(response =>response.json()).then(datos => {
                this.elementosBk = datos.data;
                console.log(this.elementosBk);
                this.elementos = datos.data;
                this.categorias = Array.from(new Set(this.elementos.map((elemento) => elemento.category.split('::')[1]
            )))
                console.log(this.categorias);
                
            })
        }
    },
    computed:{
        filtros(){
            let filtroTexto = this.elementosBk.filter(elemento => elemento.displayName.toLowerCase().includes(this.buscarTexto.toLowerCase()))

            this.elementos = filtroTexto
            console.log(this.categoriaSeleccionada);
            if(this.categoriaSeleccionada === "none" || this.categoriaSeleccionada === "Category"){
                this.elementos = filtroTexto
            }else {
                    this.elementos = filtroTexto.filter(elemento => elemento.category.includes(this.categoriaSeleccionada))
                }
            }
        }
    
}).mount('#appWeapons');
