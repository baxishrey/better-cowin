import { Session } from './Session';
import { VaccineFee } from './VaccineFee';

export interface Center {
  center_id: number;
  name: string;
  address: string;
  state_name: string;
  district_name: string;
  block_name: string;
  pincode: number;
  lat: number;
  long: number;
  from: string;
  to: string;
  fee_type: string;
  sessions: Session[];
  vaccine_fees?: VaccineFee[];
}

export interface CenterResponse {
  centers: Center[];
}
