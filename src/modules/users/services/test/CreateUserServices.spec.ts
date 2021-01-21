import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import AppError from '@shared/error/AppError'

import CreateUserService from '../CreateUserServices'

describe('CreateUsersService', () => {
  let fakeUserRepository: FakeUserRepository
  let fakeHashProvider: FakeHashProvider

  let createUserService: CreateUserService

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
  })

  it('should be able create new User', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('VUTTR')
    expect(user.email).toBe('test@vuttr.com')
    expect(user.password).toStrictEqual(expect.anything())
  })

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'VUTTR',
      email: 'test-email-duplicated@vuttr.com',
      password: '123456'
    })

    await expect(
      createUserService.execute({
        name: 'VUTTR',
        email: 'test-email-duplicated@vuttr.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
