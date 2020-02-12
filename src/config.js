if (process.env.NODE_ENV === 'production'){
  var api_url = process.env.REACT_APP_PROD_API_URL
}else{
  var api_url = process.env.REACT_APP_DEV_API_URL
}

export const API_URL = api_url
