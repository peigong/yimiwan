import { api } from '@/wx/util/axios'

export const Type = {
  'None': 0,
  'Image': 1,
  'Video': 2,
  'TxVideo': 3
}

export const getMediaUrl = function(media = {}){
  let url = media.url || ''
  if(url){
    url = `/media/${ url }`
  }
  return url
}

export const createMedia = async function(params){
  return await api.post('media', params)
}
