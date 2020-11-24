<template>
  <v-row no-gutters>
      <v-col cols="4" class="d-lg-block d-none"></v-col>
      <!-- Chart -->
      <v-col cols="6" lg="3" md="3">
        <v-select
          v-model="valueChart"
          :items="charts"
          menu-props="auto"
          label="Pilih grafik paling atas"
          hide-details
          prepend-icon="mdi-chart-timeline-variant"
          single-line
          multiple
          flat
          class="top-setting px-3 pt-1 text-body-2"
          v-if="isHome"
          @change="updateSelectedChart"
        >
            <template v-slot:selection="{ item, index }">
              <span class="d-md-block d-none">
                <span v-if="index === 0">{{ showMd(item) }}</span>
                <span
                  v-if="index === 1"
                  class="grey--text text-caption ml-1"
                >
                  (+{{ valueChart.length - 1 }})
                </span>
              </span>
            </template>
        </v-select>
      </v-col>
      <!-- Time -->
      <v-col cols="6" lg="2" md="6">
        <v-select
          v-model="valueTime"
          :items="time"
          menu-props="auto"
          label="Pilih rentang waktu"
          hide-details
          prepend-icon="mdi-calendar-blank"
          single-line
          flat
          class="top-setting px-3 pt-1 ml-2 text-body-2"
          v-if="isHome"
          @change="updateSelectedTime"
        >
        </v-select>
      </v-col>
      <!-- User -->
      <v-col cols="3" class="pl-2 d-lg-flex justify-center d-none">
        <v-avatar size="40">
          <v-img :src="this.$store.state.user.userAva"></v-img>
        </v-avatar>
        <span class="font-weight-black px-2 pt-2"> {{ this.$store.state.user.userName }} </span>
        <v-menu 
        bottom
        offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in accountItems"
                :key="i"
                link
                ripple
                router
                @click="accountClick(item.click)"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
        </v-menu>
      </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'TopSetting',
    props:{
        isHome: Boolean
    },
    data: () => ({
        user:{
        name: "Galih Tegar F",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
       valueChart: ['Total Daya Listrik'],
        charts: [
          'Total Daya Listrik',
          'Daya Listrik Ruang 1',
          'Daya Listrik Ruang 2',
          'Daya Listrik Ruang 3',
        ],
        valueTime: 'Bulan ini',
        time: [
          'Hari ini',
          'Bulan ini',
          'Tahun ini'
        ],
        accountItems: [
          {name: 'Setting Akun', link:'/account', click: 'akun'},
          {name: 'Keluar', link: '/login', click: 'keluar'}
        ]
    }),
    methods:{
        showMd(name){
        if (this.$vuetify.breakpoint.width<=1000 && name.length > 18) {
          return name.substr(0,14) + '...';
        }
        return name;
      },
      updateSelectedChart(){
        this.$emit('updateChart', this.valueChart)
      },
      updateSelectedTime(){
        this.$emit('updateTime', this.valueTime)
      },
      accountClick(id){
        if (id == 'akun') this.$router.push('/account')
        else if (id == 'keluar') this.$store.dispatch('user/keluar') 
      }
    }
}
</script>

<style>
.top-setting{
  background-color: #f2f2f2;
  border-radius: 25px;
}

.v-input__slot::before, 
.v-input__slot::after{
  border-style: none !important;
}
</style>