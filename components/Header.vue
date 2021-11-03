<template>
  <div class="header">
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Header extends Vue {
  @Prop({ type: String, required: false, default: 'Title' })
  title!: string
}
</script>

<style scoped>
.header {
  padding: 5px;
  background-color: #c4c4c4;
}

.title {
  text-align: center;
  font-size: 2rem;
}
@media screen and (max-width: 420px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
