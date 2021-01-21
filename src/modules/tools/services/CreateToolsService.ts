import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import AppError from '@shared/error/AppError'

import Tools from '../infra/typeorm/entities/Tools'
import IToolsRepository from '../repositories/IToolsRepository'

type IRequest = {
  user_id: string
  title: string
  description: string
  link: string
  tags: string[]
}

@injectable()
export default class CreateToolsService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  public async execute({ user_id, title, description, link, tags }: IRequest): Promise<Tools> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const toolExist = await this.toolsRepository.findByTitle(title, user_id)

    if (toolExist) {
      throw new AppError(`${title} already exists`, 400)
    }

    const tagsLowercase = tags.map(tag => tag.toLowerCase())

    const tool = await this.toolsRepository.create({
      user_id,
      title: title.toLowerCase(),
      description,
      link,
      tags: tagsLowercase
    })

    return tool
  }
}
