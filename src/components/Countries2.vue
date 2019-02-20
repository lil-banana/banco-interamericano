<template>
  <div class="text-xs-center">
    <v-menu offset-y>
      <v-btn slot="activator" color="primary" dark>
        <v-img
          :src="selectedCountry.flag"
          min-height="20px"
          max-height="40px"
          min-width="20px"
          max-width="40px">
        </v-img>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(country, index) in countriesList"
          :key="index"
          @click="selectCountry(index)"
        >
          <v-img
          min-height="15px"
          min-width="25px"
          :src="country.flag"
          >
          </v-img>
          <v-list-tile-title>{{ country.nativeName }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
  
</template>

<script>
const URL = `https://restcountries.eu/rest/v2/alpha?codes=arg;bol;bra;chl;col;cri;cub;ecu;slv;gtm;hnd;mex;nic;pan;pry;pri;per;dom;ury;ven`
export default {
  name: 'countries2',
  data () {
      return{
          countriesList: [],
          selectedCountry: {
            alpha3Code: "COL",
            flag: "https://restcountries.eu/data/col.svg"
          }
      }
  },
  methods: {
    selectCountry: function (index) {
      this.selectedCountry = this.countriesList[index]
    }
  },
  mounted: function  () {
      const self = this
      fetch(URL)
        .then(function (res) {
            return res.json();
        })
        .then(function (mijson) {
            self.countriesList = mijson;
        })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
