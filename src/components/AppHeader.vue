<template>
  <nav id="app-header" class="bg-gray-800 flex w-full">
    <div class="p-2 m-auto w-full xl:max-w-screen-xl">
      <router-link
        v-for="route in $router.getRoutes()"
        :key="route.name"
        :to="route.path"
        class="mx-2 hover:underline"
        >{{ route.name }}</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>