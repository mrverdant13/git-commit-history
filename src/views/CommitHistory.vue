<template>
  <div id="commit-history" class="flex flex-col mx-auto py-8">
    <h3 v-if="!isLoadingBranches" class="font-bold mb-2">Branch</h3>
    <Dropdown
      v-if="!isLoadingBranches"
      @item-selected="onBranchSelected"
      hint="branch"
      :items="branchesData"
      :itemLabelBuilder="(item) => item.name"
    />
    <h2
      v-if="isLoadingBranches"
      class="m-auto text-2xl text-center animate-pulse"
    >
      Loading branches...
    </h2>
    <h2
      v-else-if="selectedBranch === null"
      class="m-auto text-2xl text-center animate-bounce"
    >
      Select a repo branch.
    </h2>
    <div v-else>
      <h2 class="font-bold mt-8 mb-2">Commit history</h2>
      <CommitsList
        :branchName="selectedBranch.name"
        :key="selectedBranch.name"
      />
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
      isLoadingBranches.value = true;

      const { data } = await axios.get(
        `https://api.github.com/repos/${process.env.VUE_APP_REPO_OWNER}/${process.env.VUE_APP_REPO_NAME}/branches`
      );
      branchesData.value = data;

      isLoadingBranches.value = false;
    }

    // Data
    const isLoadingBranches = ref(false);
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
      isLoadingBranches,
      branchesData,
      selectedBranch,
      // Methods
      onBranchSelected,
    };
  },
};
</script>