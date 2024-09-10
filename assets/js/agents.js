let urlValo = "https://valorant-api.com/v1/agents";

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      agentes: [],
      agentesBK: [],
      roles: [],
      rolesSelecionados: [],
      textoBusqueda: "",
      agentesFavoritos: [],
    };
  },
  created() {
    const localData = JSON.parse(localStorage.getItem("agentesFavoritos"));
    if (localData) {
      this.agentesFavoritos = localData ;
    }
    this.traerData(urlValo);
    
  },
  methods: {
    traerData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          this.agentes = res.data.filter(
            (agente) => agente.isPlayableCharacter === true
          );
          this.agentesBK = this.agentes;

          this.roles = this.roles = Array.from(
            new Set(this.agentes.map((res) => res.role.displayName))
          );
          
        });
    },
    agregarFavorito(agente) {
      if (!this.agentesFavoritos.includes(agente)) {
        this.agentesFavoritos.push(agente);
        localStorage.setItem(
          "agentesFavoritos",
          JSON.stringify(this.agentesFavoritos)
        );
      }
      alert(agente.displayName + " was saved successfully");
    },
    eliminarFavorito(agente) {
      let index = this.agentesFavoritos.findIndex(
        (res) => res.uuid == agente.uuid
      );
      if (index !== -1) {
        this.agentesFavoritos.splice(index, 1);
        localStorage.setItem(
          "agentesFavoritos",
          JSON.stringify(this.agentesFavoritos)
        );
      }
    },
    limpiarStorage() {
      localStorage.setItem("agentesFavoritos", JSON.stringify(""));
      this.agentesFavoritos = [];
    },
  },
  computed: {
    filtros() {
      let filtroA = this.agentesBK.filter((agente) =>
        agente.displayName
          .toLowerCase()
          .includes(this.textoBusqueda.toLowerCase())
      );
      this.agentes = filtroA;
      if (this.rolesSelecionados.length > 0) {
        this.agentes = filtroA.filter((res) =>
          this.rolesSelecionados.includes(res.role.displayName)
        );
      } else {
        this.agentes = filtroA;
      }
    },
  },
}).mount("#app");
