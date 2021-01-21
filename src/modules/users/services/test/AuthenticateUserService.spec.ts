import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import AppError from '@shared/error/AppError'

import AuthenticateUserService from '../AuthenticateUserService'
import CreateUserService from '../CreateUserServices'

describe('AuthenticateUserService', () => {
  let fakeUserRepository: FakeUserRepository
  let fakeHashProvider: FakeHashProvider

  let createUserService: CreateUserService
  let authenticateUserService: AuthenticateUserService

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    authenticateUserService = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
  })

  it('should be able to authenticate', async () => {
    await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    const authenticate = await authenticateUserService.execute({
      email: 'test@vuttr.com',
      password: '123456'
    })

    expect(authenticate).toHaveProperty('token')
    expect(authenticate).toHaveProperty('user')
  })

  it('sshould not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'emailnotexist@vuttr.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    await expect(
      authenticateUserService.execute({
        email: 'test@vuttr.com',
        password: 'password not match'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
