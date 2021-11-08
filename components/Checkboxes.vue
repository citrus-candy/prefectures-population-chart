<template>
  <div class="checkboxes-container">
    <div class="title">
      {{ title }}
    </div>
    <div class="checkboxes">
      <label v-for="prefecture in prefectures" :key="prefecture.prefCode">
        <input
          :id="prefecture.prefCode"
          v-model="selectedPrefCodes"
          type="checkbox"
          :value="prefecture.prefCode"
        />
        {{ prefecture.prefName }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'nuxt-property-decorator'
import { Prefectures } from '@/types/interface.d'

@Component
export default class Checkboxes extends Vue {
  @Prop({ type: Array, required: true })
  prefectures!: Prefectures

  @VModel({ type: Array, required: true })
  selectedPrefCodes!: number[]

  title: string = '都道府県'
}
</script>

<style scoped>
.checkboxes-container {
  margin: 20px 0;
}

.checkboxes {
  margin: 10px;
}

.checkboxes label {
  display: inline-block;
  margin: 5px;
}
</style>
