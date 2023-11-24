<template>

<div class="flex flex-1 space-x-1">
  <div class="hidden sm:block"><Sidebar @value="(msg) =>setVal(msg)" @mode="(md) => mode = md" :toggle="toggleMenu"/></div>
  <div v-if="menu"><Sidebar @value="(msg) => setVal(msg)" @mode="(md) => mode = md" :toggle="toggleMenu"/></div>
  <div class=" absolute flex flex-col gap-4 py-6 px-2 bg-blue-400 sm:text-blue-500 sm:hover:text-blue-200 sm:bg-transparent text-white rounded-lg z-10 top-[100px] hover:text-blue-600 right-6 cursor-pointer">
    <font-awesome-icon @click="toggleMenu" :icon="['fas', 'bars']" size="xl" class="sm:hidden" />
    <font-awesome-icon @click="createRecord" :icon="['fas', 'plus']" size="xl" />
  </div>

	<div class="">
    <div class="my-5">Query: <span>{{ query }}</span></div>
    <div class="sm:ml-[325px] m-auto text-xs sm:text-base">
    <table class="table-fixed w-full">
        <thead>
          <tr class="">
            <th v-if="mode === 'date-mode'" class="border-y">Name</th>
            <th v-else class=" border-y">Date</th>
            <th class=" border-y">Debt</th>
            <th class="border-y">Amount Paid</th>
            <th class="border-y">Paid</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="card in list" :key="card.id">
            
            <td v-if="mode === 'date-mode'" class="border-y">{{ card.name }}</td>
            <td v-else class="border-y">{{ card.date }}</td>
            <td class="border-y">{{ card.amount }}</td>
            <td class="border-y">
              <span v-if="!card.editing" @click="editAmount(card)" class="cursor-pointer text-blue-600">
                {{ card.amount_paid }}
              </span>
              <input v-else v-model="card.amount_paid" />
              <button v-if="card.editing" @click="saveAmount(card)">Save</button>
              <button v-if="card.editing" @click="cancelEdit(card)">Cancel</button>
            </td>
            <td class="border-y">
              <div v-if="card?.paid" class=" bg-green-600 h-5 w-5 rounded-full"></div>
              <div v-else class="bg-red-500 h-5 w-5 rounded-full"></div>
              <span>&or;</span>
            </td>            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="absolute z-20 text-center mx-8 border top-[80px] right-2 rounded-se-lg w-3/4 h-fit bg-white" v-if="modal">
    <div class="flex justify-between text-blue-400 m-5">
      <h3>Add a record</h3>
      <font-awesome-icon @click="createRecord" :icon="['fas', 'times']" size="xl" />
    </div>
    
    <form @submit.prevent="save" class="m-5 rounded-lg p-5">
      <div class="relative mb-6">
        <input type="text" required v-model="record.name" id="name" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label for="name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Name</label>
      </div>
      <div class="relative mb-6">
        <input type="number" required v-model="record.amount" id="amount" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label for="amount" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Amount</label>
      </div>
      <div class="relative mb-6">
        <input type="number" v-model="record.amount_paid" id="amount_paid" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label for="amount_paid" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Amount Paid</label>
      </div>
      <div class="relative mb-6">
        <input type="date" required v-model="date" id="date" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label for="date" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Date</label>
      </div>
      <div class="relative mb-6">
        <input type="text" v-model="record.comment" id="comment" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label for="comment" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Comment</label>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
    </form>
  </div>
</div>

</template>
<script setup lang="ts">
  import { ref, watch } from "vue";
  import Sidebar from "../components/Sidebar.vue";
import { addCard, getListByDate, getListByName, editCard } from "../utils/api";
import { store } from "../utils/store";
  
  const menu = ref(false);
  const query = ref<string>("");
  const mode = ref<"date-mode" | "name-mode">("date-mode");
  const list = ref<Cards[]>([]);
  const modal = ref<boolean>(false);
  const date = ref<any>("")
  type Cards = {
    id?: string;
    name: string;
    amount: number;
    date: string;
    amount_paid: number;
    paid: boolean;
    written_by?: string;
    comment?: string;
    editing?: boolean;
  };
  type dataType = {
    debt_list: Cards[];
    message: string;
  }
  const record = ref<Cards>({
    name: '', amount: 0, date: new Date().toLocaleDateString("en-US"), amount_paid: 0, paid: false, written_by: store.user, comment: ""
  })
  const save = async () => {
    record.value.date = new Date(date.value).toLocaleDateString("en-US")
    console.log(record.value)
    const res = await addCard(record.value)
    if (mode.value === "name-mode" && record.value.name === query.value || mode.value === "date-mode" && record.value.date === query.value) {
      list.value.push(res.card)
    }
    modal.value = false
  }
  const setVal = (val: any) => query.value = val.value;
  const createRecord: (payload: MouseEvent) => void = () => modal.value = !modal.value
  const toggleMenu: (payload: MouseEvent) => void = () => menu.value = !menu.value;
	watch([query, mode], async () => {
    try {
      if (mode.value === "name-mode") {
        const data: dataType = await getListByName(query.value)
        console.log(data)
        list.value = data.debt_list
      }
      else {
        const data: dataType  = await getListByDate(query.value)
        list.value = data.debt_list
        console.log(data)
      } 
    } catch (error) {
      console.error(error)
    }
  })
  const editAmount = (card: Cards) => {
    card.editing = true;
  };

  const saveAmount = async (card: Cards) => {
    card.editing = false;
    // Perform any additional logic or API calls if needed
    const res = await editCard(card);
    console.log(res.data)
  };

  const cancelEdit = (card: Cards) => {
    card.editing = false;
    // Reset the amount_paid value if needed

  };
</script>