describe("Axios", () => {
  it("is configured with correct base url", () => {
    expect(process.env.VUE_APP_BASE_URL).toMatch("https://api.coingecko.com/api/v3/");
  });
});
