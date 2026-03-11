<script setup lang="ts" generic="T">

defineProps<{
  items: T[];
}>();

</script>

<template>
  <div class="p-4">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50 md:table-header-group">
      <tr>
        <slot name="header" />
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200 flex flex-col md:table-row-group">
        <tr v-for="(item, index) in items" :key="index"
            class="flex flex-col md:table-row p-4 md:p-0">
          <slot name="row" :item="item"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
