import { Configuration, MercuryApi } from './generated'

export class MercuryAPI extends MercuryApi {
  constructor(token: string) {
    const configuration = new Configuration({
      basePath: 'http://localhost',
      accessToken: token,
    })
    super(configuration)
  }
}

export default MercuryAPI
