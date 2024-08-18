<template>
  <v-card :title="props.name" :subtitle="props.pauseDuration + 's'" hover class="mt-8" elevation="2"></v-card>
</template>

<script setup lang="ts">
interface Props {
  name: string,
  pauseDuration: number,
  isFetching: boolean
}

const props = defineProps<Props>();


</script>

<style scoped>

</style>