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
import CommitTile from "../components/CommitTile";

export default {
  name: "CommitsList",

  components: {
    CommitTile,
  },

  props: {
    commitsData: {
      type: Array,
      required: true,
    },
  },
};
</script>
