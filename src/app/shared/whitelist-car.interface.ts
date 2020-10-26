export interface Car {
  id: number;
  license_plate: string;
  allowed_from_date: string;
  allowed_to_date: string;
  allowed_time_from: string;
  allowed_time_to: string;
};

export interface WhitelistCars {
  whitelistCars: Car[];
}
