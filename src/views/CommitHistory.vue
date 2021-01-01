<template>
  <div
    id="commit-history"
    class="flex flex-col h-full m-auto pt-8 xl:max-w-screen-xl"
  >
    <h2 class="font-bold mb-2">Branch</h2>
    <div class="w-min">
      <Dropdown
        @item-selected="onBranchSelected"
        hint="branch"
        :items="branchesData"
        :itemLabelBuilder="(item) => item.name"
      />
    </div>
    <div v-if="selectedBranch !== null" class="mx-6">
      <h2 class="font-bold mt-8 mb-2">Commit history</h2>
      <CommitsList :branchName="selectedBranch.name" />
    </div>
    <div v-else class="m-auto text-2xl text-center max-h-full">
      Select a repo branch.
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import axios from "axios";

import Dropdown from "../components/Dropdown";
import CommitsList from "../components/CommitsList";

export default {
  name: "CommitHistory",

  components: {
    Dropdown,
    CommitsList,
  },

  setup() {
    async function updateBranches() {
      const { data } = await axios.get(
        `https://api.github.com/repos/${process.env.VUE_APP_REPO_OWNER}/${process.env.VUE_APP_REPO_NAME}/branches`
      );
      branchesData.value = data;
    }

    // Data
    const branchesData = ref([]);
    const selectedBranch = ref(null);

    // Methods
    function onBranchSelected(branchData) {
      selectedBranch.value = branchData;
    }

    // Lifecycle Hooks
    onMounted(() => updateBranches());

    return {
      // Data
      branchesData,
      selectedBranch,
      // Methods
      onBranchSelected,
    };
  },
};
</script>