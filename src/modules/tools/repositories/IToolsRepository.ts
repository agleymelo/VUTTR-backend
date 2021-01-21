import ICreateToolsDTO from '../dtos/ICreateToolsDTO'
import Tools from '../infra/typeorm/entities/Tools'

export default interface IToolsRepository {
  findByTitle(title: string, user_id: string): Promise<Tools | undefined>
  findByTag(tag: string, user_id: string): Promise<Tools[] | undefined>
  findAllTools(user_id: string): Promise<Tools[]>
  findById(id: string): Promise<Tools | undefined>
  create(data: ICreateToolsDTO): Promise<Tools>
  save(tool: Tools): Promise<Tools>
  delete(tools_id: string): Promise<void>
}
