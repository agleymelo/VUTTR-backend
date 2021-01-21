import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import AppError from '@shared/error/AppError'

import CreateUserService from '../CreateUserServices'
import DeleteUserService from '../DeleteUserServiec'

describe('DeleteUserService', () => {
  let fakeUserRepository: FakeUserRepository
  let fakeHashProvider: FakeHashProvider

  let createUserService: CreateUserService
  let deleteUserService: DeleteUserService

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    deleteUserService = new DeleteUserService(fakeUserRepository)
  })

  it('should be able to delete user', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'deleteuser@vuttr.com',
      password: '123456'
    })

    const deleteUser = await deleteUserService.execute({
      user_id: user.id
    })

    expect(deleteUser).toBeUndefined()
  })

  it('should not be able to see the user if he does not exist', async () => {
    await expect(
      deleteUserService.execute({
        user_id: '1223344'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
