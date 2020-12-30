<template>
  <div id="commit-history" class="flex h-full w-full p-6">
    <div class="w-36">
      <Dropdown
        @item-selected="onBranchSelected"
        hint="branch"
        :items="branchesData"
        :itemLabelBuilder="(item) => item.name"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import axios from "axios";

import Dropdown from "../components/Dropdown";

export default {
  name: "CommitHistory",

  components: { Dropdown },

  setup() {
    // Data
    const branchesData = ref([]);

    // Methods
    function onBranchSelected(branchData) {
      console.log(branchData);
    }
    async function updateBranches() {
      const { data } = await axios.get(
        `https://api.github.com/repos/${process.env.VUE_APP_REPO_OWNER}/${process.env.VUE_APP_REPO_NAME}/branches`
      );
      branchesData.value = data;
    }

    // Lifecycle Hooks
    onMounted(() => {
      updateBranches();
    });

    return {
      // Data
      branchesData,
      // Methods
      onBranchSelected,
      updateBranches,
    };
  },
};
</script>