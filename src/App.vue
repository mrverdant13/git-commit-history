<template>
  <div class="flex flex-col h-screen bg-gray-900 text-white">
    <AppHeader />
    <div
      class="flex-grow m-auto bg-gray-900 px-8 xl:max-w-screen-xl w-full text-white"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";

export default {
  name: "App",

  components: {
    AppHeader,
  },
};
</script>