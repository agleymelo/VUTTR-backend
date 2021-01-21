import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate'

import ToolsController from '../controllers/ToolsController'

const toolsRoutes = Router()
const toolsController = new ToolsController()

toolsRoutes.use(ensureAuthenticate)

toolsRoutes.get('/', toolsController.index)

toolsRoutes.get(
  '/:tools_id',
  celebrate({
    [Segments.PARAMS]: {
      tools_id: Joi.string().required()
    }
  }),
  toolsController.show
)

toolsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      link: Joi.string().required(),
      description: Joi.string().required(),
      tags: Joi.array().required()
    }
  }),
  toolsController.store
)

toolsRoutes.put(
  '/:tools_id',
  celebrate({
    [Segments.PARAMS]: {
      tools_id: Joi.string().required()
    },
    [Segments.BODY]: {
      title: Joi.string(),
      link: Joi.string(),
      description: Joi.string(),
      tags: Joi.array()
    }
  }),
  toolsController.update
)

toolsRoutes.delete(
  '/:tools_id',
  celebrate({
    [Segments.PARAMS]: {
      tools_id: Joi.string().required()
    }
  }),
  toolsController.delete
)

export default toolsRoutes
