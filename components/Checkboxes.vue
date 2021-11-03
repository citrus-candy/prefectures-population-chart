<template>
  <div class="checkboxes-container">
    <div class="title">
      {{ title }}
    </div>
    <div class="checkboxes">
      <label v-for="prefecture in prefectures" :key="prefecture.id">
        <input type="checkbox" name="prefecture" :value="prefecture.id" />
        {{ prefecture.name }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

interface Prefectures {
  id: number
  name: string
}

@Component
export default class Checkboxes extends Vue {
  title: string = '都道府県'
  prefectures: Prefectures[] = [
    {
      id: 0,
      name: '北海道'
    },
    {
      id: 1,
      name: '岩手県'
    },
    {
      id: 0,
      name: '北海道'
    },
    {
      id: 1,
      name: '岩手県'
    },
    {
      id: 0,
      name: '北海道'
    },
    {
      id: 1,
      name: '岩手県'
    },
    {
      id: 0,
      name: '北海道'
    },
    {
      id: 1,
      name: '岩手県'
    },
    {
      id: 0,
      name: '北海道'
    },
    {
      id: 1,
      name: '岩手県'
    },
    {
      id: 0,
      name: '北海道'
    },
    {
      id: 1,
      name: '岩手県'
    },
    {
      id: 0,
      name: '北海道'
    },
    {
      id: 1,
      name: '岩手県'
    },
    {
      id: 0,
      name: '北海道'
    },
    {
      id: 1,
      name: '岩手県'
    }
  ]
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
