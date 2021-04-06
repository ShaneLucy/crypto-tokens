<template>
  <div class="mx-24 2xl:mx-96">
    <Table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Table from "@/components/Table.vue";

export default defineComponent({
  name: "Home",
  components: {
    Table,
  },
});
</script>
