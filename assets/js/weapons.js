const urlApiWeapons = "https://valorant-api.com/v1/weapons";

const { createApp } = Vue;

const appWeapons = createApp({
  data() {
    return {
      elementos: [],
      elementosBk: [],
      categorias: [],
      categoriaSeleccionada: "Category",
      elementosFavoritos: [],
      buscarTexto: "",
    };
  },
  created() {
    this.obtenerDatos(urlApiWeapons);
    let localData = JSON.parse(localStorage.getItem("elementosFavoritos"));
    if (localData) {
      this.elementosFavoritos = localData;
    }
  },
  methods: {
    obtenerDatos(url) {
      fetch(url)
        .then((response) => response.json())
        .then((datos) => {
          this.elementosBk = datos.data;
          this.elementos = datos.data;
          this.categorias = Array.from(
            new Set(
              this.elementos.map((elemento) => elemento.category.split("::")[1])
            )
          );
        });
    },
    agregarFavorito(elemento) {
      if (!this.elementosFavoritos.includes(elemento)) {
        this.elementosFavoritos.push(elemento);
        localStorage.setItem(
          "elementosFavoritos",
          JSON.stringify(this.elementosFavoritos)
        );
      }
      alert(elemento.displayName + " was saved successfully");
    },
    eliminarFavorito(elemento) {
      let index = this.elementosFavoritos.findIndex(
        (res) => res.uuid == elemento.uuid
      );
      if (index !== -1) {
        this.elementosFavoritos.splice(index, 1);
        localStorage.setItem(
          "elementosFavoritos",
          JSON.stringify(this.elementosFavoritos)
        );
      }
    },
    limpiarStorage() {
      localStorage.setItem("elementosFavoritos", JSON.stringify(""));
      this.elementosFavoritos = [];
    },
  },
  computed: {
    filtros() {
      let filtroTexto = this.elementosBk.filter((elemento) =>
        elemento.displayName
          .toLowerCase()
          .includes(this.buscarTexto.toLowerCase())
      );

      this.elementos = filtroTexto;
      if (
        this.categoriaSeleccionada === "ALL" ||
        this.categoriaSeleccionada === "Category"
      ) {
        this.elementos = filtroTexto;
      } else {
        this.elementos = filtroTexto.filter((elemento) =>
          elemento.category.includes(this.categoriaSeleccionada)
        );
      }
    },
  },
}).mount("#appWeapons");
