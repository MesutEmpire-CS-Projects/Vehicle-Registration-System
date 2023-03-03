import { Request, Response } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import ErrnoException = NodeJS.ErrnoException;
import {PoolConnection, PromisePoolConnection} from "mysql2/promise";

const pool = require("../middleware/databaseConnection");

//Perform CRUD
//Add new Employee
const createNewRegistration = (req: Request, res: Response) => {
    const [{first_name,last_name,phone_number,address,vehicle_number, color, vehicle_year, model,make,weight,mileage, registration_fee, duration, sticker_type,plate_issuer,plate_type}] = req.body;
    const owner_name = `${first_name} ${last_name}`
    let details = {
        owner_id: null,
        plate_number : null,
        sticker_number : null
    }

    pool.getConnection((error:ErrnoException, db:any) => {
        console.log("Created Connection");
        try{
            //INSERT OWNER
            console.log("Start Owner");
            db.promise().query(
                {
                    sql: "INSERT INTO owner(owner_name,phone_number,address) VALUES(?,?,?)",
                    values: [
                        owner_name,phone_number,address
                    ],
                })
                .then((result:any) => {
                    details.owner_id = result[0].insertId;
                    for (const txt in result){
                        console.log(`txt ---> ${txt} ====>>> ${result[txt]}`)
                    }
                    console.log(`Added Owner ===> ${details.owner_id}`);
                    //INSERT PLATE
                    db.promise().query(
                        {
                            sql: "INSERT INTO plate(plate_issuer, issue_year,type) VALUES (?, YEAR(SYSDATE()), ?)",
                            values: [
                                plate_issuer,plate_type
                            ],
                        })
                        .then((result:any) => {
                            details.plate_number = result[0].insertId;
                            console.log(`Added Plate  ===> ${details.plate_number}`);
                            //INSERT STICKER
                            db.promise().query(
                                {
                                    sql: "INSERT INTO sticker(sticker_year, type) VALUES ( YEAR(SYSDATE()), ?)",
                                    values: [
                                        sticker_type
                                    ],
                                })
                                .then((result:any) => {
                                    details.sticker_number = result[0].insertId;
                                    console.log(`Added Sticker ===> ${details.sticker_number}`);
                                    //INSERT VEHICLE
                                    db.promise().query(
                                        {
                                            sql: "INSERT INTO vehicle(vehicle_number, color, vehicle_year, model,make,weight,mileage,plate_number,sticker_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                                            values: [
                                                vehicle_number, color, vehicle_year, model,make,weight,mileage,details.plate_number,details.sticker_number
                                            ],
                                        })
                                        .then((result:any) => {
                                            console.log("Added Vehicle");
                                            //INSERT REG
                                            db.promise().query(
                                                {
                                                    sql: "INSERT INTO registration_detail(registration_fee, start_date, duration,end_date,vehicle_number,owner_id) VALUES (?, SYSDATE(), ?, DATE_ADD(SYSDATE(),INTERVAL registration_detail.duration MONTH), ?, ?)",
                                                    values: [
                                                        registration_fee, duration,vehicle_number,details.owner_id
                                                    ],
                                                })
                                                .then((result:any) => {
                                                    console.log("Added Reg");
                                                    db.commit();
                                                    res.status(200).json({ message: "Registration successful" });
                                                })
                                                .catch((error:any) => {
                                                    console.log(error);
                                                    db.rollback();
                                                    res.status(500).json({ message: "Error registering INTO Registrsion details" });
                                                });
                                        })
                                        .catch((error:any) => {
                                            console.log(error);
                                            db.rollback();
                                            res.status(500).json({ message: "Error registering vehicle" });
                                        });
                                })
                                .catch((error:any) => {
                                    console.log(error);
                                    db.rollback();
                                    res.status(500).json({ message: "Error registering sticker" });
                                });
                        })
                        .catch((error:any) => {
                            console.log(error);
                            db.rollback();
                            res.status(500).json({ message: "Error registering plate" });
                        });
                })
                .catch((error:any) => {
                    console.log(error);
                    db.rollback();
                    res.status(500).json({ message: "Error registering owner" });
                });
        }
        catch (error:any) {
            console.log(error);
            db.rollback();
            res.status(500).json({ message: "Error registering vehicle" });
        }
        finally {
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
            if (error) throw error;
            res.json(results);
        }
    );
};
//Delete an Employees
const deleteRegistration = (req: Request, res: Response) => {
    const {owner_id,plate_number,sticker_number,vehicle_number,registration_id} = req.body;
    pool.getConnection((error:ErrnoException, db:any) => {
        console.log("Created Connection");
        try{
            //INSERT OWNER
            console.log("Start Owner");
            db.promise().query(
                {
                    sql: "DELETE FROM owner WHERE owner_id = ?",
                    values: [owner_id],
                })
                .then(() => {
                    console.log("Deleted Owner");
                    //INSERT PLATE
                    db.promise().query(
                        {
                            sql: "DELETE FROM plate WHERE plate_number = ?",
                            values: [plate_number],
                        })
                        .then(() => {
                            console.log("Deleted Plate");
                            //INSERT STICKER
                            db.promise().query(
                                {
                                    sql: "DELETE FROM sticker WHERE sticker_number = ?",
                                    values: [sticker_number],
                                })
                                .then(() => {
                                    console.log("Deleted Sticker");
                                    //INSERT VEHICLE
                                    db.promise().query(
                                        {
                                            sql: "DELETE FROM vehicle WHERE vehicle_number = ?",
                                            values: [vehicle_number],
                                        })
                                        .then(() => {
                                            console.log("Deleted Vehicle");
                                            //INSERT REG
                                            db.promise().query(
                                                {
                                                    sql: "DELETE FROM registration_detail WHERE registration_id = ?",
                                                    values: [registration_id],
                                                })
                                                .then(() => {
                                                    console.log("Deleted Reg");
                                                    db.commit();
                                                    res.status(200).json({ message: "Registration successful" });
                                                })
                                                .catch((error:any) => {
                                                    console.log(error);
                                                    db.rollback();
                                                    res.status(500).json({ message: "Error registering INTO Registrsion details" });
                                                });
                                        })
                                        .catch((error:any) => {
                                            console.log(error);
                                            db.rollback();
                                            res.status(500).json({ message: "Error registering vehicle" });
                                        });
                                })
                                .catch((error:any) => {
                                    console.log(error);
                                    db.rollback();
                                    res.status(500).json({ message: "Error registering sticker" });
                                });
                        })
                        .catch((error:any) => {
                            console.log(error);
                            db.rollback();
                            res.status(500).json({ message: "Error registering plate" });
                        });
                })
                .catch((error:any) => {
                    console.log(error);
                    db.rollback();
                    res.status(500).json({ message: "Error registering owner" });
                });
        }
        catch (error:any) {
            console.log(error);
            db.rollback();
            res.status(500).json({ message: "Error registering vehicle" });
        }
        finally {
            db.release();
        }
    });
    // pool.query(
    //     {
    //         sql: "DELETE FROM employee WHERE employee_id = ?",
    //         values: [employee_id],
    //     },
    //     (error: QueryError, results: RowDataPacket) => {
    //         if (error) throw error;
    //         console.log(results);
    //         res.json(results);
    //         if (results.affectedRows > 0) {
    //             console.log(`Deleted user with id: ${employee_id}`);
    //         } else {
    //             console.log(`No user found with id: ${employee_id}`);
    //         }
    //     }
    // );
};
//Delete many Employees
const deleteManyEmployees = (req: Request, res: Response) => {
    console.log("hello2");
    const employee_ids_double: any = req.query.ids;
    const employee_ids = employee_ids_double
        .split(",")
        .map((id: any) => parseInt(id));
    console.log(employee_ids);
    pool.query(
        {
            sql: "DELETE FROM employee WHERE employee_id IN (?)",
            values: [employee_ids],
        },
        (error: QueryError, results: RowDataPacket) => {
            if (error) throw error;
            if (results.affectedRows > 0) {
                console.log(`Deleted users with ids: ${employee_ids}`);
                res
                    .status(200)
                    .json({ message: `Deleted users with ids: ${employee_ids}` });
            } else {
                console.log(`No users found with ids: ${employee_ids}`);
                res
                    .status(404)
                    .json({ message: `No users found with ids: ${employee_ids}` });
            }
        }
    );
};

