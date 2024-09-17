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
    backgroundColor:'rgba(54, 162, 235, 0.2)'
  }

  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Define as reactive reference
  const chartData = ref<ChartData>({
    labels: months,
    datasets: [{ 
      data: Array(12).fill(0), // initialize with 0's
      label: 'Sales'
    }]
  });

  //process sells by each month
  const processSalesData = (sales: any) => {
    // array with 12 positions, one for each month
    const monthlySales = Array(12).fill(0);

    sales.forEach((sale: any) => {
      const saleDate = new Date(sale.date); // format date
      const month = saleDate.getUTCMonth(); // Get each month index
      monthlySales[month] += 1; // Increment sell's counter
    });

    // update chart data
    chartData.value = {
      ...chartData.value,
      datasets: [{
        ...chartData.value.datasets[0],
        data: monthlySales
      }]
    };
    //console.log(chartData.value.datasets[0].data);
  };

  const fetchSalesData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/tickets');
      const data = await response.json()
      processSalesData(data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };


  onMounted(() => {
    fetchSalesData();
  });
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