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
  deleteManyEmployees,
  updateEmployee,
} = require("../controllers/registrationController");
const db = require("../middleware/databaseConnection");

const router = Router();

router.get("/owners", getAllOwners);
router.get("/registration_details", getAllRegistrationDetails);
router.get("/stickers", getAllStickers);
router.get("/vehicles", getAllVehicles);
router.get("/plates", getAllPlates);
router.get("/owner/:name", getOwner);
router.post("/createNewRegistration", createNewRegistration);
router.delete("/registration_details/:registration_id", deleteRegistration);
router.delete("/employee", deleteManyEmployees);
router.patch("/employee/:employee_id", updateEmployee);

module.exports = router;
