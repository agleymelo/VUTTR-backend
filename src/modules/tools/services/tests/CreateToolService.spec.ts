import FakeToolsRepository from '@modules/tools/repositories/fakes/FakeToolsRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import CreateUserService from '@modules/users/services/CreateUserServices'
import AppError from '@shared/error/AppError'

import CreateToolsService from '../CreateToolsService'

describe('CreateToolService', () => {
  let fakeUserRepository: FakeUserRepository
  let fakeHashRepository: FakeHashProvider

  let fakeToolsRepository: FakeToolsRepository

  let createUserService: CreateUserService
  let createToolsService: CreateToolsService

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashRepository = new FakeHashProvider()

    fakeToolsRepository = new FakeToolsRepository()

    createUserService = new CreateUserService(fakeUserRepository, fakeHashRepository)
    createToolsService = new CreateToolsService(fakeUserRepository, fakeToolsRepository)
  })

  it('should be able create tools', async () => {
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

    expect(tools).toEqual(tools)
  })

  it('should not be able to create a tools if the user not exist', async () => {
    await expect(
      createToolsService.execute({
        user_id: 'dsaodsadsakodpasdi129e0dasdadiadiaudaiduaiodaudioaudaoiu131937193701939dasd',
        title: 'json-server',
        link: 'https://github.com/typicode/json-server',
        description:
          'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
        tags: ['api', 'json', 'schema', 'node', 'github', 'rest']
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a tool with the same name that already exists', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    // await createToolsService.execute({
    //   user_id: user.id,
    //   title: 'Notion',
    //   link: 'https://notion.so',
    //   description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
    //   tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar']
    // })

    await createToolsService.execute({
      user_id: user.id,
      title: 'json-server',
      link: 'https://github.com/typicode/json-server',
      description:
        'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
      tags: ['api', 'json', 'schema', 'node', 'github', 'rest']
    })

    await expect(
      createToolsService.execute({
        user_id: user.id,
        title: 'json-server',
        link: 'https://github.com/typicode/json-server',
        description:
          'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
        tags: ['api', 'json', 'schema', 'node', 'github', 'rest']
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
