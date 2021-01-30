import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateToolsService from '@modules/tools/services/CreateToolsService'
import DeleteToolsService from '@modules/tools/services/DeleteToolsService'
import ShowToolsService from '@modules/tools/services/ShowToolsService'
import UpdateToolsService from '@modules/tools/services/UpdateToolsService'
import ListToolsServices from '@modules/tools/services/ListToolsServices'

export default class ToolsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listToolsServices = container.resolve(ListToolsServices)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { tag }: any = request.query

    // const tagFind = tag ? tag.toString() : undefined

    const tools = await listToolsServices.execute({ user_id, tags: tag })

    return response.status(200).json(classToClass(tools))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const { tools_id } = request.params

    const showToolsService = container.resolve(ShowToolsService)

    const tools = await showToolsService.execute({ user_id, tools_id })

    return response.status(200).json(classToClass(tools))
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const { title, link, description, tags } = request.body

    const createToolsService = container.resolve(CreateToolsService)

    const tools = await createToolsService.execute({
      user_id,
      title,
      link,
      description,
      tags
    })

    return response.status(201).json(classToClass(tools))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const { tools_id } = request.params
    const { title, link, description, tags } = request.body

    const updateToolsService = container.resolve(UpdateToolsService)

    const tools = await updateToolsService.execute({
      user_id,
      tools_id,
      title,
      description,
      link,
      tags
    })

    return response.status(200).json(classToClass(tools))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const { tools_id } = request.params

    const deleteToolsService = container.resolve(DeleteToolsService)

    await deleteToolsService.execute({ user_id, tools_id })

    return response.status(204).send()
  }
}
