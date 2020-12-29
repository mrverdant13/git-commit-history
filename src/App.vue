<template>
  <div class="flex flex-col h-screen bg-gray-800 text-white">
    <AppHeader />
    <div class="flex-grow bg-gray-900 text-white">
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