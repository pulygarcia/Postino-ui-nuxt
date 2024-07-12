<script setup lang="ts">
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


  interface ChartDataset {
    data: number[];
    label: string;
  }

  interface ChartData {
      labels: string[];
      datasets: ChartDataset[];
  }

  const chartOptions = {
    responsive: true,
    backgroundColor: [
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(54, 162, 235, 0.2)',
    ]
  }

  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const chartData: ChartData = {
    labels: months,
    datasets: [{ 
        data: [230, 160, 362, 215, 224, 230, 160, 362, 215, 224, 215, 224] , //Sales per month (example)
        label: 'Sales'
    }],
  }
</script>

<template>
    <div class="w-full">
      <Bar
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
      />
    </div>
</template>