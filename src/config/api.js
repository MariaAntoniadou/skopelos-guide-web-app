
export const SERVER_IP = 'https://skopelos-admin.inculture.app/api';
export const UPLOADS_BASE_URL = 'https://skopelos-admin.inculture.app';


export const ENDPOINTS = {
  getAllMainChapters: `/main-chapters?publicationState=live&populate[1]=title,description,mainStoryboards&populate[2]=mainStoryboards.title,mainStoryboards.thumbnail`,
  
  getAllStoryboards: `/main-storyboards?publicationState=live&populate[1]=title,topbarTitle,thumbnail,tags&populate[2]=tags.title,tags.color,tags.svg`,

  getStoryboardById: (id) =>
    `/main-storyboards/${id}?populate[tags][populate]=*&populate=thumbnail`,
};
