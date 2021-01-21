import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/error/AppError'

import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUserRepository from '../repositories/IUserRepository'

type IRequest = {
  name: string
  email: string
  password: string
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const findUser = await this.userRepository.findByEmail(email)

    if (findUser) {
      throw new AppError('User already exist', 400)
    }

    const hasMatchPassword = await this.hashProvider.generateHash(password)

    const user = await this.userRepository.create({
      name,
      email,
      password: hasMatchPassword
    })

    return user
  }
}
