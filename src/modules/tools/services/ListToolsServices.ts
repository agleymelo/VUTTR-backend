import { injectable, inject } from 'tsyringe'

import Tools from '../infra/typeorm/entities/Tools'
import IToolsRepository from '../repositories/IToolsRepository'

type IRequest = {
  user_id: string
  tags: string
}

@injectable()
export default class ListToolsServices {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  public async execute({ user_id, tags }: IRequest): Promise<Tools[] | undefined> {
    if (!tags) {
      const tools = await this.toolsRepository.findAllTools(user_id)

      return tools
    }

    const tools = await this.toolsRepository.findByTag(tags, user_id)

    return tools
  }
}
