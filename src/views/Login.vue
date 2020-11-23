<template>
  <v-container fluid class="pa-0 fill-height">
      <v-row no-gutters>
          <v-col
          cols="12"
          class="d-flex justify-center align-center"
          >
            <span id="bg"></span>
            <span id="bg-overlay"></span>
            <v-card 
              class="pa-10 mx-auto my-auto"
              elevation="5">
                <v-img 
                  src="../assets/logo.jpeg"
                  max-height="100"
                  aspect-ratio="0.5"
                  class="ma-5"
                ></v-img>
               <v-form v-model="valid" ref="form">
                 <v-text-field
                  v-model="email"
                  prepend-inner-icon="mdi-at"
                  :rules="emailRules"
                  type="text"
                  required
                  name="email"
                  label="Email"
                  outlined
                 ></v-text-field>
                 <v-text-field
                    v-model="password"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show ? 'text' : 'password'"
                    required
                    name="password"
                    label="Password"
                    outlined
                    @click:append="show = !show"
                  ></v-text-field>
                  <v-card-actions class="d-flex justify-end">
                    <v-btn
                      class="pa-3"
                      color="primary"
                      rounded
                      large
                      @click="login"
                    >
                      Login
                    </v-btn>
                  </v-card-actions>
               </v-form>
              </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
      valid: false,
      show: false,
      email:"",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password:"",
      passwordRules: [
        v => !!v || 'Password is required'
      ],
    }),
    methods:{
      login(){
        if (this.$refs.form.validate) {
          console.log(this.email, this.password);
          this.$router.push("/");
        } 
      }
    }
}
</script>

<style>
#bg{
   width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( '../assets/bg-login.jpg') no-repeat center center;
    background-size: cover;
}
#bg-overlay{
   width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5));
    background-size: cover;
}
</style>