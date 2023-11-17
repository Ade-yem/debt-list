<template>
  <div class="fixed left-0 mt-5 top-5 w-[300px]">
    <div @click="switchMode">
      <button v-if="mode === 'date-mode'">Calendar</button>
      <button v-else>Names</button>
    </div>

    <div v-if="mode === 'date-mode'" class="calendar">
      <Calendar/>      
    </div>
    <div v-else>
      <h3>Names of Customers</h3>
      <ul v-for="name of names">
        <li @click="() => selectName" class="py-4 px-8 border-t cursor-pointer :ho border-gray-400 rounded-md">{{name}}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import Calendar from "./Calendar.vue"
  const emit = defineEmits(['mode', 'value']);
  const value = ref('');
  const mode = ref('date-mode') //or name-mode
  const names = ref(['Alice', 'Bob', 'Charlie', 'David', 'Eva']);
  emit('mode', mode.value)
  emit('value', value.value)
  const selectName = computed((e) => {
    value.value = e.target.value;
    return
  })

  const switchMode = () => mode.value = mode.value === "date-mode" ? "name-mode" : "date-mode";

 
</script>