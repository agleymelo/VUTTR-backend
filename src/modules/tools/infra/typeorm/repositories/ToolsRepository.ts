import { Repository, getRepository } from 'typeorm'

import ICreateToolsDTO from '@modules/tools/dtos/ICreateToolsDTO'
import IToolsRepository from '@modules/tools/repositories/IToolsRepository'

import Tools from '../entities/Tools'

export default class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tools>

  constructor() {
    this.ormRepository = getRepository(Tools)
  }

  public async findByTitle(title: string, user_id: string): Promise<Tools | undefined> {
    const tool = await this.ormRepository.findOne({
      where: {
        title: title.toLowerCase(),
        user_id
      }
    })

    return tool
  }

  public async findByTag(tag: string, user_id: string): Promise<Tools[]> {
    const findTag = await this.ormRepository.find({
      where: {
        user_id
      }
    })

    const tagFilter = findTag.filter(tool => {
      return tool.tags.includes(tag.toLowerCase())
    })

    return tagFilter
  }

  public async findAllTools(user_id: string): Promise<Tools[]> {
    const allTools = await this.ormRepository.find({
      where: {
        user_id
      }
    })

    return allTools
  }

  public async findById(id: string): Promise<Tools | undefined> {
    const tools = await this.ormRepository.findOne(id)

    return tools
  }

  public async create(data: ICreateToolsDTO): Promise<Tools> {
    const tools = this.ormRepository.create(data)

    await this.ormRepository.save(tools)

    return tools
  }

  public async save(tool: Tools): Promise<Tools> {
    return this.ormRepository.save(tool)
  }

  public async delete(tools_id: string): Promise<void> {
    await this.ormRepository.delete(tools_id)
  }
}
