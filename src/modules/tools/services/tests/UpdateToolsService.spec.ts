import FakeToolsRepository from '@modules/tools/repositories/fakes/FakeToolsRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import CreateUserService from '@modules/users/services/CreateUserServices'
import AppError from '@shared/error/AppError'

import CreateToolsService from '../CreateToolsService'
import UpdateToolsService from '../UpdateToolsService'

describe('UpdateToolsService', () => {
  let fakeUserRepository: FakeUserRepository
  let fakeHashRepository: FakeHashProvider

  let fakeToolsRepository: FakeToolsRepository

  let createUserService: CreateUserService
  let createToolsService: CreateToolsService

  let updateToolsService: UpdateToolsService

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashRepository = new FakeHashProvider()

    fakeToolsRepository = new FakeToolsRepository()

    createUserService = new CreateUserService(fakeUserRepository, fakeHashRepository)
    createToolsService = new CreateToolsService(fakeUserRepository, fakeToolsRepository)
    updateToolsService = new UpdateToolsService(fakeUserRepository, fakeToolsRepository)
  })

  it('should be able to updated existing tools', async () => {
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

    const updated = await updateToolsService.execute({
      user_id: user.id,
      tools_id: tools.id,
      title: 'Notion Has Updated',
      link: 'https://notion.so',
      description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
      tags: ['organization', 'planning']
    })

    expect(tools).toEqual(updated)
  })

  it('should not be able to show a tool if the user not exist', async () => {
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

    await expect(
      updateToolsService.execute({
        user_id: 'user-not-found',
        tools_id: tools.id,
        title: 'Notion Has Updated',
        link: 'https://notion.so',
        description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
        tags: ['organization', 'planning']
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change a tool it does not belong to the user who created it', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    await expect(
      updateToolsService.execute({
        user_id: user.id,
        tools_id: 'tools-not-found',
        title: 'Notion Has Updated',
        link: 'https://notion.so',
        description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
        tags: ['organization', 'planning']
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change a tool if its id does not belong to the creative user', async () => {
    const user_one = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    const user_two = await createUserService.execute({
      name: 'VUTTR Tools 2',
      email: 'VUTTRTools2@vuttr.com',
      password: 'vuttr-tools'
    })

    const tools_one = await createToolsService.execute({
      user_id: user_one.id,
      title: 'Notion',
      link: 'https://notion.so',
      description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
      tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar']
    })

    await createToolsService.execute({
      user_id: user_two.id,
      title: 'Notion',
      link: 'https://notion.so',
      description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
      tags: ['organization']
    })

    await expect(
      updateToolsService.execute({
        user_id: user_two.id,
        tools_id: tools_one.id,
        title: 'Notion Has Updated',
        link: 'https://notion.so',
        description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
        tags: ['organization', 'planning']
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the tool title to another that already has the same name', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    const tool_one = await createToolsService.execute({
      user_id: user.id,
      title: 'Notion',
      link: 'https://notion.so',
      description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
      tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar']
    })

    const tool_two = await createToolsService.execute({
      user_id: user.id,
      title: 'json-server',
      link: 'https://github.com/typicode/json-server',
      description:
        'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
      tags: ['api', 'json', 'schema', 'node', 'github', 'rest']
    })

    await expect(
      updateToolsService.execute({
        user_id: user.id,
        tools_id: tool_one.id,
        title: 'json-server',
        link: 'https://notion.so',
        description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
        tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar']
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
