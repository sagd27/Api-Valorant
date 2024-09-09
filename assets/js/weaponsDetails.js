const urlApiWeapons = "https://valorant-api.com/v1/weapons";

const { createApp } = Vue;

const appWeaponsDetails = createApp({
  data() {
    return {
        weapon: null,
        callouts:[],
        defaultImg: ''
    };
  },
  created() {
    let urlParams = new URLSearchParams(window.location.search);

    let weaponsId = urlParams.get("uuid");

    this.getData(urlApiWeapons + "/" + weaponsId);
    console.log(urlApiWeapons + "/" + weaponsId);
  },
  methods: {
    getData(url) {
      fetch(url)
        .then((reponse) => reponse.json())
        .then((resp) => {
          this.weapon = resp.data;
                 console.log(this.weapon)

                 if (this.weapon && this.weapon.skins) {
                    this.callouts = this.weapon.skins;
                  }
                  console.log(this.callouts);
        });
    },
  },
  computed: {},
}).mount("#appWeaponsDetails");
