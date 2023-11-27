<template>
  <div class="m-auto">
    <div class="bg-blue-500 text-white p-4 flex justify-between rounded-t-xl items-center space-x-2">
      <button @click="prevMonth" class="focus:outline-none text-blue-400 py-1">&lt;</button>
      <div class="flex items-center">
        <span class="mr-2">{{ month }} </span>
        <select v-model="currentYear" @change="selectYear" class=" border-none p-1 text-blue-400">
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <button @click="nextMonth" class="focus:outline-none text-blue-400 py-1">&gt;</button>
    </div>
    <table class="w-full table-fixed border-collapse bg-white shadow-lg">
      <thead>
        <tr>
          <th v-for="day in days" :key="day" class="p-2 bg-gray-200">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in calendar" key="week" class="">
          <td
            v-for="date in week"
            :key="date"
            @click="selectDate(date)"
            :class="['p-2 cursor-pointer hover:bg-blue-100', isToday(currentYear, currentMonth, date) ? 'bg-green-100' : 'bg-inherit']"
          >
            {{ date > 0 ? date : '' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

  
  <script setup lang="ts">
    import { ref, computed, watch } from 'vue';
  
    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate: Date = new Date();
    const currentMonth = ref<number>(currentDate.getMonth() + 1);
    const currentYear = ref<number>(currentDate.getFullYear());
    const selectedDate = ref<string | null>(currentDate.toLocaleDateString());
    const emit = defineEmits(["selectedDate"])
    watch([selectedDate], () => {
      emit("selectedDate", selectedDate)
    })
    
    const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value, 0).getDate());

    const calendar = computed(() => {
      const firstDayOfMonth: number = new Date(currentYear.value, currentMonth.value - 1, 1).getDay();
      const weeks: number[][] = [[]];
      let currentWeek: number = 0;

      for (let i: number = 0; i < firstDayOfMonth; i++) {
        weeks[currentWeek].push(-1);
      }

      for (let day: number = 1; day <= daysInMonth.value; day++) {
        if (weeks[currentWeek].length === 7) {
          currentWeek++;
          weeks[currentWeek] = [];
        }
        weeks[currentWeek].push(day);
      }

      return weeks;
    });

    const availableYears = computed(() => {
      const startYear: number = currentYear.value - 10;
      const endYear: number = currentYear.value + 10;
      const years: number[] = [];
      for (let year: number = startYear; year <= endYear; year++) {
        years.push(year);
      }
      return years;
    });

    const isToday = (year: number, month: number, date: number): boolean => {
      const today = new Date();
      return (
        today.getFullYear() === year &&
        today.getMonth() + 1 === month &&
        today.getDate() === date
      );
    };

    const prevMonth = () => {
      if (currentMonth.value === 1) {
        currentMonth.value = 12;
        currentYear.value--;
      } else {
        currentMonth.value--;
      }
    };

    const nextMonth = () => {
      if (currentMonth.value === 12) {
        currentMonth.value = 1;
        currentYear.value++;
      } else {
        currentMonth.value++;
      }
    };

    const selectYear = () => {
      currentMonth.value = 1; // Reset month to January when changing the year
    };

    const selectDate = (date: number) => {
      if (date > 0) {
        selectedDate.value = new Date(currentYear.value, currentMonth.value - 1, date).toLocaleDateString();
      }
    };

    const month = computed(() => {
      return new Intl.DateTimeFormat('en-US', {month: "long"}).format(new Date(currentYear.value, currentMonth.value - 1));
    })

    watch([currentMonth, currentYear], () => {
      selectedDate.value = null; // Reset selected date when changing the month or year
    });

  </script>
  