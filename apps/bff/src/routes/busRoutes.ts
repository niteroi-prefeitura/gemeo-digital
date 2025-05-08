import { Router } from "express";
import { getBusData } from "../services/busDataService";

const router: Router = Router();

router.get("/", async (_, res, next) => {
  try {
    const data = await getBusData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
