<template>
<div>
  <Navbar></Navbar>
<v-container fluid>
    <TopSetting></TopSetting>
    <v-row>
      <v-col
      cols="12"
      >
        <v-card
        class="mx-10 mt-5 rounded-xl"
        elevation="5"
        >
          <v-card-title>
            <h3>Akun</h3>
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr>
                  <th>NIP</th>
                  <td>{{ getUserData.userID }}</td>
                </tr>
                <tr>
                  <th>Nama</th>
                  <td>{{ getUserData.userName }}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ getUserData.userEmail }}</td>
                </tr>
                <tr>
                  <th>Profile Pict</th>
                  <td class="pt-2">
                    <v-avatar>
                      <v-img :src="getUserData.userAva"></v-img>
                    </v-avatar>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-card-actions class="px-5 pb-5">
            <v-btn 
            small 
            text-uppercase 
            class="pa-3 primary"
            @click.stop="dialog = true">
            <v-icon left>
              mdi-pencil
            </v-icon>
            Edit Akun
            </v-btn>
            <v-btn 
            small 
            text-uppercase 
            text
            class="pa-3 ml-3"
            @click="keluar">
            <v-icon left>
              mdi-logout-variant
            </v-icon>
            Keluar
            </v-btn>
            <v-dialog max-width="600px" v-model="dialog">
            <v-card>
                <v-card-title>
                    <h5>Edit akun</h5>
                </v-card-title>
                <v-card-text>
                    <v-form class="px-3" ref="form">
                        <v-text-field  
                          label="nip" 
                          v-model="nip" 
                          prepend-icon="mdi-folder" 
                          :rules="nipRules">
                        </v-text-field>
                        <v-text-field  
                          label="name" 
                          v-model="name" 
                          prepend-icon="mdi-folder" 
                          :rules="nameRules">
                        </v-text-field>
                        <v-text-field  
                          label="email" 
                          v-model="email" 
                          prepend-icon="mdi-folder" 
                          :rules="emailRules">
                        </v-text-field>
                        <v-file-input
                          :rules="avaRules"
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="Pick an avatar"
                          prepend-icon="mdi-camera"
                          label="Avatar"
                          v-model="avatar"
                        ></v-file-input>
                        <v-btn 
                          depressed 
                          color="success" 
                          :loading="loading" 
                          class="mx-0 mt-3" 
                          @click="submit">
                          Submit
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import Navbar from '../components/Navbar'
import TopSetting from '../components/TopSetting'
import { mapGetters } from 'vuex'

export default {
    name: 'Account',
    components: {
      TopSetting,
      Navbar
    },
    data: () => ({
      loading: false,
      dialog: false,
      avatar:'',
      name: "",
      nip: "",
      email: "",
      nipRules: [
        v => !!v || 'NIP is required',
        v => v.length == 10 || 'NIP must be 10 digits',
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      avaRules:[
        v => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ]
    }),
    methods:{
      submit(){
        if (this.$refs.form.validate()){
          this.dialog = false;
          console.log(this.name,this.nip,this.email);
        }
      },
      keluar(){
        this.$store.dispatch('user/keluar') 
      }
    },
    computed: {
      ...mapGetters('user', ['getUserData', ])
    },
    mounted(){
      console.log(this.getUserData);
    }
}
</script>

<style>

</style>