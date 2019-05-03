

export const create = (key) => {
  const storage = window.storage || null;
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
      storage.setItem(key, JSON.stringify(json))
    }
  }
}
