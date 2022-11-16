export interface IHelmet {
  helmet_id: number;
  worker_id: number;
  temp: number;
  humid: number;
  photoresistor: number;
  latitude: number;
  longitude: number;
  distance: number;
  shock: boolean;
  worker_danger: boolean;
  updated_time: Date;
}
