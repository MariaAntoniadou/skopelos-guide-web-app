import axios from 'axios';
import { SERVER_IP } from '../config/api';


export async function fetchFromAPI(endpoint) {
  const query = SERVER_IP + endpoint;
  const response = await axios.get(query);
  return response.data.data;
}
