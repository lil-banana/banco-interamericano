<template>
  <div class="countries">
      <select>
          <option v-for="country in countriesList" :key="country.alpha3Code" :value="country.alpha3Code"> {{ country.nativeName }} </option>
      </select>
  </div>
</template>

<script>
const URL = `https://restcountries.eu/rest/v2/alpha?codes=arg;bol;bra;chl;col;cri;cub;ecu;slv;gtm;hnd;mex;nic;pan;pry;pri;per;dom;ury;ven`
export default {
  name: 'countries',
  data () {
      return{
          countriesList: []
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
