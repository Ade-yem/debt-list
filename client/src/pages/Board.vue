<template>

<div class="flex flex-1 space-x-1">
  <div class="hidden sm:block"><Sidebar @value="(msg) => query = msg" @mode="(md) => mode = md" :toggle="toggleMenu"/></div>
  <div v-if="menu"><Sidebar @value="(msg) => mode = msg" @mode="(md) => mode = md" :toggle="toggleMenu"/></div>
  
  <div @click="toggleMenu" class=" absolute sm:hidden top-[100px] hover:text-blue-600 right-6 cursor-pointer">
    <font-awesome-icon :icon="['fas', 'bars']" size="xl" />
  </div>
	<div class="flex flex-col mt-4 ml-0 ">
    <div>{{ query }} {{ mode }}</div>
    <div class="sm:ml-[325px] m-auto text-xs sm:text-base">
    <table class="table-fixed w-full">
        <thead>
          <tr>
            <th v-if="mode === 'date-mode'" class="">Name</th>
            <th v-else class="">Date</th>
            <th class="">Debt</th>
            <th class="">Amount Paid</th>
            <th class="">Paid</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="card in list" :key="card.id">
            <td v-if="mode === 'date-mode'" class="">{{ card.name }}</td>
            <td v-else class="">{{ card.date }}</td>
            <td class="">{{ card.amount }}</td>
            <td class="">
              <span v-if="!card.editing" @click="editAmount(card)" class="cursor-pointer text-blue-600">
                {{ card.amount_paid }}
              </span>
              <input v-else v-model="card.amount_paid" />
              <button v-if="card.editing" @click="saveAmount(card)">Save</button>
              <button v-if="card.editing" @click="cancelEdit(card)">Cancel</button>
            </td>
            <td :style="{ color: card.paid ? 'green' : 'red' }">{{ card.paid }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

</template>
<script setup lang="ts">
  import { ref, watch } from "vue";
  import Sidebar from "../components/Sidebar.vue";
import { getListByDate, getListByName } from "../utils/api";
  const menu = ref(false);
  const query = ref<string>("");
  const mode = ref("");
  type Cards = {
    id: string;
    name: string;
    amount: number;
    date: string;
    amount_paid: number;
    paid: boolean;
    editing?: boolean;
  };
  type dataType = {
    debt_list: Cards[];
    message: string;
  }
  const cardsList: Cards[] = [
  {
    id: '1',
    name: 'Alice',
    amount: 500,
    date: '19/11/2023',
    amount_paid: 200,
    paid: false,
  },
  {
    id: '1',
    name: 'Bob',
    amount: 1000,
    date: '20/11/2023',
    amount_paid: 800,
    paid: true,
  },
  {
    id: '3',
    name: 'Charlie',
    amount: 300,
    date: '21/11/2023',
    amount_paid: 150,
    paid: false,
  },
  {
    id: '4',
    name: 'David',
    amount: 750,
    date: '22/11/2023',
    amount_paid: 500,
    paid: false,
  },
  {
    id: '5',
    name: 'Eva',
    amount: 200,
    date: '23/11/2023',
    amount_paid: 100,
    paid: true,
  },
  {
    id: '6',
    name: 'Frank',
    amount: 1200,
    date: '24/11/2023',
    amount_paid: 1100,
    paid: true,
  },
  {
    id: '7',
    name: 'Grace',
    amount: 800,
    date: '25/11/2023',
    amount_paid: 400,
    paid: false,
  },
  {
    id: '8',
    name: 'Henry',
    amount: 600,
    date: '26/11/2023',
    amount_paid: 300,
    paid: false,
  },
  {
    id: '9',
    name: 'Ivy',
    amount: 400,
    date: '27/11/2023',
    amount_paid: 200,
    paid: true,
  },
  {
    id: '10',
    name: 'Jack',
    amount: 900,
    date: '28/11/2023',
    amount_paid: 700,
    paid: true,
  },
];

  const list = ref<Cards[]>(cardsList)
  const toggleMenu: (payload: MouseEvent) => void = () => menu.value = !menu.value;
	watch([query, mode], async () => {
    try {
      if (mode.value === "date-mode") {
        const data: dataType  = await getListByDate(query.value)
        list.value = data.debt_list
      } else {
        const data = await getListByName(query.value)
        list.value = data.debt_list
      }
    } catch (error) {
      console.error(error)
    }
  })
  const editAmount = (card: Cards) => {
  card.editing = true;
};

const saveAmount = (card: Cards) => {
  card.editing = false;
  // Perform any additional logic or API calls if needed
};

const cancelEdit = (card: Cards) => {
  card.editing = false;
  // Reset the amount_paid value if needed
};
</script>