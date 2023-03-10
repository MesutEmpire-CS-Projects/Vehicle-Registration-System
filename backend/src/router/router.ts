import { Router } from "express";
const {
  createNewRegistration,
  getAllOwners,
  getAllRegistrationDetails,
  getAllStickers,
  getAllVehicles,
  getAllPlates,
  getOwner,
  deleteRegistration,
  deleteManyReg,
  updateReg,
  getNoticeOwners
} = require("../controllers/registrationController");
const db = require("../middleware/databaseConnection");
const {dataCache} = require('../middleware/cacheConnection')
const router = Router();

router.get("/owners",dataCache, getAllOwners);
router.get("/registration_details",dataCache, getAllRegistrationDetails);
router.get("/stickers",dataCache, getAllStickers);
router.get("/vehicles",dataCache, getAllVehicles);
router.get("/plates",dataCache, getAllPlates);
router.get("/owner/:name", getOwner);
router.get("/notices",dataCache, getNoticeOwners);
router.post("/createNewRegistration", createNewRegistration);
router.delete("/registration_details/:registration_id", deleteRegistration);
router.delete("/registration_details", deleteManyReg);
router.patch("/registration_details/:registration_details", updateReg);

module.exports = router;
