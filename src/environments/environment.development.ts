

export const environment = {
  apiUrl: 'https://parseapi.back4app.com',
};

const apiCredentials = {
  appId: 'qbYxjUKwddTTXNPHyM2hXxkbe0lV4bfmqaOydU48', // Application ID
  apiKey: 'bXsV89Fn06mg2CDuk5Qpqq5othRpE71hzP628NiZ', // JavaScript key
  restApiKey: 'mhSQ5pdsbv7VJ5FlFgLOu7OK2R94seeajtOFBiRh', //REST API key
};

export const apiHeaders = {
    'X-Parse-Application-Id': apiCredentials.appId,
    'X-Parse-REST-API-Key': apiCredentials.restApiKey,
    'X-Parse-JavaScript-Key': apiCredentials.apiKey,
    'X-Parse-Session-Token': '',
  }

