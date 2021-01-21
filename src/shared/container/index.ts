import { container } from 'tsyringe'

import '@modules/users/providers'

import ToolsRepository from '@modules/tools/infra/typeorm/repositories/ToolsRepository'
import IToolsRepository from '@modules/tools/repositories/IToolsRepository'
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'
import IUserRepository from '@modules/users/repositories/IUserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IToolsRepository>('ToolsRepository', ToolsRepository)
