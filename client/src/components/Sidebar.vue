<template>
  <div class="fixed left-0 mt-10 mx-4 pr-3 top-[10vh] w-[320px] z-20 border-r overflow-y-scroll h-[90vh] scr bg-white overflow-x-hidden border-gray-400">
    <div class="flex justify-between">
      <div @click="switchMode" class="m-5">
        <button v-if="mode === 'date-mode'">Calendar</button>
        <button v-else>Names</button>
      </div>
      <div @click="toggle" class=" text-blue-400 sm:hidden my-5 cursor-pointer hover:text-gray-400"><font-awesome-icon :icon="['fas', 'times']" size="2xl" /></div>
    </div>
    <div v-if="mode === 'date-mode'" class="calendar">
      <Calendar @selectedDate="(msg) => setMess(msg)"/>      
    </div>
    <div v-else >
      <h3 class=" border-y my-2 py-4">Names of Customers</h3>
      <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" v-model="searchQuery" id="search" class="block w-full px-4 py-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Search">
    </div>
      
      <div v-for="name of filteredNames" :key="name">
        <div @click="selectName(name)" class="py-4 px-8 cursor-pointer hover:bg-gray-400">{{name}}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import Calendar from "./Calendar.vue";
import { getNames } from '../utils/api';

  defineProps({
    toggle: {
      type: Function as () => void
    }
  })
  const emit = defineEmits(['mode', 'value']);
  const selected_date = ref('');
  const selected_name = ref('')
  const mode = ref('date-mode') //or name-mode
  const names = ref<string[]>([]);
  const searchQuery = ref('');

  // emits
  watch([mode], () => {
    emit('mode', mode)
  })
  
  watch([selected_date, selected_name], () => {
    const val = mode.value === "date-mode" ? selected_date : selected_name
    emit('value', val)
  })
  
  const fetchData = async () => {
  try {
    const response = await getNames(); // Adjust the API endpoint
    names.value = response.list;
  } catch (error) {
    console.error('Error fetching names:', error);
  }
  };

  onMounted(() => fetchData())

  const selectName = (selected: string) => {
    selected_name.value = selected;
  }

  const switchMode = () => mode.value = mode.value === "date-mode" ? "name-mode" : "date-mode";
  const setMess = (msg: any) => {
    selected_date.value = msg.value
  }

  // Computed property for filtered names based on the search query
const filteredNames = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return names.value.filter((name) => name.toLowerCase().includes(query));
});
 
</script>

<style scoped>
.scr {
  scrollbar-width: none;
}
.scr::-webkit-scrollbar {
  display: none;
}
</style>