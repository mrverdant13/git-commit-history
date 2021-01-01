<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <AppHeader />
    <router-view class="flex-grow w-full max-w-screen-xl m-auto px-8" />
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