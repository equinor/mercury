import { ComponentApi, Configuration } from './generated'

// TODO: Combine all generated api's into MercuryAPI
export class MercuryAPI extends ComponentApi {
  constructor(token: string) {
    const configuration = new Configuration({
      accessToken: token,
    })
    super(configuration)
  }
}

export default MercuryAPI
