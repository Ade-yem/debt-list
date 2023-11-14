<template>
<div v-if="mode.value === 'date-mode'" class="calendar">
    <h3>{{ monthYear }}</h3>
    <table :class="w-full border-collapse ">
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
				</tr>
      </thead>
      <tbody>
        <tr v-for="week in calendar" :key="week">
          <td v-for="day in week" :key="day.date" :class="{ today: isToday(day.date) }">
            {{ day.day }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
<div v-else>
  <h3>Names of Customers</h3>
	<ul v-for="const name of names">
	  <li>{{name}}</li>
	</ul>


</template>
<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['mode', 'value']);

const value = ref('');
const mode = ref('date-mode') //or name-mode

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentMonth = ref(new Date().getMonth());
    const currentYear = ref(new Date().getFullYear());

    const monthYear = computed(() => {
      const options = { month: 'long', year: 'numeric' };
      return new Date(currentYear.value, currentMonth.value).toLocaleDateString('en-US', options);
    });

    const calendar = computed(() => {
      const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
      const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const daysInMonth = lastDayOfMonth.getDate();

      let dayCounter = 1;
      const calendar = [];

      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && j < firstDayOfWeek) || dayCounter > daysInMonth) {
            week.push({ day: '', date: '' });
          } else {
            const date = new Date(currentYear.value, currentMonth.value, dayCounter);
            week.push({ day: dayCounter, date });
            dayCounter++;
          }
        }
        calendar.push(week);
      }

      return calendar;
    });

    const isToday = (date) => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    };

    return {
      daysOfWeek,
      monthYear,
      calendar,
      isToday
    };
 
</script>