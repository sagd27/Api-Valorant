let urlApi = "https://valorant-api.com/v1/";


const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            maps: [],
            maxCalloutMap: null, 
            minCalloutMap: null,
            weapons: [],
            maxFireRate: null,
            minFireRate: null,
            roles: {},
            rolesArray: []

        }
    },
    created() {
        this.getMaps(urlApi + 'maps');
        this.getWeapons(urlApi + 'weapons');
        this.getRoles(urlApi + 'agents');

    },
    methods: {
        getMaps(url) {
            fetch(url)
            .then(response => response.json())
            .then(data => {

                let uniqueNames = new Set();

                this.maps = data.data.filter(map => {
                    if (uniqueNames.has(map.displayName)) {
                        return false;
                    } else {
                        uniqueNames.add(map.displayName); 
                        return true; 
                    }
                });
                
                
                let sortedMaps = this.maps.filter(map => map.callouts !== null).sort((a, b) => b.callouts.length - a.callouts.length);
                    this.maxCalloutMap = sortedMaps[0] 
                    
                    this.minCalloutMap = sortedMaps[sortedMaps.length - 1]
             
                console.log(this.maxCalloutMap);
                console.log(this.minCalloutMap);
                
            })
            .catch(error => {
                console.error('Error fetching maps:', error); 
            });
        },

        getWeapons(url) {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.weapons = data.data
                console.log(this.weapons);
                
                let validWeapons = this.weapons.filter(weapon => weapon.weaponStats && weapon.weaponStats.fireRate);

                let sortedWeapons = validWeapons.sort((a, b) => b.weaponStats.fireRate - a.weaponStats.fireRate);

                this.maxFireRate = sortedWeapons[0] || null;
                this.minFireRate = sortedWeapons[sortedWeapons.length - 1] || null;
        
            })
            .catch(error => {
            console.error('Error fetching weapons data:', error);
            });
        },
        
        getRoles(url) {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                
                this.agents = data.data.filter(
                    (agente) => agente.isPlayableCharacter === true);

                    
                    this.agents.forEach(agent => {
                        if (!this.roles[agent.role.displayName]) {
                            this.roles[agent.role.displayName] = [];
                        }
                        this.roles[agent.role.displayName].push(agent);
                });
                
                let totalAgents = this.agents.length;
                this.rolesArray = [];

                for (let role in this.roles) {
                    let percentage = (this.roles[role].length / totalAgents) * 100;
                    this.rolesArray.push({
                        role: role,
                        agents: this.roles[role],
                        percentage: percentage.toFixed(2)
                });
            }
            
            console.log(this.rolesArray);
            
            console.log(this.roles);

            })
            .catch(error => {
                console.error('Error fetching roles data:', error);
            });
            
            
        }
   },

}).mount('#app')

            