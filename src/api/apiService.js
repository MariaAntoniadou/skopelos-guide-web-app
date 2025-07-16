import { ENDPOINTS } from '../config/api';
import { fetchFromAPI } from './fetchFromAPI';

// Fetch introduction chapters with deep populate
export async function getIntroductionChaptersDeep(locale = 'en') {
  return await fetchFromAPI(ENDPOINTS.getIntroductionChaptersDeep(locale));
}

// Fetch all main chapters with their storyboards and tags
export async function getAllMainChapters(locale = 'en') {
  return await fetchFromAPI(ENDPOINTS.getAllMainChapters(locale));
}

// Fetch a single storyboard by its ID with tags and thumbnail
export async function getStoryboardById(id) {
  return await fetchFromAPI(ENDPOINTS.getStoryboardById(id));
}

// Fetch all storyboards with their points and media details
export async function getStoryboardsWithPoints(locale = 'en') {
  return await fetchFromAPI(ENDPOINTS.getStoryboardsWithPoints(locale));
}

// Fetch events with points and media details
export async function getEventsDeep(locale = 'en') {
  return await fetchFromAPI(ENDPOINTS.getEventsDeep(locale));
}

// Fetch localizations for any entity by type and id
export async function getLocalizations(entityType, entityId) {
  return await fetchFromAPI(ENDPOINTS.getLocalizationsId(entityType, entityId));
}
