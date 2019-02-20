<template>
  <v-select
    :items="countriesList"
    v-model="selectedCountry"
    item-text="nativeName"
    item-value="alpha3Code"
  >
    <template slot="selection" slot-scope="data">
        <v-container align-center justify-center fill-height>
            <v-layout row>
                <v-flex xs12>
                    <v-img
                    min-height="15px"
                    min-width="25px"
                    max-height="45px"
                    max-width="75px"
                    :src="data.item.flag"
                    >
                    </v-img>
                </v-flex>
            </v-layout>
        </v-container>
    </template>
    <template slot="item" slot-scope="data">
        <v-layout row align-center>
            <v-flex xs5>
                <v-img
                min-height="15px"
                min-width="25px"
                max-height="30px"
                max-width="50px"
                :src="data.item.flag"
                >
                </v-img>
            </v-flex>
            <v-flex xs6>
                <v-list-tile-content>
                    {{ data.item.nativeName }}
                </v-list-tile-content>
            </v-flex>
        </v-layout>
    </template>
  </v-select>  
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
