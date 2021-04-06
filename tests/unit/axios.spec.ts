import axios from "../../src/http";

describe("Axios", () => {
  it("is configured with correct base url", () => {
    expect(axios.defaults.baseURL).toMatch("https://api.coingecko.com/api/v3/");
  });
});
