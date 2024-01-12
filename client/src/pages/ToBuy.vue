<template>
    <div class="container mx-auto p-4 bg-white">
      <h2 class="text-2xl font-semibold mb-4 text-blue-500">To Buy List</h2>
  
      <div class="flex flex-col md:flex-row md:justify-between">
        <div class="w-full md:w-1/2">
          <draggable v-model="items" group="to-buy-list" @end="onDragEnd">
            <div v-for="(item, index) in items" :key="index" class="item">
              <input type="checkbox" v-model="item.checked" @change="updateItem(index, 'checked')" class="mr-2" />
              <input v-model="item.text" @input="updateItem(index, 'text')" class="bg-blue-100 p-2 rounded" />
              <button @click="deleteItem(index)" class="ml-4">Delete</button>
            </div>
          </draggable>
        </div>
  
        <div class="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <div class="flex flex-col md:flex-row">
            <input v-model="newItem.text" @keyup.enter="addItem" placeholder="Add new item" class="mb-2 md:mr-2 p-2 rounded bg-blue-100" />
            <button @click="addItem" class="md:mb-0 bg-blue-500 text-white p-2 rounded">Add</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import draggable from 'vuedraggable';
  
  interface Item {
    text: string;
    checked: boolean;
    priority: number;
  }
  
  const items = ref<Item[]>([
    { text: 'Milk', checked: false, priority: 1 },
    { text: 'Bread', checked: false, priority: 2 },
    // Add more items as needed
  ]);
  
  const newItem = ref<Item>({ text: '', priority: 0, checked: false });
  
  const addItem = (): void => {
    if (newItem.value.text.trim() !== '') {
      items.value.push({ ...newItem.value, checked: false });
      newItem.value = { text: '', priority: 0, checked: false };
    }
  };
  
  const deleteItem = (index: number): void => {
    items.value.splice(index, 1);
    updatePriorities();
  };
  
  const updateItem = (index: number, prop: string): void => {
    // Handle logic for updating item here
    if (prop === 'text') {
      items.value[index].text = items.value[index].text.trim();
    }
    updatePriorities();
  };
  
  const onDragEnd = (event: { oldIndex: number; newIndex: number }): void => {
    const draggedIndex = event.oldIndex;
    const newIndex = event.newIndex;
  
    // Change the priority of the dragged item to match the priority of the item that was pushed down
    items.value[draggedIndex].priority = items.value[newIndex].priority;
  
    // Update priorities based on the new order after dragging ends
    updatePriorities();
  };
  
  const updatePriorities = (): void => {
    items.value.forEach((item, index) => {
      item.priority = index + 1;
    });
  };
  </script>
  