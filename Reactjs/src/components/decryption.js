import axios from 'axios';
import CryptoJS from 'crypto-js';
import ApiConfig from '../ApiConfig';

let Api = new ApiConfig()

// const api = axios.create({
//   baseURL: Api.BaseURI,
// });


axios.interceptors.response.use(
  (response) => {
    const secretKey = 'don'; 
    console.log("indfdfee",process.env.REACT_APP_SHOW_ISENCRYPT==="true")
    if(process.env.REACT_APP_SHOW_ISENCRYPT==="true"){
      let originalQueryString = decodeURIComponent(response.data);
      const decryptedData = CryptoJS.AES.decrypt((originalQueryString), secretKey).toString(CryptoJS.enc.Utf8);    
      const decryptedJSON = JSON.parse(decryptedData);
      response.data=decryptedJSON;
      response.data=JSON.parse(response.data)
  
      console.log("resdfer",response.data)
      console.log("response",response)
    }
  
    return response;
  },
  (error) => {
    return Promise.reject(error);
    // return error
  }
);

export default axios;
