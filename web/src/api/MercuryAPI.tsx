import { Configuration, MercuryApi } from './generated'

export class MercuryAPI extends MercuryApi {
  constructor(token?: string) {
    const configuration = new Configuration({
      accessToken: token,
      basePath: '',
    })
    super(configuration)
  }
}

export default MercuryAPI
