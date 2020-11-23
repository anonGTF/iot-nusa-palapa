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
      iniData: [],
      iniLabel:[],
      iniDataBar: [],
      iniLabelBar:[],
      barData: null,
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
          if (this.iniData.length > 1) {
            data = this.iniData[this.iniData.length - 1] + parseFloat(msg.toString())
          }
          this.iniData.push(data);
          this.iniDataBar.push(msg.toString());
          this.iniLabel.push(new Date().toDateString());
          this.iniLabelBar.push("l");
          if (this.iniDataBar.length > 6) {
            this.iniData.shift();
            this.iniLabel.shift();            
            this.iniDataBar.shift();
            this.iniLabelBar.shift();            
          }
          this.updateData()
        })
      },
      updateData(){
        this.chartData = {
            datasets: [{
              data: this.iniData,
              label: "penggunaan daya total bulan ini",
              borderColor:'rgba(0,0,255,1)',
              fill: true
            }],
            labels: this.iniLabel,
            responsive: true
          }
          this.barData = {
            datasets: [{
              data: this.iniDataBar,
              label: "penggunaan daya tiap room",
              borderColor:'rgba(0,0,255,1)',
              fill: false
            }],
            labels: this.iniLabelBar,
            responsive: true
          }
      },
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
    mounted: function() {
      this.fillData();
    }
}
</script>

<style>

</style>