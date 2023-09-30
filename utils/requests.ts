import { CreateBikeStand, CreateConstruiction, CreateMission } from "./models";

const API_URL = 'http://192.168.101.211:25565';


export const fetchMarkers = async () => {
  const response = await fetch(`${API_URL}/markers`);
  const data = await response.json();
  return data;
};


export const updateMission = async (id: string) => {
  const response = await fetch(`${API_URL}/missions/${id}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const fetchRewards = async () => {
  const response = await fetch(`${API_URL}/rewards`);
  const data = await response.json();
  return data;
}

export const fetchUser = async () => {
  const response = await fetch(`${API_URL}/me`);
  const data = await response.json();
  return data;
}

export const redeemReward = async (id: string) => {
  const response = await fetch(`${API_URL}/rewards/${id}/redeem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export const createMission = async (mission: CreateMission) => {
  const response = await fetch(`${API_URL}/missions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mission),
  });
  const data = await response.json();
  return data;
}

export const createConstruiction = async (construction: CreateConstruiction) => {
  const response = await fetch(`${API_URL}/constructions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(construction),
  });
  const data = await response.json();
  return data;
}

export const createBikeStand = async (bikeStand: CreateBikeStand) => {
  const response = await fetch(`${API_URL}/bikestands`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bikeStand),
  });
  const data = await response.json();
  return data;
}