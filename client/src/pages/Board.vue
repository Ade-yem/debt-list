<template>

<div class="flex flex-1 space-x-1">
  <div class="hidden sm:block"><Sidebar @value="(msg) =>setVal(msg)" @mode="(md) => mode = md" :toggle="toggleMenu"/></div>
  <div v-if="menu"><Sidebar @value="(msg) => setVal(msg)" @mode="(md) => mode = md" :toggle="toggleMenu"/></div>
  <div class=" absolute flex flex-col gap-4 py-6 px-2 bg-blue-400 sm:text-blue-500 sm:hover:text-blue-200 sm:bg-transparent text-white rounded-lg z-10 top-[80px] hover:text-blue-600 right-0 cursor-pointer">
    <font-awesome-icon @click="toggleMenu" :icon="['fas', 'bars']" size="xl" class="sm:hidden" />
    <font-awesome-icon @click="createRecord" :icon="['fas', 'plus']" size="xl" />
  </div>
<!-- table -->
	<div class="mt-20">
    <div class="my-5 font-mono font-semibold">Query: <span>{{ query }}</span></div>

    <div class="sm:ml-[325px] m-auto text-xs sm:text-base">
      <table class=" table w-full">
    <thead>
      <tr class="">
        <th v-if="mode === 'date-mode'" class="border-y py-4 px-6">Name</th>
        <th v-else class="border-y py-4 px-6">Date</th>
        <th class="border-y py-4 px-6">Debt</th>
        <th class="border-y py-4 px-6">Amount Paid</th>
        <th class="border-y w-[4rem]">Paid</th>
        <th class="border-y"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="card in list" :key="card._id">
        <td v-if="mode === 'date-mode'" class="border-y text-center px-6 py-4">{{ card.name }}</td>
        <td v-else class="border-y text-center px-6 py-4">{{ card.date }}</td>
        <td class="border-y text-center px-6 py-4">{{ card.amount }}</td>
        <td class="border-y text-center px-6 py-4">
          <span v-if="!card.editing" @click="editAmount(card)" class="cursor-pointer text-blue-600">
            {{ card.amount_paid }}
          </span>
          <input v-else v-model="editValue" @blur="saveAmount(card)"/>
        </td>
        <td class="border-y w-[4rem] table-cell relative align-middle">
          <div v-if="card?.paid" class="bg-green-600 h-5 absolute top-[50%] m-0 left-[50%] -translate-y-[50%] -translate-x-[50%] mr-[50%] w-5 rounded-full "></div>
          <div v-else class="bg-red-500 h-5 absolute top-[50%] m-0 left-[50%] -translate-y-[50%] -translate-x-[50%] mr-[50%] w-5 rounded-full "></div>
        </td>
        <td class="border-y table-cell max-w-fit align-middle">
          <button @click="openCard(card)" class="rounded-full px-2 text-blue-400 bg-transparent shadow-sm py-1">
            &or;
          </button></td>
      </tr>
    </tbody>
  </table>
  
    </div>
  </div>
  <div @blur="() => createRecord" class="absolute z-20 transition duration-200 text-center mx-8 border top-[80px] right-2 rounded-se-lg w-3/4 h-fit bg-white" v-if="modal">
    <div class="flex justify-between text-blue-400 m-5">
      <h3>Add a record</h3>
      <font-awesome-icon @click="createRecord" :icon="['fas', 'times']" size="xl" />
    </div>
    
    <form @submit.prevent="save" class="m-5 rounded-lg p-5">
      <div class="relative mb-4">
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
  <div v-if="expandedCard !== null" @blur="() => expandedCard = null" class="absolute transition duration-150 z-20 text-center right-2 mx-8 border top-[80px] rounded-se-lg w-full max-w-md h-fit bg-white">
  <div class="border-y">
    <font-awesome-icon :icon="['fas', 'times']" size="xl" @click="() => expandedCard = null" class="float-right m-5 text-blue-500 cursor-pointer hover:text-blue-300" />
    <div class="block text-left p-6">
      
      <div class="mb-4">
        <label for="name">Name</label>
      <input class="bg-transparent px-6 py-4 border rounded-lg w-full" id="name" v-model="expandedCard.name" disabled />
      </div>
      <div class="mb-4">
      <label for="date">Date</label>
      <input class="bg-transparent px-6 py-4 block border rounded-lg w-full" id="date" v-model="expandedCard.date" disabled />
      </div>
      <div class="mb-4">
      <label for="amount">Amount Owed</label>
      <input class="bg-transparent px-6 py-4 block border rounded-lg w-full" id="amount" v-model="expandedCard.amount" disabled />
      </div>
      <div class="mb-4">
      <label for="amount_paid">Amount Paid</label>
      <input class="bg-transparent px-6 py-4 block border rounded-lg w-full" id="amount_paid" v-model="expandedCard.amount_paid" disabled />
      </div>
      <div class="mb-4">
      <label for="comment">Comment:</label>
      <textarea id="comment" class="bg-transparent px-6 py-4 block border rounded-lg w-full" v-model="expandedCard.comment"></textarea>
      </div>
      <div class="mb-4">
      <label for="writtenBy">Written By:</label>
      <input class="bg-transparent px-6 py-4 block border rounded-lg w-full" id="writtenBy" v-model="expandedCard.written_by" disabled />
      </div>
    </div>
        </div>
  </div>
