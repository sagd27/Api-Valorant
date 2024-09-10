let UrlApi = "https://valorant-api.com/v1/agents";
let UrlApiArmas = "https://valorant-api.com/v1/weapons";
let UrlApiMaps = "https://valorant-api.com/v1/maps";

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      agentes: [],
      imgAgentes: [],
      imgAgentes1: [],
      armas: [],
      imgArmas: [],
      mapas: [],
      imgMapas: [],
      imgMapas1: [],
    };
  },
  created() {
    this.traerData(UrlApi);

    this.traerDataArmas(UrlApiArmas);

    this.traerDataMapas(UrlApiMaps);
  },
  methods: {
    traerData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          this.agentes = res.data;
        });
    },

    traerDataArmas(url) {
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          this.armas = res.data;
          this.armas.splice(4);
        });
    },

    traerDataMapas(url) {
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          this.mapas = res.data;
          this.mapas.splice(3);
        });
    },
  },
  computed: {},
}).mount("#app");
