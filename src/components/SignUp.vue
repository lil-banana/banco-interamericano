<template>
  <div class="sign-up">
    <v-container v-if="showForm">
      <v-layout row justify-center>
        <v-flex xs6>
          <v-text-field :error="nameField.error" :error-messages="nameField.errormessages" label="Nombre(s)" v-model="nameField.name"/>
        </v-flex>
      </v-layout>
      
      <v-layout row justify-center>
        <v-flex xs6>
          <v-text-field :error-messages="lastnameField.errormessages" label="Apellidos" v-model="lastnameField.lastname"/>
        </v-flex>
      </v-layout>
      
      <v-layout row justify-center>
        <v-flex xs2>
          <countries v-model="country"/>
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
          </v-menu>
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
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs4>
          <v-text-field :error-messages="cellphoneField.errormessages" label="Número de celular" mask="###########" v-model="cellphoneField.cellphone"/>
        </v-flex>
      </v-layout>

      <v-layout row justify-center>
        <v-flex id="recaptcha-container" xs6>
        </v-flex>
      </v-layout>
      
      <v-layout row justify-center>
        <v-flex xs6>
          <v-btn color="success" @click="signup"> {{sendBtn.text}} </v-btn> 
        </v-flex>
      </v-layout>
       {{messages.cellphone}}
    </v-container>


    <v-container v-if="!showForm">
      <v-layout row justify-center>
        <v-flex xs1>
          <v-text-field :error-messages="otpField.errormessages" label="OTP" mask="######" v-model="otpField.otp"/> {{messages.otp}}
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

import firebase from "firebase";

import Countries from './Countries.vue'

export default {
  name: 'sign-up',
  components: {
    Countries
  },
  data () {
      return{
        //Estados de UI
        showForm: true,
        messages: {},
        menu: false,

        //Elementos de UI
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
        otpField: {
          otp:'',
        },
        sendBtn: {
          text: 'Enviar'
        }
      }
  },
  methods: {
    signup: function (){
      this.messages = {}
      let form = this.checkForm()
      if (form) {
        this.sendSMS()
      }
    },
    checkForm: function (){
      delete this.otpField.errormessages
      let name = this.checkName()
      let lastname = this.checkLastname()
      let bdy = this.checkBirthdate()
      let code = this.checkCallingcode()
      let cellphone = this.checkCellphone()
      if (name && lastname && bdy && code && cellphone) {
        return true
      }else{
        return false
      }
    },
    checkName: function (){
      if (this.nameField.name == '') {
        this.nameField.errormessages = ['Nombre requerido.']
        this.nameField.error = true
        return false
      }else if(!/^[A-Z][a-z]+( [A-Z][a-z]+)?$/.test(this.nameField.name)){
        this.nameField.errormessages = ['Caracteres no permitidos / Capitalización incorrecta.']
        this.nameField.error = true
        return false
      }else{
        delete this.nameField.errormessages
        delete this.nameField.error
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
        delete this.callingcodeField.errormessages
        return true
      }
    },
    checkCellphone: function (){
      if (this.cellphoneField.cellphone == '') {
        this.cellphoneField.errormessages = ['Número de celular requerido.']
        return false
      }else if (this.cellphoneField.cellphone.length<10) {
        this.cellphoneField.errormessages = ['Número de celular inválido.']
        return false
      }else{
        delete this.cellphoneField.errormessages
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
    sendSMS(){
        const self = this
        
        let phoneNumber = self.number
        let appVerifier = self.appVerifier

        self.sendBtn.text = "Enviando SMS"
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            self.showForm = false
          })
          .catch(function (error) {
          // Error; SMS not sent
          // ...
          self.cellphoneField.errormessages = ['Error, SMS no enviado']
        });
    },
    verifyOtp(){
      this.messages = {}
      if(this.otpField.otp.length != 6){
        this.otpField.errormessages = ['Formato OTP inválido.']
        return false
      }else{
      //
        /*let vm = this*/
        let code = this.otpField.otp
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
    initReCaptcha(){
      setTimeout(()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': function(response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          'expired-callback': function() {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
        });
        //
        this.appVerifier =  window.recaptchaVerifier
      },1000)
    }
  },
  mounted: function  () {
      this.changedCountry()
  },
  created(){
    this.initReCaptcha()
  },
  watch: {
    country: function (){
      this.changedCountry()
      this.callingcodeField.callingcode = ''
    },
    birthdate: function (){
        this.menu = false
    },
    menu: function (newVal){
      if (newVal) {
        delete this.birthdateField.errormessages
      }
    },
  },
  computed: {
    number: function () {
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
