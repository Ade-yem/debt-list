<template>
  <div class="fixed left-0 mt-5 mx-4 pr-3 top-[10vh] w-[320px] z-10 border-r overflow-y-scroll h-[90vh] overflow-x-hidden scr border-gray-400">
    <div class="flex justify-between">
      <div @click="switchMode" class="m-5">
        <button v-if="mode === 'date-mode'">Calendar</button>
        <button v-else>Names</button>
      </div>
      <!-- @ts-ignore  -->
      <div @click="toggle" class=" text-blue-400 sm:hidden my-5 cursor-pointer hover:text-gray-400"><font-awesome-icon :icon="['fas', 'times']" size="2xl" /></div>
    </div>
    <div v-if="mode === 'date-mode'" class="calendar">
      <Calendar @selectedDate="(msg) => value = msg"/>      
    </div>
    <div v-else >
      <h3 class=" border-y my-2 py-4">Names of Customers</h3>
      <div v-for="name of names" :key="name">
        <div @click="selectName(name)" class="py-4 px-8 cursor-pointer hover:bg-gray-400">{{name}}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, defineEmits, defineProps } from 'vue';
  import Calendar from "./Calendar.vue";

  defineProps({
    toggle: {
      type: Function as () => void
    }
  })
  const emit = defineEmits(['mode', 'value']);
  const value = ref('');
  const mode = ref('date-mode') //or name-mode
  const names = ref(['Alice', 'Bob', 'Charlie', 'David', 'Eva', "Ayo", "Segun", "Yinka", "Dayo", "Sola"]);

  // emits
  emit('mode', mode)
  emit('value', value)

  const selectName = (selected_name: string) => {
    value.value = selected_name;
  }

  const switchMode = () => mode.value = mode.value === "date-mode" ? "name-mode" : "date-mode";

 
</script>

<style scoped>
.scr {
  scrollbar-width: none;
}
.scr::-webkit-scrollbar {
  display: none;
}
</style>