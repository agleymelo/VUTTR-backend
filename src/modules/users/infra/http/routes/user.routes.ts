import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import UserController from '../controllers/UserController'
import ensureAuthenticate from '../middlewares/ensureAuthenticate'

const userRoutes = Router()
const userController = new UserController()

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  userController.store
)

userRoutes.use(ensureAuthenticate)

userRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      confirmed_password: Joi.string().valid(Joi.ref('password'))
    }
  }),
  userController.update
)

userRoutes.delete(
  '/',

  userController.delete
)

export default userRoutes
