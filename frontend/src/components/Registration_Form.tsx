import { FormEvent, useEffect, useState } from "react";
import { IRegistration_Form } from "../intetfaces/Interfaces";
import { redirect } from "react-router-dom";
import ErrorPage from "./Error";

const RegistrationForm = () => {
  const [inputs, setInputs] = useState<IRegistration_Form>();
  const [error, setError] = useState();

  // useEffect(() => {
  //   console.log(error)
  // },[error])

  const postData = (event: FormEvent) => {
    preventDefault(event);
    fetch("http://localhost:2000/api/createNewRegistration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([inputs]),
    })
      .then(async (res: Response) => {
        if (res.status !== 200) {
          const data = await res.json();
          throw new Error(data);
        }
        res.json();
      })
      .then((data: any) => {
        redirect("/vehicles");
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };
  const preventDefault = (event: FormEvent) => event.preventDefault();
  return (
    <div className="max-w-xl">
      <h3 className="text-3xl font-medium m-1">Registration Form</h3>
      <form onSubmit={(e: FormEvent) => postData(e)}>
        <div className="flex flex-col gap-y-8 rounded-lg border border-gray-300 p-5">
          <div>
            <h3>Owner</h3>
            <div className="flex justify-evenly gap-x-8 ">
              <div>
                <label htmlFor="first_name" className="block">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
                {/* ! operator tells TypeScript that values is not undefined, so it won't raise an error when you try to access its properties*/}
              </div>
              <div>
                <label htmlFor="last_name" className="block">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
            </div>
            <div className="flex justify-evenly gap-x-8 ">
              <div>
                <label htmlFor="phone_number" className="block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
              <div>
                <label htmlFor="address" className="block">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
            </div>
          </div>
          <div>
            <h3>Vehicle</h3>
            <div className="flex justify-evenly gap-x-8 ">
              <div>
                <label htmlFor="vehicle_year" className="block">
                  Year
                </label>
                <input
                  type="number"
                  name="vehicle_year"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
              <div>
                <label htmlFor="mileage" className="block">
                  Mileage
                </label>
                <input
                  type="number"
                  required
                  name="mileage"
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
            </div>
            <div className="flex justify-evenly gap-x-8  ">
              <div>
                <label htmlFor="model" className="block">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
              <div>
                <label htmlFor="make" className="block">
                  Make
                </label>
                <input
                  type="text"
                  name="make"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
            </div>
            <div className="flex justify-evenly  gap-x-8 ">
              <div>
                <label htmlFor="weight" className="block">
                  Weight
                </label>
                <input
                  type="number"
                  name="weight"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
              <div>
                <label htmlFor="color" className="block">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
            </div>
          </div>
          <div>
            <h3>Sticker</h3>
            <div className="flex justify-start gap-x-8 ">
              <div>
                <label htmlFor="sticker_type" className="block">
                  Sticker Type
                </label>
                <select
                  defaultValue=""
                  required
                  name="sticker_type"
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                >
                  <option value="STANDARD">STANDARD</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="PLATINUM">PLATINUM</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h3>Plate</h3>
            <div className="flex justify-evenly gap-x-8 ">
              <div>
                <label htmlFor="plate_number" className="block">
                  Plate Number
                </label>
                <input
                  type="text"
                  name="plate_number"
                  required
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
              <div>
                <label htmlFor="plate_issuer" className="block">
                  Issuer
                </label>
                <input
                  type="text"
                  required
                  name="plate_issuer"
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
              <div>
                <label htmlFor="plate_type" className="block">
                  Plate Type
                </label>
                <select
                  defaultValue=""
                  required
                  name="plate_type"
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                >
                  <option value="IRON">IRON</option>
                  <option value="SILVER">SILVER</option>
                  <option value="GOLD">GOLD</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h3>Registration Details</h3>
            <div className="flex justify-evenly gap-x-8 ">
              <div>
                <label htmlFor="registration_fee" className="block">
                  Registration Fee
                </label>
                <input
                  type="number"
                  required
                  name="registration_fee"
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div>
              {/* <div>
                <label htmlFor="duration" className="block">
                  Duration
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="12"
                  name="duration"
                  onChange={(event) =>
                    setInputs((values) => ({
                      ...values!,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  className="input_design"
                />
              </div> */}
            </div>
          </div>
          <input
            type="submit"
            className="input_design bg-blue-700 hover:bg-blue-500 text-white"
          />
        </div>
      </form>
      <div>{error && <ErrorPage fetchError={error} />}</div>
    </div>
  );
};

export default RegistrationForm;
