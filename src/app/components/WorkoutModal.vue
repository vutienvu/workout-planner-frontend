<template>
  <v-dialog v-model="isOpen" width="auto">
    <v-card min-width="400">
      <slot name="header"/>

<!--      <slot v-for="i in [1, 2]" :name="`input${i}`"/>-->
      <slot name="input"/>

      <template v-slot:actions>
        <slot name="actionButton"/>

        <v-btn @click="isOpen = false">Cancel</v-btn>
      </template>
    </v-card>
  </v-dialog>

  <slot name="snackbarText"/>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>('openModal', { required: true});
</script>

<style scoped>

</style>