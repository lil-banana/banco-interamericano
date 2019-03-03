<template>
  <div class="sign-in">
    <v-container v-if="showForm">
      <v-layout row justify-center>
        <v-flex xs2>
          <countries v-model="country"/>
        </v-flex>
        <v-flex xs4>
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
        <v-flex xs6>
          <v-text-field :error-messages="lastnameField.errormessages" label="Apellidos" v-model="lastnameField.lastname"/>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs6>
          <v-btn color="success" @click="signup"> {{sendBtn.text}} </v-btn> 
        </v-flex>
      </v-layout>
       {{messages.cellphone}}
    </v-container>
    <!-- Number Input Form -->
    <template v-if="showNumberInput">
      <v-text-field v-model="number" placeholder="Phone number"/>
      <v-btn id="sign-in-button" @click="sendSMS">Obtener OTP</v-btn>
      <div id="recaptcha-container"></div>
    </template>

    <!-- SMS Verification Form -->
    <template v-if="showCodeInput">
      <v-text-field v-model="otp" placeholder="OTP"/>
      <v-btn @click="verifyOtp">Verificar</v-btn>
      <v-btn @click="sendSMS">Reenviar OTP</v-btn>
    </template>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "sign-in",

  data() {
    return {
      showForm: true,
      // UI States
      showNumberInput: true,
      showCodeInput: false,

      number: '',
      otp: '',
      // Buttons
      getSignInCodeButton: {
        text: "Get sign in code"
      },
      signInButton: {
        text: "Sign in"
      },
      country: 'COL',
      countryInfo: {
        currencies: [{symbol:''}],
        callingCodes: ['123']
      },
      //Elementos de UI
      callingcodeField: {
        callingcode: '',
      },
      cellphoneField: {
        cellphone: '',
      },
    };
  },

  methods: {
    sendSMS(){
        const self = this
        if(this.number.length < 12){
          alert('Invalid Phone Number Format !');
        }else{
          let phoneNumber = this.number
          //
          let appVerifier = this.appVerifier
          //

          self.getSignInCodeButton = {
            showSpinner: true,
            text: "Sending SMS..",
            disabled: true
          };
          firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              //
              self.showNumberInput= false
              self.showCodeInput= true
              alert('SMS sent')
            }).catch(function (error) {
            // Error; SMS not sent
            // ...
            
            alert('Error ! SMS not sent')
          });
        }
    },
    verifyOtp(){
      if(this.number.length < 12 || this.otp.length != 6){
        alert('Invalid Phone Number/OTP Format !');
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
    initReCaptcha(){
      setTimeout(()=>{
        /*let vm = this*/
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
  },
  created(){
    this.initReCaptcha()
  },
  mounted: function  () {
      this.changedCountry()
  },
  watch: {
    country: function (){
      this.changedCountry()
      this.callingcodeField.callingcode = ''
    },
  },
  computed: {
    number: function () {
      return '+' + this.callingcodeField.callingcode + this.cellphoneField.cellphone
    },
  }
};
</script>