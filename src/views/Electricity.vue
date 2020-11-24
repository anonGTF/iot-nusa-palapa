<template>
  <div>
    <Navbar></Navbar>
    <v-container>
    <TopSetting></TopSetting>
    <v-row
    no-gutters
    class="px-lg-10 px-2 pt-10"
    >
      <v-col
      cols="12"
      >
        <v-card
        elevation="3"
        rounded="xl"
        class="d-none d-md-block"
        >
          <v-card-text>
            <LineChart :chartData="chartData" :options="options" :height="400"></LineChart>
          </v-card-text>
        </v-card>
        <div class="d-sm-block d-md-none">
          <LineChart :chartData="chartData" :options="options" :height="100"></LineChart>
        </div>
      </v-col>
    </v-row>
    <v-row
    no-gutters
    class="d-flex mt-10 mx-10 justify-end"
    >
      <v-select
          :items="ruang"
          v-model="ruangSelected"
          label="Pilih ruangan"
          outlined
          class="mr-5"
          @change="ruangChanged"
        ></v-select>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Pilih waktu"
            prepend-inner-icon="mdi-calendar"
            outlined
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          type="month"
          no-title
          scrollable
          @change="timeChanged"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      
    </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import TopSetting from '../components/TopSetting'
import LineChart from '../components/LineChart'

export default {
    name: 'Electricity',
    components:{
      Navbar,
      TopSetting,
      LineChart
    },
    data: () => ({
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      ruang:["total", "ruang 1", "ruang 2", "ruang 3"],
      ruangSelected: 'total',
      ruangId: 4,
      lineData: [],
      lineLabel: [],
      chartData: null,
      options: { //Chart.js options
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  },
                  gridLines: {
                    display: true
                  }
                }],
                xAxes: [ {
                  gridLines: {
                    display: false
                  }
                }]
              },
              legend: {
                display: true
              },
              responsive: true,
              maintainAspectRatio: false,
              elements:{
                point: {
                  radius:0
                }
              },
              animation: { duration: 0 }
            }
    }),
    methods:{
      updateData(){
        this.chartData = {
            datasets: [{
              data: this.lineData,
              label: "penggunaan daya total bulan ini",
              borderColor:'rgba(0,0,255,1)',
              fill: true
            }],
            labels: this.lineLabel,
            responsive: true
          }
      },
      setLineData(){
        const dataLog = this.$store.state.datalog.dataLog[this.ruangId - 1];
        this.lineData = [];
        this.lineLabel = [];
        dataLog.log.forEach((log, i) => {
            if (i == 0) this.lineData.push(log.value);
            else this.lineData.push(log.value + this.lineData[i - 1]);
            this.lineLabel.push(log.time);
        });
      },
      timeChanged(){
        console.log(this.date);
      },
      ruangChanged(){
        switch (this.ruangSelected) {
          case 'total':
            this.ruangId = 4
            break;
          case 'ruang 1':
            this.ruangId = 1
            break;
          case 'ruang 2':
            this.ruangId = 2
            break;
          case 'ruang 3':
            this.ruangId = 3
            break;
        }
        console.log(this.ruangSelected, this.ruangId);
        this.setLineData();
        this.updateData();
      }
    },
    async mounted(){
      await this.$store.dispatch('datalog/getData', { roomId: 1 })
      await this.$store.dispatch('datalog/getData', { roomId: 2 })
      await this.$store.dispatch('datalog/getData', { roomId: 3 })
      await this.$store.dispatch('datalog/getSumData')
      
      this.setLineData();
      this.updateData();
    }
}
</script>

<style>

</style>