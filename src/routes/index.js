import { Router } from "express";

import * as DHISController from "../controllers/dhis.controller";

const router = Router();

router.get("/dhis/hpv", DHISController.index);

export default router;
