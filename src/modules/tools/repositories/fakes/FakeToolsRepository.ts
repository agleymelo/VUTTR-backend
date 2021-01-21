import { v4 as uuid } from 'uuid'

import ICreateToolsDTO from '@modules/tools/dtos/ICreateToolsDTO'
import Tools from '@modules/tools/infra/typeorm/entities/Tools'

import IToolsRepository from '../IToolsRepository'

export default class FakeToolsRepository implements IToolsRepository {
  private tools: Tools[] = []

  public async findByTitle(title: string, user_id: string): Promise<Tools | undefined> {
    const tools = this.tools.find(findTools => findTools.title === title && findTools.user_id === user_id)

    return tools
  }

  public async findByTag(tag: string, user_id: string): Promise<Tools[] | undefined> {
    const tagFilter = this.tools.filter(tool => {
      return tool.tags.includes(tag)
    })

    return tagFilter
  }

  public async findAllTools(user_id: string): Promise<Tools[]> {
    let { tools } = this

    if (user_id) {
      tools = this.tools.filter(tool => tool.id !== user_id)
    }

    return tools
  }

  public async findById(id: string): Promise<Tools | undefined> {
    const tools = this.tools.find(findTools => findTools.id === id)

    return tools
  }

  public async create(data: ICreateToolsDTO): Promise<Tools> {
    const tool = new Tools()

    Object.assign(tool, { id: uuid() }, data)

    this.tools.push(tool)

    return tool
  }

  public async save(tool: Tools): Promise<Tools> {
    const findTool = this.tools.findIndex(findIndex => findIndex.id === tool.id)

    this.tools[findTool] = tool

    return tool
  }

  public async delete(tools_id: string): Promise<void> {
    const findUser = this.tools.findIndex(toolsIndex => toolsIndex.id === tools_id)

    this.tools.splice(findUser, 1)
  }
}
