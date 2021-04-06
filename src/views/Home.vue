<template>
  <div class="mr-20 ml-20">
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
