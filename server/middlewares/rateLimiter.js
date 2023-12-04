import setRateLimit from "express-rate-limit";

const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Bạn đã vượt quá giới hạn 10 lời chúc mỗi phút.",
  headers: true,
});

export default rateLimitMiddleware;
