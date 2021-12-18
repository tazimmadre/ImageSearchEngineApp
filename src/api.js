import axios from 'axios';

export const imageapi = axios.create(
  {
    baseURL:
      "https://api.flickr.com/services/rest/?method=flickr.photos.search",
    params:{
      api_key: "636e1481b4f3c446d26b8eb6ebfe7127",
      format: "json",
      nojsoncallback:1
    }
  }
);

