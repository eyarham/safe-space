import { getConfigValue } from "../config/api";

  const getRandomWord = async (type) => {
    //typeOptions=[noun, verb, adjective, adverb]
    const uri = 'https://api.api-ninjas.com/v1/randomword'
    const uriWithParams = `${uri}?type=${type}`
    const apiKey = await getConfigValue('apiNinjasApiKey');
    const response = await fetch(uriWithParams, {
      mode: 'cors',
      headers: {
        'x-api-key': apiKey,
        'User-Agent': 'My-App',
        'Accept': '*/*',
      }
    });
    const obje= await response.json();
    return obje.word;
  }

  export {getRandomWord}