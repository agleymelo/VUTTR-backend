import { injectable, inject } from 'tsyringe'

import AppError from '@shared/error/AppError'

import IUserRepository from '../repositories/IUserRepository'

type IRequest = {
  user_id: string
}

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found!')
    }

    await this.userRepository.delete(user_id)
  }
}
