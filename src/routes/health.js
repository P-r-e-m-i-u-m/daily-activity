router.get("/health", async (req, res) => {
  const dbOk = await db.raw("SELECT 1").then(() => true).catch(() => false);
  const cacheOk = await redis.ping().then(r => r === "PONG").catch(() => false);
  res.status(dbOk && cacheOk ? 200 : 503).json({
    status: dbOk && cacheOk ? "healthy" : "degraded",
    db: dbOk, cache: cacheOk
  });
});