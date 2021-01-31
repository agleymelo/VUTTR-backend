import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate'

import ToolsController from '../controllers/ToolsController'

const toolsRoutes = Router()
const toolsController = new ToolsController()

toolsRoutes.use(ensureAuthenticate)

/**
 * @swagger
 * paths:
 *  /tools:
 *   get:
 *    tags: ["tools"]
 *    security:
 *      - bearerAuth: []
 *    summary: List tools
 *    parameters:
 *       - in: query
 *         name: tag
 *         schema:
 *          type: string
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *    responses:
 *     200:
 *      description: List tools
 *      content:
 *       application/json:
 *         schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *                id:
 *                  type: string
 *                  example: b5eb5250-54e7-41ff-a419
 *                title:
 *                  type: string
 *                  example: notion
 *                link:
 *                  type: string
 *                  example: https://notion.so
 *                description:
 *                  type: string
 *                  example: All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.
 *                tags:
 *                  type: array
 *                  example: [organization, planning]
 *                created_at:
 *                  type: string
 *                  example: 2021-01-21T17:05:52.765Z
 *                updated_at:
 *                  type: string
 *                  example: 2021-01-21T17:05:52.765Z
 *     401:
 *      description: JWT Token is missing
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: JWT Token is missing
 */
toolsRoutes.get('/', toolsController.index)

/**
 * @swagger
 * paths:
 *  /tools:
 *   post:
 *    tags: ["tools"]
 *    security:
 *      - bearerAuth: []
 *    summary: Create a new Tools
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *           title:
 *             type: String
 *             example: Tool name
 *           link:
 *             type: String
 *             example: link
 *           description:
 *             type: String
 *             example: Description
 *           tags:
 *             type: array
 *             example: ["tag1", "tag2"]
 *    responses:
 *     200:
 *      description: Create tool
 *      content:
 *       application/json:
 *         schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *                id:
 *                  type: string
 *                  example: b5eb5250-54e7-41ff-a419
 *                title:
 *                  type: string
 *                  example: notion
 *                link:
 *                  type: string
 *                  example: https://notion.so
 *                description:
 *                  type: string
 *                  example: All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.
 *                tags:
 *                  type: array
 *                  example: [organization, planning]
 *                created_at:
 *                  type: string
 *                  example: 2021-01-21T17:05:52.765Z
 *                updated_at:
 *                  type: string
 *                  example: 2021-01-21T17:05:52.765Z
 *     401:
 *      description: JWT Token is missing
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: JWT Token is missing
 *     400:
 *      description: Title already exists
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: title already exists
 */
toolsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      link: Joi.string().required(),
      description: Joi.string().required(),
      tags: Joi.array().items(Joi.string())
    }
  }),
  toolsController.store
)

/**
 * @swagger
 * paths:
 *  /tools/${tool_id}:
 *   put:
 *    tags: ["tools"]
 *    security:
 *      - bearerAuth: []
 *    summary: Update Tool
 *    parameters:
 *       - name: tool_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *           title:
 *             type: String
 *             example: Tool name
 *           link:
 *             type: String
 *             example: link
 *           description:
 *             type: String
 *             example: Description
 *           tags:
 *             type: array
 *             example: ["tag1", "tag2"]
 *    responses:
 *     200:
 *      description: Update tool
 *      content:
 *       application/json:
 *         schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *                id:
 *                  type: string
 *                  example: b5eb5250-54e7-41ff-a419
 *                title:
 *                  type: string
 *                  example: notion
 *                link:
 *                  type: string
 *                  example: https://notion.so
 *                description:
 *                  type: string
 *                  example: All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.
 *                tags:
 *                  type: array
 *                  example: [organization, planning]
 *                created_at:
 *                  type: string
 *                  example: 2021-01-21T17:05:52.765Z
 *                updated_at:
 *                  type: string
 *                  example: 2021-01-21T17:05:52.765Z
 *     401:
 *      description: JWT Token is missing
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: JWT Token is missing
 *     400:
 *      description: Title already exists
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: title already exists
 */

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

/**
 * @swagger
 * paths:
 *  /tools/${tool_id}:
 *   delete:
 *    tags: ["tools"]
 *    security:
 *      - bearerAuth: []
 *    summary: Delete Tool
 *    parameters:
 *       - name: tool_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *    responses:
 *     204:
 *      description: List tools
 *      content:
 *       application/json:
 *     401:
 *      description: JWT Token is missing
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: JWT Token is missing
 *     400:
 *      description: Title already exists
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: title already exists
 */
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
