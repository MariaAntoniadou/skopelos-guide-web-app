import { ENDPOINTS } from '../config/api';
import { fetchFromAPI } from "./fetchFromAPI";

export async function getMainChapters() {
  return await fetchFromAPI(ENDPOINTS.getAllMainChapters);
}
