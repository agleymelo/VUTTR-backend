import FakeToolsRepository from '@modules/tools/repositories/fakes/FakeToolsRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import CreateUserService from '@modules/users/services/CreateUserServices'
import AppError from '@shared/error/AppError'

import CreateToolsService from '../CreateToolsService'
import ShowToolsService from '../ShowToolsService'

describe('ShowToolsService', () => {
  let fakeUserRepository: FakeUserRepository
  let fakeHashProvider: FakeHashProvider

  let fakeToolsService: FakeToolsRepository

  let createUserService: CreateUserService
  let createToolsService: CreateToolsService
  let showToolsService: ShowToolsService

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    fakeToolsService = new FakeToolsRepository()

    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    createToolsService = new CreateToolsService(fakeUserRepository, fakeToolsService)
    showToolsService = new ShowToolsService(fakeUserRepository, fakeToolsService)
  })

  it('should be able to see tool', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    const tools = await createToolsService.execute({
      user_id: user.id,
      title: 'Notion',
      link: 'https://notion.so',
      description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
      tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar']
    })

    const showTool = await showToolsService.execute({
      user_id: user.id,
      tools_id: tools.id
    })

    expect(showTool).toBe(tools)
  })

  it('should not be able to look at a tool that was not found', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'showuservuttr@vuttr.com',
      password: 'bossa-box-api'
    })

    await expect(
      showToolsService.execute({
        user_id: user.id,
        tools_id: '1223344'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to see the user if he does not exist', async () => {
    await expect(
      showToolsService.execute({
        user_id: '1222222',
        tools_id: '1223344'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
