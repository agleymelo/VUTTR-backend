import FakeToolsRepository from '@modules/tools/repositories/fakes/FakeToolsRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import CreateUserService from '@modules/users/services/CreateUserServices'

import CreateToolsService from '../CreateToolsService'
import ListToolsServices from '../ListToolsServices'

describe('ListToolServices', () => {
  let fakeUserRepository: FakeUserRepository
  let fakeHashProvider: FakeHashProvider

  let fakeToolsService: FakeToolsRepository

  let createUserService: CreateUserService
  let createToolsService: CreateToolsService
  let listToolsServices: ListToolsServices

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    fakeToolsService = new FakeToolsRepository()

    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    createToolsService = new CreateToolsService(fakeUserRepository, fakeToolsService)
    listToolsServices = new ListToolsServices(fakeToolsService)
  })

  it('should be able to list tools', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    await createToolsService.execute({
      user_id: user.id,
      title: 'Notion',
      link: 'https://notion.so',
      description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
      tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar']
    })

    await createToolsService.execute({
      user_id: user.id,
      title: 'json-server',
      link: 'https://github.com/typicode/json-server',
      description:
        'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
      tags: ['api', 'json', 'schema', 'node', 'github', 'rest', 'calendar']
    })

    const listTools = await listToolsServices.execute({
      user_id: user.id,
      tags: ''
    })

    // eslint-disable-next-line no-unused-expressions
    expect(listTools).toHaveReturned
  })

  it('should be able to list tools with tag filter', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    await createToolsService.execute({
      user_id: user.id,
      title: 'Notion',
      link: 'https://notion.so',
      description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
      tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar']
    })

    await createToolsService.execute({
      user_id: user.id,
      title: 'json-server',
      link: 'https://github.com/typicode/json-server',
      description:
        'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
      tags: ['api', 'json', 'schema', 'node', 'github', 'rest', 'calendar']
    })

    const tag = 'calendar'

    const searchTools = await listToolsServices.execute({
      user_id: user.id,
      tags: tag
    })

    const checkExist = searchTools ? [...searchTools] : []

    const searhIndex = checkExist.findIndex(search => search)

    // console.log(checkExist)
    // console.log(searchTools)

    expect(checkExist[searhIndex].tags).toContain('calendar')
  })
})
