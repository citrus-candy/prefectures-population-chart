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
  chartDataValues: number[] = []
  chartData: ChartData = {
    labels: this.chartDataLabels,
    datasets: []
  }

  // チャートのオプション
  chartOption: ChartOptions = {
    maintainAspectRatio: false
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

  updateChartData(compositions: Compositions[]) {
    this.chartDataValues = []
    this.chartDataLabels = []

    compositions.forEach((composition: Compositions) => {
      this.chartDataValues.push(composition.value)
      this.chartDataLabels.push(composition.year)
    })

    this.chartData = {
      labels: this.chartDataLabels,
      datasets: [
        {
          label: 'Data One',
          data: this.chartDataValues,
          borderColor: 'red',
          lineTension: 0,
          fill: false
        }
      ]
    }
  }

  @Watch('selectedPrefCodes')
  onChangeSelectedPrefCodes(newValue: number[]) {
    this.showChart = true
    if (newValue.length !== 0) {
      newValue.forEach((selectedPrefCode: number) => {
        this.getPopulation(selectedPrefCode).then(
          (compositions: Compositions[]) => {
            this.updateChartData(compositions)
          }
        )
      })
    } else {
      this.chartData = {
        labels: this.chartDataLabels,
        datasets: []
      }
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
