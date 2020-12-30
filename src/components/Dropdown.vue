<template>
  <button
    @blur="itemsListIsOpen = false"
    class="relative inline-block w-full rounded-md border border-gray-600 bg-gray-800 hover:bg-gray-700 focus:outline-none"
  >
    <div>
      <div
        @click="itemsListIsOpen ^= true"
        class="inline-flex justify-between w-full px-4 py-2"
      >
        <p
          class="text-sm text-left font-medium text-gray-300 overflow-ellipsis overflow-hidden"
        >
          {{ dropdownLabel }}
        </p>
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <div
      v-if="itemsListIsOpen"
      class="absolute border border-gray-600 mt-2 rounded-md shadow-xl bg-gray-800"
    >
      <div
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <a
          v-for="item in items"
          @click="selectItem(item)"
          :key="item"
          class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left"
          role="menuitem"
          >{{ itemLabelBuilder(item) }}</a
        >
      </div>
    </div>
  </button>
</template>

<script>
import { computed, ref } from "vue";
export default {
  name: "Dropdown",

  props: {
    hint: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemLabelBuilder: {
      type: Function,
      required: true,
    },
  },

  setup(props, { emit }) {
    // Data
    const itemsListIsOpen = ref(false);
    const selectedItem = ref(null);

    // Computed
    const dropdownLabel = computed({
      get: () =>
        selectedItem.value === null
          ? props.hint
          : props.itemLabelBuilder(selectedItem.value),
    });

    // Methods
    function selectItem(item) {
      emit("item-selected", item);
      selectedItem.value = item;
      itemsListIsOpen.value = false;
    }

    return {
      // Data
      itemsListIsOpen,
      selectedItem,
      // Computed
      dropdownLabel,
      // Methods
      selectItem,
    };
  },
};
</script>

