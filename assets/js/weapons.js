const urlApiWeapons = 'https://valorant-api.com/v1/weapons';

const {createApp} = Vue

const appWeapons = createApp({
    data(){
        return{
            elementos:[]
        }
    },
    created(){
        this.obtenerDatos(urlApiWeapons);
        // console.log(this.elementos);
        
    },
    methods:{
        obtenerDatos(url){
            fetch(url).then(response =>response.json()).then(datos => {
                // console.log(datos);
                this.elementos = datos.data;
                console.log(this.elementos);
                
            })
        }
    }
}).mount('#appWeapons');

// fetch('https://valorant-api.com/v1/weapons')
// .then(response =>response.json())
// .then(datos => {
//     console.log(datos);
//     const weapons = datos.data; // Asumiendo que el array de armas está en data.data
//     const uniqueNames = new Set();
//     const uniqueWeapons = [];

//     weapons.forEach(weapon => {
//       if (!uniqueNames.has(weapon.displayName)) {
//         uniqueNames.add(weapon.displayName);
//         uniqueWeapons.push(weapon);
//       }
//     });

//     console.log(uniqueWeapons);
//   })
//   .catch(error => console.error('Error fetching weapon data:', error));
    
// });
