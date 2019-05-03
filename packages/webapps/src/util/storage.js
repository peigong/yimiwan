

export const create = (key) => {
  const storage = window.localStorage || null;
  return {
    get(){
      if(storage){
        try{
          return JSON.parse(storage.getItem(key))
        }catch(ex){
          return null
        }
      }else{
        return null
      }
    },
    set(json){
      if(storage){
        storage.setItem(key, JSON.stringify(json))
      }
    }
  }
}
