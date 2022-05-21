import { Router } from "express";
import boom from "express-boom";

const router = Router();

router.use(boom());

router.get("/health", (_req, res) => res.send("API is running actively"));
router.get("/version", (_req, res) =>
  res.send("v" + process.env.npm_package_version)
);

export default router;
