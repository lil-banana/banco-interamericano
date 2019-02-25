<template>
  <div>
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
      }
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
    }
  },
  created(){
    this.initReCaptcha()
  }
};
</script>