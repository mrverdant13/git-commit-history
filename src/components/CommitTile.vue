<template>
  <div class="flex flex-row place-items-start">
    <div class="flex flex-col flex-grow">
      <div class="flex flex-wrap">
        <p class="font-semibold text-gray-200 leading-tight mb-1 text-sm">
          <span>{{ commitTitle }}&nbsp;&nbsp;</span>
          <button
            v-if="commitDescription !== null"
            @click="commitDescriptionIsOpen ^= true"
            type="button"
            class="inline-flex justify-center items-center bg-gray-700 hover:bg-gray-600 focus:outline-none px-1 rounded-sm"
          >
            <div class="h-2"></div>
            <p class="relative -inset-y-2 h-2.5">...</p>
          </button>
        </p>
      </div>
      <p
        v-if="commitDescriptionIsOpen"
        class="text-xs font-mono mb-2 text-gray-400 break-all whitespace-pre-wrap sm:break-normal"
      >
        {{ commitDescription }}
      </p>

      <div class="flex">
        <img :src="committerAvatarUrl" class="h-5 rounded-full w-5" />
        <div class="text-gray-400 text-xs mx-2 flex flex-wrap">
          <div class="font-semibold text-gray-200">
            {{ committerName }}&nbsp;
          </div>
          <div>committed&nbsp;</div>
          <div :title="commitDateTime.toString()">
            {{ commitDateDiffMessage }}
          </div>
        </div>
      </div>
    </div>
    <button
      :title="`Copy ${commitSha} sha`"
      @click="copyShaToClipboard"
      class="bg-gray-900 hover:bg-gray-700 invisible w-0 sm:w-auto sm:visible rounded-lg border hover:border-blue-400 border-gray-600 p-2 focus:outline-none"
    >
      <p class="text-xs text-blue-400">
        {{ commitSha.substring(0, 6) }}
      </p>
    </button>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "CommitTile",

  props: {
    commitData: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    function dateDiffInDays(a, b) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;

      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    // Data
    const commitDescriptionIsOpen = ref(false);

    // Computed
    const divisionIndex = computed({
      get: () => {
        return props.commitData.commit.message.indexOf("\n\n");
      },
    });
    const commitTitle = computed({
      get: () => {
        if (divisionIndex.value >= 0) {
          return props.commitData.commit.message.substring(
            0,
            divisionIndex.value
          );
        } else {
          return props.commitData.commit.message;
        }
      },
    });
    const commitDescription = computed({
      get: () => {
        if (divisionIndex.value >= 0) {
          return props.commitData.commit.message.substring(
            divisionIndex.value + 2
          );
        } else {
          return null;
        }
      },
    });
    const committerAvatarUrl = computed({
      get: () => {
        return props.commitData.committer.avatar_url;
      },
    });
    const committerName = computed({
      get: () => {
        return props.commitData.commit.committer.name;
      },
    });
    const commitDateTime = computed({
      get: () => {
        return new Date(props.commitData.commit.committer.date);
      },
    });
    const commitDateDiffMessage = computed({
      get: () => {
        const commitDateDiffInDays = dateDiffInDays(
          commitDateTime.value,
          new Date()
        );
        if (commitDateDiffInDays === 0) return "today";
        else {
          return (
            `${commitDateDiffInDays} day` +
            (commitDateDiffInDays > 1 ? "s" : "") +
            " ago"
          );
        }
      },
    });
    const commitSha = computed({
      get: () => {
        return props.commitData.sha;
      },
    });

    // Methods
    function copyShaToClipboard() {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = commitSha.value;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    }

    return {
      // Data
      commitDescriptionIsOpen,
      // Computed
      commitTitle,
      commitDescription,
      committerAvatarUrl,
      committerName,
      commitDateTime,
      commitDateDiffMessage,
      commitSha,
      // Methods
      copyShaToClipboard,
    };
  },
};
</script>