</div>

</template>
<script setup lang="ts">
  import { ref, watch } from "vue";
  import Sidebar from "../components/Sidebar.vue";
  import { addCard, getList, editCard } from "../utils/debt-api.js";
  import { store } from "../utils/store";
  import { useToast } from "vue-toastification";

  const toast = useToast()
 
  type Cards = {
    _id?: string;
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
    debtorsList: Cards[];
    message: string;
  }

  const menu = ref(false);
  const query = ref<string>("");
  const mode = ref<string>("");
  const list = ref<Cards[]>([]);
  const modal = ref<boolean>(false);
  const date = ref<any>("");
  const expandedCard = ref<Cards | null>(null);
  const editValue = ref<number>(0)
  const record = ref<Cards>({
    name: '', amount: 0, date: new Date().toLocaleDateString("en-US"), amount_paid: 0, paid: false, written_by: store.user, comment: ""
  })

  /**
   * save new records data
   */
  const save = async () => {
    record.value.date = new Date(date.value).toLocaleDateString("en-US")
    try {
    toast.info("saving record", {id: "save"})
    const res = await addCard(record.value)
    toast.success("success !!", {id: "save"})
    if (mode.value === "name-mode" && record.value.name === query.value || mode.value === "date-mode" && record.value.date === query.value) {
      list.value.push(res.card)
    }
    modal.value = false
    } catch (error) {
      toast.error("failed to create record", {id: "save"})
    }
  }
  const setVal = (val: any) => query.value = val.value;
  const createRecord: (payload: MouseEvent) => void = () => modal.value = !modal.value
  const toggleMenu: (payload: MouseEvent) => void = () => menu.value = !menu.value;

  // watch - fetches the data based on the search query
	watch([query], async () => {

    try {
      toast.info("fetching data", {id: "data"})
        const data: dataType  = await getList(query.value)
        list.value = data.debtorsList
        toast.success("done", {id: "data"})
    } catch (error) {
      toast.error("Failed to get data", {id: "data"})
      console.error(error)
    }
  })
  const editAmount = (card: Cards) => {
    editValue.value = card.amount_paid
    card.editing = true;
  };

  /**
   * save edit record data
   * @param card data to be edited
   */
  const saveAmount = async (card: Cards) => {
    
    if (editValue.value === card.amount_paid) return
    else {
      let tempCard: Cards
      tempCard = card
    // Perform any additional logic or API calls if needed
      try {
        toast.info(`effecting changes to card ${tempCard._id}`, {id: "edit"})
        const res = await editCard(tempCard);
        toast.success(`changes to card ${tempCard._id} made successfully`, {id: "edit"})
        card.amount_paid = res.data.amount_paid
        card.editing = false;
      } catch (error) {
        console.error(error)
        toast.error("failed", {id: "edit"})
      }
    }
  };

  /**
   * open record data
   * @param card data to be edited
   */

  const openCard = (card: Cards) => expandedCard.value = card;
</script>