
export type Cords = {
  long: number;
  lat: number;
}

export type MarkerType = {
  id: string
  type: string;
  coord: Cords;
}

export interface BikeStandMarker extends MarkerType {
  capacity: number;
}

export interface MissionMarker extends MarkerType {
  description: string;
  completed: boolean;
  points: number;
}

export interface ConstructionMarker extends MarkerType {
  description: string;
  completion_date: string;
}

export interface WaterMarker extends MarkerType {
  description: string;
}

export interface AirPressureMarker extends MarkerType {
  description: string;
}

export interface ModalineMarker extends MarkerType {
  description: string;
  capacity: number;
  occupied: number;
}

export type CreateMission = {
  coord: Cords;
  points: number;
}

export type CreateConstruiction = {
  coord: Cords;
  completion_date: Date;
}

export type CreateBikeStand = {
  coord: Cords;
  capacity: number;
}



export type Reward = {
  id: string;
  points: number;
  redeemed: boolean;
  detail: string;
}

export type AppUser = {
  name: string;
  completed_missions: string[];
  points: {
    value : number;
    all_time: number;
  }
}