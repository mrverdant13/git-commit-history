<template>
  <div
    id="commit-history"
    class="flex flex-col h-full m-auto p-4 xl:max-w-screen-xl xl:max-w-screen-xl:p-0"
  >
    <div class="w-36">
      <Dropdown
        @item-selected="onBranchSelected"
        hint="branch"
        :items="branchesData"
        :itemLabelBuilder="(item) => item.name"
      />
    </div>
    <div v-if="selectedBranch !== null" class="mt-4">
      <CommitsList :commitsData="commitsData" />
    </div>
    <div v-else class="m-auto text-2xl text-center">Select a repo branch.</div>
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
    async function updateCommitsData() {
      const { data } = await axios.get(
        `https://api.github.com/repos/${process.env.VUE_APP_REPO_OWNER}/${process.env.VUE_APP_REPO_NAME}/commits`,
        {
          params: {
            sha: selectedBranch.value.name,
          },
        }
      );
      commitsData.value = data;
    }

    // Data
    const branchesData = ref([]);
    const selectedBranch = ref(null);
    const commitsData = ref([]);

    // Methods
    function onBranchSelected(branchData) {
      selectedBranch.value = branchData;
      updateCommitsData();
    }

    // Lifecycle Hooks
    onMounted(() => {
      updateBranches();
    });

    return {
      // Data
      branchesData,
      selectedBranch,
      commitsData,
      // Methods
      onBranchSelected,
    };
  },
};
</script>