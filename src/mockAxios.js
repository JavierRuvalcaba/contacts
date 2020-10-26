import { axiosMock } from './helpers/axios';
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axiosMock, { delayResponse: 3000 })

mock.onPost('api/add-image').reply((config) => {
  const image =  JSON.parse(config.data);
  return [200, {
      data: image.image,
      isValid: true,
      message: "",
      type: 200,
      hasMessages: false
  }]
})