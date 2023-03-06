import { Request, Response } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import ErrnoException = NodeJS.ErrnoException;
import { PoolConnection, PromisePoolConnection } from "mysql2/promise";

const pool = require("../middleware/databaseConnection");

//Perform CRUD
//Add new Registration
const createNewRegistration = (req: Request, res: Response) => {
  const [
    {
      first_name,
      last_name,
      phone_number,
      address,
      vehicle_number,
      color,
      vehicle_year,
      model,
      make,
      weight,
      mileage,
      registration_fee,
      sticker_type,
      plate_issuer,
      plate_type,
    },
  ] = req.body;
  const owner_name = `${first_name} ${last_name}`;
  let details = {
    owner_id: null,
    plate_number: null,
    sticker_number: null,
  };

  pool.getConnection((error: ErrnoException, db: any) => {
    try {
      //INSERT OWNER
      db.promise()
        .query({
          sql: "INSERT INTO owner(owner_name,phone_number,address) VALUES(?,?,?)",
          values: [owner_name, phone_number, address],
        })
        .then((result: any) => {
          details.owner_id = result[0].insertId;
          for (const txt in result) {
            console.log(`txt ---> ${txt} ====>>> ${result[txt]}`);
          }
          //INSERT PLATE
          db.promise()
            .query({
              sql: "INSERT INTO plate(plate_issuer, issue_year,type) VALUES (?, YEAR(SYSDATE()), ?)",
              values: [plate_issuer, plate_type],
            })
            .then((result: any) => {
              details.plate_number = result[0].insertId;
              //INSERT STICKER
              db.promise()
                .query({
                  sql: "INSERT INTO sticker(sticker_year, type) VALUES ( YEAR(SYSDATE()), ?)",
                  values: [sticker_type],
                })
                .then((result: any) => {
                  details.sticker_number = result[0].insertId;
                  //INSERT VEHICLE
                  db.promise()
                    .query({
                      sql: "INSERT INTO vehicle(vehicle_number, color, vehicle_year, model,make,weight,mileage,plate_number,sticker_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                      values: [
                        vehicle_number,
                        color,
                        vehicle_year,
                        model,
                        make,
                        weight,
                        mileage,
                        details.plate_number,
                        details.sticker_number,
                      ],
                    })
                    .then((result: any) => {
                      const duration = registration_fee / 5000;
                      //INSERT REG
                      db.promise()
                        .query({
                          sql: "INSERT INTO registration_detail(registration_fee, start_date, duration,end_date,vehicle_number,owner_id) VALUES (?, SYSDATE(), ?, DATE_ADD(SYSDATE(),INTERVAL registration_detail.duration MONTH), ?, ?)",
                          values: [
                            registration_fee,
                            duration,
                            vehicle_number,
                            details.owner_id,
                          ],
                        })
                        .then((result: any) => {
                          db.commit();
                          res
                            .status(200)
                            .json({ message: "Registration successful" });
                        })
                        .catch((error: any) => {
                          db.rollback();
                          res.status(500).json(error.sqlMessage);
                        });
                    })
                    .catch((error: any) => {
                      db.rollback();
                      res.status(500).json(error.sqlMessage);
                    });
                })
                .catch((error: any) => {
                  db.rollback();
                  res.status(500).json(error.sqlMessage);
                });
            })
            .catch((error: any) => {
              db.rollback();
              res.status(500).json(error.sqlMessage);
            });
        })
        .catch((error: any) => {
          db.rollback();
          res.status(500).json(error.sqlMessage);
        });
    } catch (error: any) {
      db.rollback();
      res.status(500).json(error.sqlMessage);
    } finally {
      db.release();
    }
  });
};

const getOwner = (req: Request, res: Response) => {
  const name = req.params.name;
  pool.query(
    {
      sql: "SELECT * FROM owner WHERE owner_name LIKE ?",
      values: [`%${name}%`, `%${name}%`],
    },
    (error: QueryError, results: RowDataPacket) => {
      if (error) {
        res.status(400).json(error);
        throw error;
      }
      res.json(results);
    }
  );
};
//Delete an Registration
const deleteRegistration = (req: Request, res: Response) => {
  const {
    owner_id,
    plate_number,
    sticker_number,
    vehicle_number,
    registration_id,
  } = req.body;
  pool.getConnection((error: ErrnoException, db: any) => {
    console.log("Created Connection");
    try {
      //DELETE OWNER
      console.log("Start Owner");
      db.promise()
        .query({
          sql: "DELETE FROM owner WHERE owner_id = ?",
          values: [owner_id],
        })
        .then(() => {
          console.log("Deleted Owner");
          //DELETE PLATE
          db.promise()
            .query({
              sql: "DELETE FROM plate WHERE plate_number = ?",
              values: [plate_number],
            })
            .then(() => {
              console.log("Deleted Plate");
              //DELETE STICKER
              db.promise()
                .query({
                  sql: "DELETE FROM sticker WHERE sticker_number = ?",
                  values: [sticker_number],
                })
                .then(() => {
                  console.log("Deleted Sticker");
                  //DELETE VEHICLE
                  db.promise()
                    .query({
                      sql: "DELETE FROM vehicle WHERE vehicle_number = ?",
                      values: [vehicle_number],
                    })
                    .then(() => {
                      console.log("Deleted Vehicle");
                      //DELETE REG
                      db.promise()
                        .query({
                          sql: "DELETE FROM registration_detail WHERE registration_id = ?",
                          values: [registration_id],
                        })
                        .then(() => {
                          console.log("Deleted Reg");
                          db.commit();
                          res
                            .status(200)
                            .json({ message: "Registration successful" });
                        })
                        .catch((error: any) => {
                          console.log(error);
                          db.rollback();
                          res.status(500).json(error.sqlMessage);
                        });
                    })
                    .catch((error: any) => {
                      console.log(error);
                      db.rollback();
                      res.status(500).json(error.sqlMessage);
                    });
                })
                .catch((error: any) => {
                  console.log(error);
                  db.rollback();
                  res.status(500).json(error.sqlMessage);
                });
            })
            .catch((error: any) => {
              console.log(error);
              db.rollback();
              res.status(500).json(error.sqlMessage);
            });
        })
        .catch((error: any) => {
          console.log(error);
          db.rollback();
          res.status(500).json(error.sqlMessage);
        });
    } catch (error: any) {
      console.log(error);
      db.rollback();
      res.status(500).json(error.sqlMessage);
    } finally {
      db.release();
    }
  });
};

//GET all Employees
const getAllOwners = (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM owner",
    (error: QueryError, results: RowDataPacket) => {
      if (error) res.status(500).json(error);
      res.json(results);
    }
  );
};
const getAllRegistrationDetails = (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM registration_detail",
    (error: QueryError, results: RowDataPacket) => {
      if (error) res.status(500).json(error);
      res.json(results);
    }
  );
};
const getAllStickers = (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM sticker",
    (error: QueryError, results: RowDataPacket) => {
      if (error) res.status(500).json(error);
      res.json(results);
    }
  );
};
const getAllVehicles = (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM vehicle",
    (error: QueryError, results: RowDataPacket) => {
      if (error) res.status(500).json(error);
      res.json(results);
    }
  );
};
const getAllPlates = (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM plate",
    (error: QueryError, results: RowDataPacket) => {
      if (error) res.status(500).json(error);
      res.json(results);
    }
  );
};

//Delete Many Registrations
const deleteManyReg = (req: Request, res: Response) => {};

//Update Registrations
const updateReg = (req: Request, res: Response) => {};

module.exports = {
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
};
