const { fetchWithRetry, CircuitBreaker } = require("../fetchWithRetry");

describe("fetchWithRetry", () => {
  test("should succeed on first try", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => ({}) });
    const res = await fetchWithRetry("https://api.example.com/test");
    expect(res.ok).toBe(true);
  });

  test("should retry on failure", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("fail")).mockResolvedValue({ ok: true });
    const res = await fetchWithRetry("https://api.example.com/test", {}, 1);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

describe("CircuitBreaker", () => {
  test("should open after threshold failures", async () => {
    const cb = new CircuitBreaker(2);
    const failFn = jest.fn().mockRejectedValue(new Error("fail"));
    await cb.call(failFn).catch(() => {});
    await cb.call(failFn).catch(() => {});
    expect(cb.state).toBe("OPEN");
  });
});
