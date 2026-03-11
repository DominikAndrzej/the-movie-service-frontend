<script setup lang="ts" generic="T">

defineProps<{
  items: T[];
}>();

</script>

<template>
  <div class="w-full">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="hidden md:table-header-group bg-gray-50">
      <tr>
        <slot name="header" />
      </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200 flex flex-col md:table-row-group">
      <tr
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-col md:table-row mb-4 md:mb-0 border border-gray-200 md:border-none rounded-xl md:rounded-none shadow-sm md:shadow-none mx-4 md:mx-0 p-4 md:p-0"
      >
        <slot name="row" :item="item" />
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
