const { CacheManager, withCache } = require("../cacheManager");

jest.mock("../../config/redis");
jest.mock("../../services/logger");

const redis = require("../../config/redis");

describe("CacheManager", () => {
  let cache;
  beforeEach(() => { cache = new CacheManager("test"); jest.clearAllMocks(); });

  describe("get", () => {
    test("returns null on miss", async () => {
      redis.get.mockResolvedValue(null);
      expect(await cache.get("key")).toBeNull();
      expect(cache.stats.misses).toBe(1);
    });
    test("returns parsed value on redis hit", async () => {
      redis.get.mockResolvedValue(JSON.stringify({ data: "test" }));
      const result = await cache.get("key");
      expect(result).toEqual({ data: "test" });
      expect(cache.stats.hits).toBe(1);
    });
    test("returns local cache value without redis call", async () => {
      cache._setLocal("key", { local: true }, 60);
      const result = await cache.get("key");
      expect(result).toEqual({ local: true });
      expect(redis.get).not.toHaveBeenCalled();
      expect(cache.stats.localHits).toBe(1);
    });
  });

  describe("set", () => {
    test("stores in redis with correct TTL", async () => {
      redis.setex.mockResolvedValue("OK");
      await cache.set("key", { data: 1 }, 600);
      expect(redis.setex).toHaveBeenCalledWith("test:key", 600, JSON.stringify({ data: 1 }));
      expect(cache.stats.sets).toBe(1);
    });
  });

  describe("getStats", () => {
    test("calculates hit ratio correctly", async () => {
      cache.stats.hits = 8; cache.stats.misses = 2;
      const stats = cache.getStats();
      expect(stats.hitRatio).toBe("0.800");
    });
  });
});
