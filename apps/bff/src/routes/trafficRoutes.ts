import { Router } from "express";
import getTrafficLines from "../services/trafficDataService";

const router: Router = Router();

router.get("/", async (_, res, next) => {
  try {
    const data = await getTrafficLines();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
