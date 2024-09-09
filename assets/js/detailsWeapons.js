let urlApi = "https://valorant-api.com/v1/weapons";

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      weapon: [],
      skins: false,
      damageStats: false,
    };
  },
  created() {
    let urlParams = new URLSearchParams(window.location.search);

    let weaponId = urlParams.get("uuid");

    this.getData(urlApi + "/" + weaponId);
  },
  methods: {
    getData(url) {
      fetch(url)
        .then((reponse) => reponse.json())
        .then((resp) => {
          this.weapon = resp.data;

          this.damageStats = this.weapon.weaponStats.damageRanges[0];

          this.skins = this.weapon.skins;
          this.skins = this.skins.filter(
            (res) => res.displayName != "Random Favorite Skin"
          );
          this.skins = this.skins.filter(
            (res) => !res.displayName.includes("Standard")
          );
        });
    },
  },
  computed: {},
}).mount("#app");
