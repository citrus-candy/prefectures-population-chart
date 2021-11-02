<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import Chart from 'chart.js'
import { Line, mixins as chartMixins } from 'vue-chartjs'

@Component
export default class ChartLine extends mixins(Line, chartMixins.reactiveProp) {
  @Prop()
  chartData!: Chart.ChartData

  @Prop()
  chartOptions!: Chart.ChartOptions

  mounted() {
    // @ts-ignore
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
