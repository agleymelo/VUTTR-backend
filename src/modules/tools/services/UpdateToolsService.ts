import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import AppError from '@shared/error/AppError'

import Tools from '../infra/typeorm/entities/Tools'
import IToolsRepository from '../repositories/IToolsRepository'

type IRequest = {
  user_id: string
  tools_id: string
  title: string
  description: string
  link: string
  tags: string[]
}

@injectable()
export default class UpdateToolsService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  public async execute({ user_id, tools_id, title, description, link, tags }: IRequest): Promise<Tools> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const tools = await this.toolsRepository.findById(tools_id)

    if (!tools) {
      throw new AppError('Tool not found', 404)
    }

    if (user_id !== tools.user_id) {
      throw new AppError('You are not authorized to do this', 401)
    }

    if (tools.title !== title.toLowerCase()) {
      const toolExist = await this.toolsRepository.findByTitle(title, user_id)

      if (toolExist) {
        throw new AppError(`${title} already exists`, 400)
      }
    }

    tools.title = title.toLowerCase()

    tools.description = description
    tools.link = link
    tools.tags = tags

    await this.toolsRepository.save(tools)

    return tools
  }
}
