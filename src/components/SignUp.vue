<template>
  <div class="sign-up">
    <v-container v-if="showForm">
      <v-layout row justify-center>
        <v-flex xs6>
          <v-text-field :error-messages="nameField.errormessages" label="Nombre(s)" v-model="nameField.name"/>
        </v-flex>
      </v-layout>
      
      <v-layout row justify-center>
        <v-flex xs6>
          <v-text-field :error-messages="lastnameField.errormessages" label="Apellidos" v-model="lastnameField.lastname"/>
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
          <v-text-field label="Depósito inicial" :prefix="countryInfo.currencies[0].symbol" mask="############" v-model="balanceField.balance"/>
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
              :error-messages="birthdateField.errormessages"
              label="Fecha de nacimiento"
              v-model="birthdateField.birthdate"
              readonly
            ></v-text-field>
            <v-date-picker show-current v-model="birthdateField.birthdate"></v-date-picker>
          </v-menu>  {{messages.birthdate}}
        </v-flex>
      </v-layout>

      <v-layout row justify-center>
        <v-flex xs1>
          <v-select
            :error-messages="callingcodeField.errormessages"
            :items="countryInfo.callingCodes"
            v-model="callingcodeField.callingcode"
            label="+"
          ></v-select>
          <!--v-text-field label="+" mask="####" v-model="callingcode"/-->
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs4>
          <v-text-field :error-messages="cellphoneField.errormessages" label="Número de celular" mask="###########" v-model="cellphoneField.cellphone"/> {{messages.cellphone}}
        </v-flex>
      </v-layout>

      <v-layout row justify-center>
        <v-flex xs6>
          <v-btn color="success" @click="signup"> Enviar </v-btn> 
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="!showForm">
      <v-layout row justify-center>
        <v-flex xs1>
          <v-text-field label="OTP" mask="######" v-model="otp"/> {{messages.otp}}
        </v-flex>
        <v-flex xs2>
          <v-btn color="success" @click="verifyOtp"> Verificar </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs2>
          <v-btn color="error" @click="showForm = true"> Regresar </v-btn>
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
        showForm: false,
        messages: {},
        menu: false,
        nameField: {
          name: '',
        },
        lastnameField: {
          lastname: '',
        },
        country: 'COL',
        countryInfo: {
          currencies: [{symbol:''}],
          callingCodes: ['123']
        },
        balanceField: {
          balance: '',
        },
        birthdateField: {
          birthdate: '',
        },
        callingcodeField: {
          callingcode: '',
        },
        cellphoneField: {
          cellphone: '',
        },

        otp:'',
      }
  },
  methods: {
    signup: function (){
      this.messages = {}
      this.checkForm()
    },
    checkForm: function (){
      this.checkName()
      this.checkLastname()
      this.checkBirthdate()
      this.checkCallingcode()
      this.checkCellphone()
      return true
    },
    checkName: function (){
      if (this.nameField.name == '') {
        this.nameField.errormessages = ['Nombre requerido.']
        return false
      }else if(!/^[A-Z][a-z]+( [A-Z][a-z]+)?$/.test(this.nameField.name)){
        this.nameField.errormessages = ['Caracteres no permitidos / Capitalización incorrecta.']
        return false
      }else{
        delete this.nameField.errormessages
        return true
      }
    },
    checkLastname: function (){
      if (this.lastnameField.lastname == '') {
        this.lastnameField.errormessages = ['Apellido requerido.']
        return false
      }else if(!/^[A-Z][a-z]+( [A-Z][a-z]+)?$/.test(this.lastnameField.lastname)){
        this.lastnameField.errormessages = ['Caracteres no permitidos / Capitalización incorrecta.']
        return false
      }else{
        delete this.lastnameField.errormessages
        return true
      }
    },
    checkBirthdate: function (){
      if (this.birthdateField.birthdate == '') {
        this.birthdateField.errormessages = ['Fecha de nacimiento requerida.']
        return false
      }else if(this.age<18){
        this.birthdateField.errormessages = ['Debe ser mayor de 18 años para registrarse.']
        return false
      }else{
        delete this.birthdateField.errormessages
        return true
      }
    },
    checkCallingcode: function (){
      if (this.callingcodeField.callingcode == '') {
        this.callingcodeField.errormessages = ['Código de país requerido.']
        return false
      }else{
        delete this.birthdateField.errormessages
        return true
      }
    },
    checkCellphone: function (){
      if (this.cellphoneField.cellphone == '') {
        this.cellphoneField.errormessages = ['Número de celular requerido.']
        return false
      }else{
        delete this.birthdateField.errormessages
        return true
      }
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
    },
    verifyOtp(){
      this.messages = {}
      if(this.number.length < 10 || this.otp.length != 6){
        this.messages.otp = 'Formato de número/OTP inválido.'
      }else{
      //
        /*let vm = this*/
        let code = this.otp
        //
        window.confirmationResult.confirm(code).then(function (result) {
          // User signed in successfully.
          var user = result.user;
          // ...
          //route to set password !
          /*vm.$router.push({path:'/setPassword'})*/
          console.log(user)
        }).catch(function (error) {
          // User couldn't sign in (bad verification code?)
          // ...
        });
      }
    },
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
    },
    birthdate: function (newDate,oldDate){
        this.menu = false
    },
    menu: function (newVal,oldVal){
      if (newVal) {
        delete this.birthdateField.errormessages
      }
    },
  },
  computed: {
    number: function () {
      // `this` points to the vm instance
      return '+' + this.callingcodeField.callingcode + this.cellphoneField.cellphone
    },
    birthdate: function () {
      return this.birthdateField.birthdate
    },
    age: function () {
      let [y,m,d] = this.birthdate.split('-')
      let bdy = new Date(y,m,d)
      let diff = Date.now() - bdy.getTime()
      let ageDate = new Date(diff)
      return ageDate.getUTCFullYear() - 1970
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
