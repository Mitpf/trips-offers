



export const environment = {
  apiUrl: 'https://parseapi.back4app.com',
};

const apiCredentials = {
  appId: 'PbsUtdKVxe7rbYDL5553Ev3QDGDd9DPbP6dnl8tU', // Application ID
  apiKey: 'OqvCHBHIaTwKUIAFdQjjPTyrPScywEX6uIM5rqE6', // JavaScript key
  restApiKey: 'xDflhIlMZQ9VVZSyApQE9cDh4XMB2PJ84CH57Qzy', //REST API key
};

export const apiHeaders = {
    'X-Parse-Application-Id': apiCredentials.appId,
    'X-Parse-REST-API-Key': apiCredentials.restApiKey,
    'X-Parse-JavaScript-Key': apiCredentials.apiKey,
    'X-Parse-Session-Token': '',
  }

