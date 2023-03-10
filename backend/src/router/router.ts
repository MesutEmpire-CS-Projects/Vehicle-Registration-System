import { Router } from "express";
const {
  createNewRegistration,
  getOwner,
  deleteRegistration,
  deleteManyReg,
  updateReg,
  getNoticeOwners,
  getAllData,
} = require("../controllers/registrationController");
const { dataCache } = require("../middleware/cacheConnection");
const router = Router();

router.get("/:type", dataCache, getAllData);
router.get("/notice/:type", dataCache, getNoticeOwners);
router.get("/owner/:name", getOwner);
router.post("/createNewRegistration", createNewRegistration);
router.delete("/registration_details/:registration_id", deleteRegistration);
router.delete("/registration_details", deleteManyReg);
router.patch("/registration_details/:registration_details", updateReg);

module.exports = router;
