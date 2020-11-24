<template>
  <div>
    <Navbar></Navbar>
    <v-container fluid>
    <TopSetting 
    :isHome="true" 
    @updateChart="onChartUpdate" 
    @updateTime="onTimeUpdate">
    </TopSetting>
    <v-row
    no-gutters
    class="px-lg-10 px-2 pt-10"
    >
      <v-col
      cols="12"
      >
        <v-card
        elevation="5"
        rounded="xl"
        class="d-none d-md-block"
        >
          <v-card-text>
            <LineChart :chartData="chartData" :options="options" :height="200" ></LineChart>
          </v-card-text>
        </v-card>
        <div class="d-sm-block d-md-none">
          <LineChart :chartData="chartData" :options="options" :height="200" ></LineChart>
        </div>
      </v-col>
    </v-row>
    <v-row
    no-gutters
    class="px-lg-10 px-2 pt-10"
    >
      <v-col 
      :class="mid.class"
      cols="12"
      lg="4"
      v-for="mid in middleData"
      :key="mid.title">
        <v-card
            color="white"
            elevation="5"
            rounded="xl"
          >
            <div class="d-flex flex-no-wrap align-center">                
              <v-icon
              x-large
              class="pl-7 pr-2"
              :color="mid.iconColor"
              >
                {{ mid.icon }}
              </v-icon>
              <div>
                <v-card-title class="font-weight-black" v-text="mid.data"></v-card-title>
                <v-card-subtitle v-text="mid.title"></v-card-subtitle>
              </div>
            </div>
          </v-card>
      </v-col>
    </v-row>
    <v-row
    no-gutters
    class="px-lg-10 px-2 pt-10"
    >
      <v-col
      cols="12"
      >
        <v-card
        elevation="5"
        rounded="xl"
        class="d-none d-md-block">
          <v-card-text>
            <BarChart :chartData="barData" :height="100"></BarChart>
          </v-card-text>
        </v-card>
        <div class="d-sm-block d-md-none">
          <BarChart :chartData="barData" :height="200"></BarChart>
        </div>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import TopSetting from '../components/TopSetting'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'

import client from '../utils/ws'

export default {
    name: 'Home',
    components:{
      Navbar,
      TopSetting,
      LineChart,
      BarChart
    },
    data: () => ({
      chartData: null,
      barData: null,
      lineTotalData: [],
      lineRuang1Data: [],
      lineRuang2Data: [],
      lineRuang3Data: [],
      lineUtamaLabel:[],
      barUtamaData: [],
      barUtamaLabel:["ruang 1", "ruang 2", "ruang 3"],
      middleData: [
        { 
          title: "Total Biaya Listrik", 
          data: "Rp 5.720.000", 
          icon: "mdi-wallet", 
          iconColor: "blue",
          class: "pr-lg-4 pr-0 mb-2"
        },
        { 
          title: "Total Daya", 
          data: "15.000 kWh", 
          icon: "mdi-flash-circle", 
          iconColor: "yellow",
          class: "pr-lg-4 pr-0 mb-2"
        },
        { 
          title: "Ruangan terboros", 
          data: "Ruang produksi 1", 
          icon: "mdi-home-alert", 
          iconColor: "red",
          class: "mb-2"
        },
      ],
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
      fillData(){
        client.on("message", (topic, msg) => {
          let data = parseFloat(msg.toString());
          if (this.lineTotalData.length > 1) {
            data = this.lineTotalData[this.lineTotalData.length - 1] + parseFloat(msg.toString())
          }
          this.lineTotalData.push(data);
          this.barUtamaData.push(msg.toString());
          this.lineUtamaLabel.push(new Date().toDateString());
          if (this.barUtamaData.length > 3) {
            this.lineTotalData.shift();
            this.lineUtamaLabel.shift();            
            this.barUtamaData.shift();          
          }
          this.updateData()
        })
      },
      updateData(){
        this.chartData = {
            datasets: [{
              data: this.lineTotalData,
              label: "penggunaan daya total bulan ini",
              borderColor:'rgba(0,0,255,1)',
              fill: true
            }],
            labels: this.lineUtamaLabel,
            responsive: true
          }
          this.barData = {
            datasets: [{
              data: this.barUtamaData,
              label: "penggunaan daya tiap room",
              borderColor:'rgba(0,0,255,1)',
              backgroundColor:['rgba(0,255,0,1)', 'rgba(255,0,0,1)', 'rgba(0,0,255,1)'],
              fill: false
            }],
            labels: this.barUtamaLabel,
            responsive: true
          }
      },
      // setData(msg){
      //   const dataArr = msg.toString.split('#');
      //   const value = dataArr[0];
      //   const time = dataArr[1];
      //   const room = dataArr[2];


      // },
      // async testKirim(){
      //   const res = await kirimData();
      // console.log(res);
      // },
      onChartUpdate(data){
        // data berupa array
        console.log(data);
      },
      onTimeUpdate(data){
        // data berupa string
        console.log(data);
      }
    },
    created: function(){
      this.fillData();
    },
    mounted: async function() {
      this.fillData();
      await this.$store.dispatch('datalog/getData', {
        roomId: 1
      })
    }
}
</script>

<style>

</style>