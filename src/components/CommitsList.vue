<template>
  <div class="bg-gray-800 border border-gray-600 rounded">
    <div
      v-for="commitData in commitsData"
      :key="commitData"
      class="border-b border-gray-600 px-4 py-2 last:border-0"
    >
      <CommitTile :commitData="commitData" />
    </div>
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
      const { data } = await axios.get(
        `https://api.github.com/repos/${process.env.VUE_APP_REPO_OWNER}/${process.env.VUE_APP_REPO_NAME}/commits`,
        {
          params: {
            sha: props.branchName,
          },
        }
      );
      commitsData.value = data;
    }

    // Data
    const commitsData = ref([]);

    // Lifecycle Hooks
    onMounted(() => updateCommitsData());

    return {
      commitsData,
    };
  },
};
</script>
