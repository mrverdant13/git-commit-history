<template>
  <div class="bg-gray-800 border border-gray-600 rounded">
    <h2
      v-if="isLoadingCommits"
      class="mx-auto my-10 text-2xl text-center animate-pulse"
    >
      Loading commits...
    </h2>
    <div
      v-else-if="commitsData.length > 0"
      v-for="commitData in commitsData"
      :key="commitData"
      class="border-b border-gray-600 px-4 py-2 last:border-0"
    >
      <CommitTile :commitData="commitData" />
    </div>
    <h2 v-else class="mx-auto my-10 text-2xl text-center">No commits</h2>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import axios from "axios";

import CommitTile from "../components/CommitTile";

export default {
  name: "CommitsList",

  components: {
    CommitTile,
  },

  props: {
    branchName: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    async function updateCommitsData() {
      isLoadingCommits.value = true;

      const { data } = await axios.get(
        `https://api.github.com/repos/${process.env.VUE_APP_REPO_OWNER}/${process.env.VUE_APP_REPO_NAME}/commits`,
        {
          params: {
            sha: props.branchName,
          },
        }
      );
      commitsData.value = data;

      isLoadingCommits.value = false;
    }

    // Data
    const commitsData = ref([]);
    const isLoadingCommits = ref(false);

    // Lifecycle Hooks
    onMounted(() => updateCommitsData());

    return {
      commitsData,
      isLoadingCommits,
    };
  },
};
</script>