//Update Employee
const updateEmployee = (req: Request, res: Response) => {
    const employee_id = req.params.employee_id;
    const { first_name, salary } = req.body;
    pool.query(
        {
            sql: "UPDATE employee SET first_name = ?, salary = ? WHERE employee_id = ?",
            values: [first_name, salary, employee_id],
        },
        (error: QueryError, results: RowDataPacket) => {
            if (error) throw error;
            if (results.affectedRows > 0) {
                console.log(`Update employee with id: ${employee_id}`);
                res
                    .status(200)
                    .json({ message: `Update employee with id: ${employee_id}` });
            } else {
                console.log(`No employee found with id: ${employee_id}`);
                res
                    .status(404)
                    .json({ message: `No employee found with id: ${employee_id}` });
            }
        }
    );
};

//GET all Employees
const getAllOwners = (req: Request, res: Response) => {
    pool.query(
        "SELECT * FROM owner",
        (error: QueryError, results: RowDataPacket) => {
            if (error) throw error;
            res.json(results);
        }
    );
};
const getAllRegistrationDetails = (req: Request, res: Response) => {
    pool.query(
        "SELECT * FROM registration_detail",
        (error: QueryError, results: RowDataPacket) => {
            if (error) throw error;
            res.json(results);
        }
    );
};
const getAllStickers = (req: Request, res: Response) => {
    pool.query(
        "SELECT * FROM sticker",
        (error: QueryError, results: RowDataPacket) => {
            if (error) throw error;
            res.json(results);
        }
    );
};
const getAllVehicles = (req: Request, res: Response) => {
    pool.query(
        "SELECT * FROM vehicle",
        (error: QueryError, results: RowDataPacket) => {
            if (error) throw error;
            res.json(results);
        }
    );
};
const getAllPlates = (req: Request, res: Response) => {
    pool.query(
        "SELECT * FROM plate",
        (error: QueryError, results: RowDataPacket) => {
            if (error) throw error;
            res.json(results);
        }
    );
};

module.exports = {
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
};
