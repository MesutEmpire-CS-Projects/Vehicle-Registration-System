export interface IOwner {
  owner_id: number;
  owner_name: string;
  phone_number: number;
  address: string;
}

export interface ISticker {
  sticker_number: number;
  sticker_year: number;
  type: string;
}
export interface IPlate {
  plate_number: number;
  plate_issuer: string;
  issue_year: number;
  type: string;
}
export interface IVehicle {
  vehicle_number: string;
  color: string;
  vehicle_year: number;
  model: string;
  make: string;
  weight: number;
  mileage: number;
  plate_number: number;
  sticker_number: number;
}

export interface IRegistration_detail {
  registration_id: number;
  registration_fee: number;
  start_date: number;
  duration: number;
  end_date: number;
  vehicle_number: string;
  owner_id: number;
}

export type IRegistration_Form = {
  first_name: string;
  last_name: string;
  phone_number: number;
  address: string;
  vehicle_number: string;
  color: string;
  vehicle_year: number;
  model: string;
  make: string;
  weight: number;
  mileage: number;
  registration_fee: number;
  duration: number;
  sticker_type: string;
  plate_issuer: string;
  plate_type: string;
};
