<template>
  <v-container fluid class="pa-0">
      <v-row no-gutters>
          <v-col
          cols="8"
          color="red"
          class="d-none d-lg-block"
          >
            <v-img
            alt="login"
            src="../assets/bg-login.jpg"
            height="100vh"
            gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.3)"
            ></v-img>
          </v-col>
          <v-col
          cols="4"
          class="d-lg-flex d-md-block justify-center align-center">
              <v-card 
              class="pa-3"
              height="55vh"
              width="50vh">
                <v-img 
                  src="/img/company.jpg"
                  max-height="100"
                  aspect-ratio="0.5"
                  class="ma-5"
                ></v-img>
               <v-form v-model="valid" ref="form">
                 <v-text-field
                  v-model="email"
                  prepend-icon="mdi-at"
                  :rules="emailRules"
                  type="text"
                  required
                  name="email"
                  label="Email"
                 ></v-text-field>
                 <v-text-field
                    v-model="password"
                    prepend-icon="mdi-lock-outline"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show ? 'text' : 'password'"
                    required
                    name="password"
                    label="Password"
                    @click:append="show = !show"
                  ></v-text-field>
                  <v-card-actions class="d-flex justify-end">
                    <v-btn
                      class="py-3"
                      color="primary"
                      text
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

</style>