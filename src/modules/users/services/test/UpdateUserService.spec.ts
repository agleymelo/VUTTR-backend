import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import AppError from '@shared/error/AppError'

import CreateUserService from '../CreateUserServices'
import UpdateUserService from '../UpdateUserService'

describe('UpdateUserService', () => {
  let fakeUserRepository: FakeUserRepository
  let fakeHashProvider: FakeHashProvider

  let createUserService: CreateUserService
  let updateUserService: UpdateUserService

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    updateUserService = new UpdateUserService(fakeUserRepository, fakeHashProvider)
  })

  it('should be able to update user already exist', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    const userUpdate = await updateUserService.execute({
      user_id: user.id,
      name: 'VUTTR has Updated',
      email: 'testhasemailupdated@vuttr.com'
    })

    expect(userUpdate.name).toBe('VUTTR has Updated')
    expect(userUpdate.email).toBe('testhasemailupdated@vuttr.com')
  })

  it('should not be able update the user if the is not found', async () => {
    await expect(
      updateUserService.execute({
        user_id: '112233',
        name: 'VUTTR has Updated',
        email: 'test@vuttr.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change to another user email', async () => {
    await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'testupdateUserNoOriginal@vuttr.com',
      password: '123456'
    })

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'VUTTR has Updated',
        email: 'test@vuttr.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change the password without entering the old password', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'VUTTR',
        email: 'bossaboxupdate@vuttr.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change the password if the old password is entered incorrectly', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'VUTTR',
        email: 'testupdate@vuttr.com',
        old_password: '123456-incorrect',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to change the old password for the new password if everything is correct', async () => {
    const user = await createUserService.execute({
      name: 'VUTTR',
      email: 'test@vuttr.com',
      password: '123456'
    })

    await updateUserService.execute({
      user_id: user.id,
      name: 'VUTTR',
      email: 'vutrrupdate@vuttr.com',
      old_password: '123456',
      password: '123456-new-password'
    })

    expect(user).toMatchObject({
      name: 'VUTTR',
      email: 'vutrrupdate@vuttr.com',
      password: '123456-new-password'
    })
  })
})
