<template>
  <div class="bg-gray-800 border border-gray-600 rounded">
    <div
      v-for="commitData in commitsData"
      :key="commitData"
      class="border-b border-gray-600 px-4 py-2 last:border-0"
    >
      <CommitTile :commitData="commitData" />
    </div>

    <h2
      v-if="isLoadingCommits"
      class="mx-4 my-10 text-2xl text-center animate-pulse"
    >
      Loading commits...
    </h2>
    <h2
      v-else-if="commitsData.length === 0"
      class="mx-4 my-10 text-2xl text-center"
    >
      No commits
    </h2>
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
    let nextPageUrl = `https://api.github.com/repos/${process.env.VUE_APP_REPO_OWNER}/${process.env.VUE_APP_REPO_NAME}/commits?sha=${props.branchName}`;

    async function updateCommitsData() {
      if (isLoadingCommits.value || nextPageUrl === undefined) return;

      isLoadingCommits.value = true;

      const { data, headers } = await axios.get(nextPageUrl);

      commitsData.value = commitsData.value.concat(data);

      const linksDataString = headers.link;

      const linksData = {};
      const linksDataArray = linksDataString.split(",");

      for (const linkData of linksDataArray) {
        const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(linkData);

        linksData[linkInfo[2]] = linkInfo[1];
      }

      console.log(linksData);
      nextPageUrl = linksData.next;
      console.log(nextPageUrl);

      isLoadingCommits.value = false;
    }

    window.onscroll = () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight - 5;

      if (bottomOfWindow) {
        console.log("Bottom!");
        updateCommitsData();
      }
    };

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
