<template>
  <div class="sign-up">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs6>
          <v-text-field label="Nombre(s)" v-model="name"/> {{messages.name}}
        </v-flex>
      </v-layout>
      
      <v-layout row justify-center>
        <v-flex xs6>
          <v-text-field label="Apellidos" v-model="lastname"/> {{messages.apellidos}}
        </v-flex>
      </v-layout>
      
      <v-layout row justify-center>
        <v-flex xs2>
          <countries v-model="country"/> {{messages.country}}
        </v-flex>
        <v-flex xs4>
        </v-flex>
      </v-layout>
      
      <v-layout row justify-center>
        <v-flex xs6>
          <v-text-field label="Depósito inicial" :prefix="countryInfo.currencies[0].symbol" mask="############" v-model="balance"/> {{messages.balance}}
        </v-flex>
      </v-layout>
      
      <v-layout row justify-center>
        <v-flex xs6>
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Fecha de nacimiento"
              v-model="birthdate"
              readonly
            ></v-text-field>
            <v-date-picker show-current v-model="birthdate"></v-date-picker>
          </v-menu>  {{messages.birthdate}}
        </v-flex>
      </v-layout>

      <v-layout row justify-center>
        <v-flex xs1>
          <v-select
            :items="countryInfo.callingCodes"
            v-model="callingcode"
            label="+"
          ></v-select>
          <!--v-text-field label="+" mask="####" v-model="callingcode"/-->
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs4>
          <v-text-field label="Número de celular" mask="###########" v-model="cellphone"/> {{messages.cellphone}}
        </v-flex>
      </v-layout>

      <v-layout row justify-center>
        <v-flex xs6>
          <v-btn color="success" @click="signup"> Enviar </v-btn> 
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const URL=`https://restcountries.eu/rest/v2/alpha/`

import Countries from './Countries.vue'

export default {
  name: 'sign-up',
  components: {
    Countries
  },
  data () {
      return{
        messages: {},
        menu: false,
        name: '',
        lastname: '',
        balance: '',
        birthdate: '',
        callingcode: '',
        cellphone: '',
        country: 'COL',
        countryInfo: {
          currencies: [{symbol:''}],
          callingCodes: ['123']
        },
      }
  },
  methods: {
    signup: function (){
      this.messages = {}
      this.checkForm()
    },
    checkForm: function (){
      return true
    },
    changedCountry: function (){
      const self = this
      fetch(URL+this.country)
        .then(function (res) {
            return res.json();
        })
        .then(function (mijson) {
            self.countryInfo = mijson;
        })
    }
  },
  mounted: function  () {
      this.changedCountry()
  },
  /*_.debounce es una función de lodash
  created: function (){
    this.debouncedChangeCurrency = _.debounce(this.changeCurrency, 500)
  },*/
  watch: {
    country: function (){
      this.changedCountry()
      this.callingcode = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
