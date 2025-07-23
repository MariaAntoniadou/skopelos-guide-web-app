export const SERVER_IP = 'https://skopelos-admin.inculture.app/api';
export const UPLOADS_BASE_URL = 'https://skopelos-admin.inculture.app';

// Helper: injects `?locale=...` or `&locale=...` into URL
const withLocale = (url, locale = 'el') =>
  `${url}${url.includes('?') ? '&' : '?'}locale=${locale}`;

// Your existing + new deeply populated endpoints
export const ENDPOINTS = {

  getIntroductionChaptersDeep: (locale = 'e') =>
  `/introduction-chapters?locale=${locale}&populate[0]=storyboards,thumbnail&populate[1]=storyboards.thumbnail,storyboards.slides&populate[2]=storyboards.slides.medias&populate[3]=storyboards.slides.medias.files,storyboards.slides.medias.thumbnail,storyboards.slides.medias.tags&populate[4]=storyboards.slides.medias.tags.svg`,

    
  getAllMainChapters: (locale = 'el') =>
    withLocale(
      `/main-chapters?populate[0]=mainStoryboards&populate[1]=mainStoryboards.thumbnail,mainStoryboards.tags`,
      locale
    ),

  
  getStoryboardById: (id) =>
  `/main-storyboards/${id}?populate[0]=thumbnail,tags,points&populate[1]=tags.svg,points.thumbnail,points.medias,points.tags&populate[2]=points.medias.thumbnail,points.medias.files,points.tags.svg`,

  getChapterById: (id) => `/main-chapters/${id}`,



  getStoryboardsWithPoints: (locale = 'el') =>
  withLocale(
    `/main-storyboards
    ?populate[0]=thumbnail,tags,points
    &populate[1]=tags.svg,points.thumbnail,points.medias,points.tags
    &populate[2]=points.medias.thumbnail,points.medias.files,points.tags.svg`,
    locale
  ),

  getPointById:(id) => `/points/${id}?populate[0]=thumbnail,medias,tags&populate[1]=medias.thumbnail,medias.files,tags.svg`,


  getEventsDeep: (locale = 'el') =>
    withLocale(
      `/events?populate[0]=thumbnail,date,points&populate[1]=points.thumbnail,points.medias,points.tags&populate[2]=points.medias.thumbnail,points.tags.svg`,
      locale
    ),

  getTrailsWithPoints: (locale = 'el') =>
    withLocale(
      `/trails?populate=points`, 
      locale
    ),

    

  getTrailById: (id, locale = 'el') =>
  withLocale(`/trails/${id}?populate[0]=points&populate[1]=gpx`, locale),


  getMainStoryboardsWithTrails: (locale = 'en') =>
  `/main-storyboards?locale=${locale}` +
  `&populate[0]=thumbnail,tags,points,trails` +
  `&populate[1]=tags.svg,points.thumbnail,points.medias,points.tags,trails.path,trails.tags,trails.tags.svg` +
  `&populate[2]=points.medias.thumbnail,points.medias.files,points.tags.svg`,

 getTrailsWithPointsAndGpx: (locale = 'el') =>
  withLocale(
    `/trails?populate[0]=points&populate[1]=gpx`,
    locale
  ),


};


