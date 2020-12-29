<template>
  <nav id="app-header" class="flex p-2 w-full bg-black">
    <router-link
      v-for="route in $router.getRoutes()"
      :key="route.name"
      :to="route.path"
      class="px-2 py-1 text-white"
      >{{ route.name }}</router-link
    >
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>