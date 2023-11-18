<template>
    <div>
      <div class="calendar-header">
        <button @click="prevMonth">&lt;</button>
        <div>
          {{ currentMonth }} {{ currentYear }}
          <select v-model="currentYear" @change="selectYear">
            <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <button @click="nextMonth">&gt;</button>
      </div>
      <table class="calendar-table">
        <thead>
          <tr>
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in calendar" :key="week">
            <td
              v-for="date in week"
              :key="date"
              @click="selectDate(date)"
              :class="{ 'today': isToday(currentYear, currentMonth, date) }"
            >
              {{ date > 0 ? date : '' }}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        Selected Date: {{ selectedDate }}
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, computed, watch } from 'vue';
  
  export default {
    name: 'Calendar',
    setup() {
      const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const currentDate: Date = new Date();
      const currentMonth = ref<number>(currentDate.getMonth() + 1);
      const currentYear = ref<number>(currentDate.getFullYear());
      const selectedDate = ref<Date | null>(currentDate);
  
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
          selectedDate.value = new Date(currentYear.value, currentMonth.value - 1, date);
        }
      };
  
      watch([currentMonth, currentYear], () => {
        selectedDate.value = null; // Reset selected date when changing the month or year
      });
  
      return {
        days,
        currentMonth,
        currentYear,
        selectedDate,
        calendar,
        availableYears,
        isToday,
        prevMonth,
        nextMonth,
        selectYear,
        selectDate,
      };
    },
  };
  </script>
  
  <style scoped>
  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .calendar-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .calendar-table th,
  .calendar-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .calendar-table td {
    cursor: pointer;
  }
  
  .calendar-table td:hover {
    background-color: #f5f5f5;
  }
  
  .today {
    background-color: #a6a6a6;
    color: #fff;
    border-radius: 50%;
  }
  </style>
  