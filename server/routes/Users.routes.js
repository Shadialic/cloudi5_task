import { Router } from "express";
import verifyRole from "../middelware/verifyRole.js";
import {
  createCountry,
  deleteCountry,
  getCountry,
  updateCountry,
} from "../controllers/Country.controller.js";
import {
  createState,
  deleteStates,
  getStates,
  updateStates,
} from "../controllers/Statecontroller.js";
import {
  createDistrict,
  deleteDistrict,
  getDistrict,
  updateDistrict,
} from "../controllers/District.controller.js";
import {
  createTaluk,
  deleteTaluk,
  getTaluk,
  updateTaluk,
} from "../controllers/Taluk.controller.js";
import {
  createFirms,
  deleteFirms,
  getFirms,
  updateFirms,
} from "../controllers/Firms.controller.js";

const router = Router();

router.post("/countries", verifyRole(["admin"]), createCountry);
router.get("/countries", verifyRole(["admin", "manager", "user"]), getCountry);
router.put("/countries/:id", verifyRole(["admin"]), updateCountry);
router.delete("/countries/:id", verifyRole(["admin"]), deleteCountry);

router.post("/states", verifyRole(["admin"]), createState);
router.get("/states", verifyRole(["admin", "manager", "user"]), getStates);
router.put("/states/:id", verifyRole(["admin"]), updateStates);
router.delete("/states/:id", verifyRole(["admin"]), deleteStates);

router.post("/districts", verifyRole(["admin"]), createDistrict);
router.get("/districts", verifyRole(["admin", "manager", "user"]), getDistrict);
router.put("/districts/:id", verifyRole(["admin"]), updateDistrict);
router.delete("/districts/:id", verifyRole(["admin"]), deleteDistrict);

router.post("/taluks", verifyRole(["admin"]), createTaluk);
router.get("/taluks", verifyRole(["admin", "manager", "user"]), getTaluk);
router.put("/taluks/:id", verifyRole(["admin"]), updateTaluk);
router.delete("/taluks/:id", verifyRole(["admin"]), deleteTaluk);

router.post("/firms", verifyRole(["admin"]), createFirms);
router.get("/firms", verifyRole(["admin", "manager", "user"]), getFirms);
router.put("/firms/:id", verifyRole(["admin", "manager"]), updateFirms);
router.delete("/firms/:id", verifyRole(["admin"]), deleteFirms);

export default router;
