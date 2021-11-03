<template>
  <div class="container">
    <checkboxes />
    <div class="chart-container">
      <chart-line
        :chart-data="chartData"
        :chart-options="chartOption"
        :styles="chartStyles"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ChartData, ChartOptions } from 'chart.js'
import Checkboxes from '@/components/Checkboxes.vue'
import ChartLine from '@/components/Chart.vue'

@Component({
  components: {
    Checkboxes,
    ChartLine
  }
})
export default class ChartPage extends Vue {
  chartData: ChartData = {
    // 横軸のラベル
    labels: ['A', 'B', 'C', 'D', 'E'],
    // データのリスト
    datasets: [
      {
        label: 'Data One', // データのラベル
        data: [1, 5, 3, 4, 3] // データの値。labelsと同じサイズ
      },
      {
        label: 'Data Two',
        data: [10, 50, 30, 40, 30]
      }
    ]
  }

  // チャートのオプション
  chartOption: ChartOptions = {
    // アスペクト比を固定しないように変更
    maintainAspectRatio: false
  }

  // チャートのスタイル: <canvas>のstyle属性として設定
  chartStyles = {
    height: '100%',
    width: '100%'
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
