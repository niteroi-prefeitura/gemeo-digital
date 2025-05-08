import { Router } from "express";
import getAlerts from "../services/alertDataService";

const router: Router = Router();

router.get("/", async (_, res, next) => {
  try {
    const data = await getAlerts();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
