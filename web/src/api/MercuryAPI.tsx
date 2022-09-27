import { ComponentApi, Configuration } from './generated'

export class MercuryAPI extends ComponentApi {
  constructor(token: string) {
    const configuration = new Configuration({
      basePath: 'http://localhost',
      accessToken: token,
    })
    super(configuration)
  }
}

export default MercuryAPI
