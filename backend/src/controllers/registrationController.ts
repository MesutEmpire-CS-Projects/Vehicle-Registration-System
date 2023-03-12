import { Request, Response } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import ErrnoException = NodeJS.ErrnoException;
import { PoolConnection, PromisePoolConnection } from "mysql2/promise";
const { redisClient } = require("../middleware/cacheConnection");
const pool = require("../middleware/databaseConnection");

//Perform CRUD
//Add new Registration
const createNewRegistration = (req: Request, res: Response) => {
  const
    {
      first_name,
      last_name,
      phone_number,
      address,
      plate_number,
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
    }
   = req.body;
  const owner_name = `${first_name} ${last_name}`;
  let details = {
    owner_id: null,
    vehicle_number: null,
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
          //INSERT PLATE
          db.promise()
            .query({
              sql: "INSERT INTO plate(plate_number,plate_issuer, issue_year,type) VALUES (?,?, YEAR(SYSDATE()), ?)",
              values: [plate_number, plate_issuer, plate_type],
            })
            .then((result: any) => {
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
                      sql: "INSERT INTO vehicle(color, vehicle_year, model,make,weight,mileage,plate_number,sticker_number,owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                      values: [
                        color,
                        vehicle_year,
                        model,
                        make,
                        weight,
                        mileage,
                        plate_number,
                        details.sticker_number,
                        details.owner_id,
                      ],
                    })
                    .then((result: any) => {
                      details.vehicle_number = result[0].insertId;
                      const duration = registration_fee / 5000;

                      //INSERT REG
                      db.promise()
                        .query({
                          sql: "INSERT INTO registration_detail(registration_fee, start_date, duration,end_date,vehicle_number,owner_id) VALUES (?, SYSDATE(), ?, DATE_ADD(SYSDATE(),INTERVAL registration_detail.duration MONTH), ?, ?)",
                          values: [
                            registration_fee,
                            duration,
                            details.vehicle_number,
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
const getAllData = (req: Request, res: Response) => {
  const table = req.params.type;
  pool.query(
    `SELECT * FROM ${table}`,
    (error: QueryError, results: RowDataPacket) => {
      if (error) res.status(500).json(error);
      redisClient.set(table, JSON.stringify(results), {
        EX: process.env.EXPIRY_TIME,
      });
      res.json(results);
    }
  );
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

const getNoticeOwners = (req: Request, res: Response) => {
  const currentDate = new Date();
  const endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 2));

  pool.query(
    {
      sql: "SELECT registration_detail.owner_id, registration_detail.end_date, owner.owner_name, owner.phone_number FROM registration_detail JOIN owner ON registration_detail.owner_id = owner.owner_id WHERE registration_detail.end_date < ?;",
      values: [endDate],
    },
    (error: QueryError, results: RowDataPacket) => {
      if (error) res.status(500).json(error);
      redisClient.set("notice", JSON.stringify(results), {
        EX: process.env.EXPIRY_TIME,
      });
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
  getOwner,
  deleteRegistration,
  deleteManyReg,
  updateReg,
  getNoticeOwners,
  getAllData,
};
