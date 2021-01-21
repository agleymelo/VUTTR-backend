import { v4 as uuid } from 'uuid'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import User from '@modules/users/infra/typeorm/entities/User'

import IUserRepository from '../IUserRepository'

export default class FakeUserRepository implements IUserRepository {
  private user: User[] = []

  public async findById(id: string): Promise<User | undefined> {
    const user = this.user.find(findUser => findUser.id === id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.user.find(findUser => findUser.email === email)

    return user
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid() }, data)

    this.user.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.user.findIndex(userIndex => userIndex.id === user.id)

    this.user[findIndex] = user

    return user
  }

  public async delete(user_id: string): Promise<void> {
    const findUser = this.user.findIndex(userIndex => userIndex.id === user_id)

    this.user.splice(findUser, 1)
  }
}
