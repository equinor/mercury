import { Configuration, TodosApi } from './generated'

export class MercuryAPI extends TodosApi {
  constructor(token: string) {
    const configuration = new Configuration({
      basePath: 'http://localhost',
      accessToken: token,
    })
    super(configuration)
  }
}

export default MercuryAPI
