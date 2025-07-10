import { ENDPOINTS } from '../config/api';
import { fetchFromAPI } from './fetchFromAPI';

export async function getAllMainStoryboards() {
  return await fetchFromAPI(ENDPOINTS.getAllStoryboards);
}

export async function getStoryboardById(id) {
  return await fetchFromAPI(ENDPOINTS.getStoryboardById(id));
}
