<template>
  <div class="my-16">
    <div class="float-right mb-8">
      <button @click="openModal" class="bg-transparent px-4 py-2 rounded">
      <font-awesome-icon :icon="['fas', 'plus']" size="xl" class="text-blue-400" />
    </button>
  </div>
  <div class="float-left w-[80%] mb-8">
    <div class="">
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" v-model="searchQuery" id="search" class="block w-full px-4 py-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Search">
      </div>
    </div> 
  </div>
    
    
    <table class="table-fixed w-full">
      <thead>
        <tr>
          <th class="border py-2 px-4">Name</th>
          <th class="border py-2 px-4">Variation</th>
          <th class="border py-2 px-4">Bulk Price</th>
          <th class="border py-2 px-4">Unit Price</th>
          <th class="border py-2 px-4"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="price in filteredPrices" :key="price._id">
          <td class="border py-2 px-4">{{ price.name }}</td>
          <td class="border py-2 px-4">{{ price.variation }}</td>
           <!-- Editable cells for Bulk Price and Unit Price -->
           <td class="border py-2 px-4">
            <span @click="editPrice(price, 'bulk_price')" v-if="!price.editing">{{ price.bulk_price }}</span>
            <input v-else v-model="editp.bulk_price" @blur="saveEdit(price, 'bulk_price')" class="w-full outline-1 outline-blue-300 rounded-full" />
          </td>
          <td class="border py-2 px-4" >
            <span @click="editPrice(price, 'unit_price')" v-if="!price.editing">{{ price.unit_price }}</span>
            <input v-else v-model="editp.unit_price" @blur="saveEdit(price, 'unit_price')" class="w-full outline-1 outline-blue-300 rounded-full" />
          </td>
          <td class="border py-2 px-4 text-blue-400 hover:text-blue-200 table-cell align-middle cursor-pointer" @click="delPrice(price._id as string)">
            <font-awesome-icon :icon="['fas', 'trash']" size="xl" />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal for creating a new price -->
    <div v-if="showModal" class="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg">
        <div class="flex justify-between">
          <h2 class="text-lg font-semibold mb-4">Create a New Price</h2>
                  <!-- Close button -->
          <button @click="closeModal" class="bg-transparent px-4 py-2 mt-4 rounded">
            <font-awesome-icon :icon="['fas', 'times']" size="xl" class="text-blue-400" />
          </button>
        </div>
        <!-- Price creation form -->
        <form @submit.prevent="savePrice">
          <div class="mb-4">
            <label for="name">Name</label>
            <input v-model="newPrice.name" type="text" id="name" class="border rounded px-2 py-1 w-full" required />
          </div>

          <div class="mb-4">
            <label for="variation">Variation</label>
            <input v-model="newPrice.variation" type="text" id="variation" class="border rounded px-2 py-1 w-full" required />
          </div>

          <div class="mb-4">
            <label for="bulk_price">Bulk Price</label>
            <input v-model="newPrice.bulk_price" type="number" id="bulk_price" class="border rounded px-2 py-1 w-full" required />
          </div>

          <div class="mb-4">
            <label for="unit_price">Unit Price</label>
            <input v-model="newPrice.unit_price" type="number" id="unit_price" class="border rounded px-2 py-1 w-full" required />
          </div>

          <!-- Submit button -->
          <button type="submit" class="bg-blue-400 text-white px-8 py-2 rounded">Save Price</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { addPrice, updatePrice, getList, deletePrice } from '../utils/price-api'
import { computed } from '@vue/reactivity';

  type Price = {
    _id?: string;
    name: string;
    variation: string; // whether big size or small size or medium
    bulk_price: number;
    unit_price: number;
    editing?: boolean;
  }
  const prices = ref<Price[]>([])
  const showModal = ref(false);
  const newPrice = ref({
    name: '',
    variation: '',
    bulk_price: 0,
    unit_price: 0,
  });
  const editp = ref({
    bulk_price: 0, unit_price: 0
  })
  const searchQuery = ref<string>("");

  onMounted(async () => {
    try {
    const data = await getList()
    prices.value = data.pList;
    console.log(data.message)
    } catch (error) {
      console.error(error)
    }
  })

  const openModal = () => {
    showModal.value = true;
  };

  const delPrice = async (_id: string) => {
    try {
      const res = await deletePrice(_id)
      prices.value.filter(price => price._id !== _id )
      console.log(res.message)
    } catch (error) {
      console.error(error)
    }
  }

const closeModal = () => {
  showModal.value = false;
};
const editPrice = (price: Price, field: "bulk_price" | "unit_price") => {
  if (field === "bulk_price") {
    editp.value.bulk_price = price.bulk_price
  } else {
    editp.value.unit_price = price.unit_price
  }
  price.editing = true;
};

const saveEdit = async (price: Price, field: "bulk_price" | "unit_price") => {
  price.editing = false;

  // Perform logic to save the updated price (e.g., API call)
  if (field === "bulk_price") {
    if (editp.value.bulk_price === price.bulk_price) return
    else price.bulk_price = editp.value.bulk_price
  } else {
    if (editp.value.unit_price === price.unit_price) return
    else price.unit_price = editp.value.unit_price
  }
  try {
    const data = await updatePrice(price)
    console.log(data.message);
  } catch (error) {
    console.error(error)
  }
}

const savePrice = async () => {
  // Perform logic to save the new price (e.g., API call)
  try {
    const data = await addPrice(newPrice.value)
  // After saving, you may want to update the prices list and close the modal
    prices.value.push(data.price)
  } catch (error) {
    console.error(error) 
  }
  closeModal();
};

  // Computed property for filtered names based on the search query
  const filteredPrices = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return prices.value.filter((price) => price.name.toLowerCase().includes(query));
  });

</script>