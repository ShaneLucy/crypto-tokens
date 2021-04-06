<template>
  <div>
    <p v-if="loading">Loading.....</p>
    <div v-if="pageLoadError === undefined">
      <table class="table-auto w-full overflow-x-auto">
        <thead>
          <tr>
            <th class="border pt-4 pb-4">Image</th>
            <th class="border">Symbol</th>
            <th class="border">Name</th>
            <th class="border">Current Price (€)</th>
            <th class="border">24 Hour High (€)</th>
            <th class="border">24 Hour Low (€)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pageData" :key="index">
            <td class="border">
              <img
                class="w-16 cursor-pointer pb-2 pt-2 inline-block align-middle"
                :src="pageData[index].image"
                :alt="pageData[index].name + 'logo'"
                @click="loadToken(pageData[index].id)"
              />
            </td>
            <td
              @click="loadToken(pageData[index].id)"
              class="border cursor-pointer"
            >
              {{ pageData[index].symbol }}
            </td>
            <td
              @click="loadToken(pageData[index].id)"
              class="border cursor-pointer"
            >
              {{ pageData[index].name }}
            </td>
            <td
              @click="loadToken(pageData[index].id)"
              class="border cursor-pointer"
            >
              {{ pageData[index].currentPrice }}
            </td>
            <td
              @click="loadToken(pageData[index].id)"
              class="border cursor-pointer"
            >
              {{ pageData[index].high24Price }}
            </td>
            <td
              @click="loadToken(pageData[index].id)"
              class="border cursor-pointer"
            >
              {{ pageData[index].low24Price }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                v-if="pageNumber > 1"
                @click="(pageNumber -= 1), getPageData(pageNumber)"
              >
                <path
                  title="Previous"
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </td>
            <td>Page: {{ pageNumber }}</td>
            <td @click="(pageNumber += 1), getPageData(pageNumber)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  title="Next"
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-else>
      <Error :message="pageLoadError" :status="pageLoadStatus" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { pageData } from "../interface/index";
import Error from "./Error.vue";

export default defineComponent({
  name: "Table",
  components: {
    Error,
  },
  data() {
    return {
      pageData: {
        id: "",
        image: "",
        name: "",
        symbol: "",
        currentPrice: 0,
        high24Price: 0,
        low24Price: 0,
      } as pageData,
      pageNumber: 1,
      loading: true,
      pageLoadError: undefined as string | undefined,
      pageLoadStatus: 0,
    };
  },
  async mounted() {
    await this.getPageData(this.pageNumber);
  },
  methods: {
    async getPageData(page: number) {
      try {
        this.loading = true;
        const response = await this.axios.get(
          `coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
        );

        this.pageData = response.data.map((value: any) => {
          return {
            id: value.id,
            image: value.image,
            name: value.name,
            symbol: value.symbol,
            currentPrice: value.current_price,
            high24Price: value.high_24h,
            low24Price: value.low_24h,
          };
        });

        this.loading = false;
      } catch (error) {
        this.loading = false;

        this.pageLoadStatus = error.response.status;
        this.pageLoadError = error.response.data.error;
      }
    },
    loadToken(id: string) {
      this.$router.push(`/token/${id}`);
    },
  },
});
</script>

<style scoped>
table tr:nth-child(odd) {
  background: gainsboro;
}
</style>
