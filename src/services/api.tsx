import axios from 'axios'

class api{

     fetchDataAPI = async (page:any) => {

          return  await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)

    }
    fetchSearchAPI = async (page:any,queryu:any) => {

     return  await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}&query=${queryu}`)

}
    

}

export default new api();
