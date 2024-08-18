<template>
  <v-card :title="props.name" hover class="mt-8" elevation="2" @click="handleOpen">
    <template v-slot:subtitle>
      <v-icon icon="mdi-timer" size="20"></v-icon>
      {{ props.pauseDuration + "s" }}
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-pencil" color="primary" size="small" class="mr-2" @click="(e: Event) => handleEdit(e)"></v-btn>
      <v-btn icon="mdi-delete" size="small" @click="(e: Event) => handleRemove(e)"></v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  name: string,
  pauseDuration: number,
  isFetching: boolean
}

const props = defineProps<Props>();

const handleOpen = () => {
  console.log("Open exercise!");
}

const handleEdit = (e: Event) => {
  e.stopPropagation();
  console.log("Edit exercise!");
}

const handleRemove = (e: Event) => {
  e.stopPropagation();
  console.log("Remove exercise!");
}


</script>

<style scoped>

</style>