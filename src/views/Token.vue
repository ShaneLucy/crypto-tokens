<template>
  <div class="mx-24 2xl:mx-96">
    <div v-if="pageLoadError === undefined">
      <div v-if="loading">
        <p>Loading....</p>
      </div>
      <div class="flex text-left flex-wrap justify-between" v-else>
        <div class="pb-10 pr-10">
          <h1 class="text-2xl font-meidum">{{ tokenData.name }}</h1>
          <p class="text-lg pt-7">Symbol:</p>
          <p>{{ tokenData.symbol }}</p>
          <p class="text-lg pt-7">Hashing Algorithm:</p>
          <p>{{ tokenData.hashingAlgo }}</p>
          <p class="text-lg pt-7">Market Cap:</p>
          <p>(€) {{ tokenData.marketCap.toLocaleString() }}</p>
          <p class="text-lg pt-7">Genesis Date:</p>
          <p class="pb-7">{{ tokenData.genesis }}</p>
          <a
            target="_blank"
            class="text-lg text-green-600 pt-10 pb-10 font-bold"
            :href="tokenData.homepage"
            >Website</a
          >
        </div>
        <div v-html="tokenData.description" class="max-w-prose"></div>
      </div>
    </div>
    <div v-else>
      <Error :message="pageLoadError" :status="pageLoadStatus" />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { tokenData } from "../interface/index";
import Error from "@/components/Error.vue";

export default defineComponent({
  name: "Token",
  components: {
    Error,
  },
  data() {
    return {
      tokenData: {
        name: "",
        symbol: "",
        hashingAlgo: "",
        description: "",
        marketCap: 0,
        homepage: "",
        genesis: "",
      } as tokenData,
      notFound: false,
      pageLoadError: undefined as string | undefined,
      pageLoadStatus: 0,
      loading: true,
    };
  },

  async mounted() {
    try {
      const response = await this.axios.get(
        `coins/${this.$route.params.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );

      this.tokenData.name = response.data.name;
      this.tokenData.symbol = response.data.symbol;
      this.tokenData.hashingAlgo = response.data.hashing_algorithm;
      this.tokenData.description = response.data.description.en;
      this.tokenData.marketCap = response.data.market_data.market_cap.eur;
      this.tokenData.homepage = response.data.links.homepage[0];
      this.tokenData.genesis = response.data.genesis_date;
      this.loading = false;
    } catch (error) {
      this.loading = false;

      this.pageLoadStatus = error.response.status;
      this.pageLoadError = error.response.data.error;
    }
  },
});
</script>