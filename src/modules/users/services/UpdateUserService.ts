import { injectable, inject } from 'tsyringe'

import AppError from '@shared/error/AppError'

import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUserRepository from '../repositories/IUserRepository'

type IRequest = {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ user_id, name, email, old_password, password }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Already have a user with this email')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError('You need to informed the old password to set a new password')
    }

    if (password && old_password) {
      const checkPassword = await this.hashProvider.compareHash(old_password, user.password)

      if (!checkPassword) {
        throw new AppError('Old Password does not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    await this.userRepository.save(user)

    return user
  }
}
