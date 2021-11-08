<template>
  <div class="container">
    <checkboxes v-model="selectedPrefCodes" :prefectures="prefectures" />
    <div v-show="showChart" class="chart-container">
      <chart-line
        :chart-data="chartData"
        :chart-options="chartOption"
        :styles="chartStyles"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { ChartData, ChartOptions } from 'chart.js'
import { Context } from '@nuxt/types'
import Checkboxes from '@/components/Checkboxes.vue'
import ChartLine from '@/components/Chart.vue'

interface Compositions {
  year: number
  value: number
}

@Component({
  components: {
    Checkboxes,
    ChartLine
  },
  async asyncData(context: Context) {
    const prefectures = await context.$axios.get(
      `${context.$config.baseUrl}api/v1/prefectures`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-API-Key': context.$config.apiKey
        }
      }
    )
    return {
      prefectures: prefectures.data.result
    }
  }
})
export default class ChartPage extends Vue {
  selectedPrefCodes: number[] = []

  showChart: boolean = false
  chartDataLabels: number[] = []
  chartDataSets: any[] = []

  chartData: ChartData = {
    labels: this.chartDataLabels,
    datasets: this.chartDataSets
  }

  // チャートのオプション
  chartOption: ChartOptions = {
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
    scales: {
      xAxes: [{ scaleLabel: { display: true, labelString: '年度' } }],
      yAxes: [{ scaleLabel: { display: true, labelString: '人口数' } }]
    }
  }

  // チャートのスタイル: <canvas>のstyle属性として設定
  chartStyles = {
    height: '100%',
    width: '100%'
  }

  async getPopulation(selectedPrefCode: number): Promise<Compositions[]> {
    const response = await this.$axios.get(
      `${this.$config.baseUrl}api/v1/population/composition/perYear`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-API-KEY': this.$config.apiKey
        },
        params: {
          prefCode: selectedPrefCode,
          cityCode: '-'
        }
      }
    )
    return response.data.result.data[0].data
  }

  updateChartLabels(compositions: Compositions[]) {
    this.chartDataLabels.length = 0
    compositions.forEach((composition: Compositions) => {
      this.chartDataLabels.push(composition.year)
    })
  }

  updateChartData(compositions: Compositions[]) {
    const chartDataValues: number[] = []

    compositions.forEach((composition: Compositions) => {
      chartDataValues.push(composition.value)
    })

    this.chartDataSets?.push({
      label: 'Data One',
      data: chartDataValues,
      borderColor: this.randomColorHex(),
      lineTension: 0,
      fill: false
    })
  }

  randomColorHex(): string {
    let color = Math.ceil(16777215 * Math.random()).toString(16)
    let length = color.length
    while (length < 6) {
      color = `0${color}`
      length++
    }
    return `#${color}`
  }

  @Watch('chartDataLabels')
  onChangeChartDataLabels(chartDataLabels: number[]) {
    if (chartDataLabels !== []) this.showChart = true
  }

  @Watch('selectedPrefCodes')
  onChangeSelectedPrefCodes(selectedPrefCodes: number[]) {
    if (!this.showChart) {
      this.getPopulation(1).then((compositions: Compositions[]) =>
        this.updateChartLabels(compositions)
      )
    }
    if (selectedPrefCodes.length !== 0) {
      this.chartDataSets.length = 0
      selectedPrefCodes.forEach(async (selectedPrefCode: number) => {
        await this.getPopulation(selectedPrefCode).then(
          (compositions: Compositions[]) => this.updateChartData(compositions)
        )
        this.chartData = {
          labels: this.chartDataLabels,
          datasets: this.chartDataSets
        }
      })
    } else {
      this.showChart = false
    }
  }
}
</script>

<style scoped>
.container {
  margin: 8px;
}
</style>

<style>
.chart-container {
  /**
   * vue-chartjsで生成する<canvas>がabsoluteのため、
   * relateveを設定
   */
  position: relative;

  /**
   * chartStylesを設定しているので、
   * height/wightが有効になる
   */
  height: 40vh;
  width: 80vw;
  margin: 0 auto;
}
</style>
