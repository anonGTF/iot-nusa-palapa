<template>
<div>
    <!-- Bottom Navigation -->
    <v-bottom-navigation
    color="primary"
    v-if="mobile"
    app
    >
        <v-btn 
        v-for="item in items" 
        :key="item.title" 
        router 
        :to="item.link">
            <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
    </v-bottom-navigation>
    
    <!-- Side nav -->
     <v-navigation-drawer app class="nav-drawer" v-else>
      <v-img 
      src="../assets/logo.jpeg"
      max-height="50"
      aspect-ratio="0.5"
      class="ma-5"
      ></v-img>

      <hr class="mx-14 mb-10 divider">

      <v-list
        class="pa-0"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          ripple
          class="ml-7 my-2"
          active-class="active-nav"
          router 
          :to="item.link"
        >
          <v-list-item-icon class="mr-5">
            <v-icon dense right>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-caption font-weight-bold">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
    name: 'Navbar',
    data: () => ({
        items: [
          { title: 'Beranda', icon: 'mdi-home-city', link: '/' },
          { title: 'Datalog', icon: 'mdi-flash', link: '/electricity' },
          { title: 'Akun', icon: 'mdi-account', link: '/account' },
        ],
    }),
    computed:{
        mobile() {
            return this.$vuetify.breakpoint.mobile;
        }
    }
}
</script>

<style scoped>
.nav-drawer{
  box-shadow: -10px -10px 20px #333333;
}

#divider{
  border: 0.5px solid #F2F2F2; 
}
.active-nav{
  color: blue !important;
  border-right: 5px solid blue;
}

.active-nav::before{
  opacity: 0 !important;
}
</style>