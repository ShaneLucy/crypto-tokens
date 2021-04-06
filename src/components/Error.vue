<template>
  <div>
    <p class="text-red-600">{{ message }}</p>
    <img
      v-if="status === 404"
      src="../assets/404.svg"
      alt="Octopus attacking scuba diver"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error",
  props: {
    message: String,
    status: Number,
  },
});
</script>
