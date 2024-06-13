import { Router } from "express";

import * as DHISController from "../controllers/dhis.controller";

const router = Router();

router.post("/dhis/hpv", DHISController.index);

export default router;
