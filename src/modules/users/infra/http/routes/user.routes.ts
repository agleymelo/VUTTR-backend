import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import UserController from '../controllers/UserController'
import ensureAuthenticate from '../middlewares/ensureAuthenticate'

const userRoutes = Router()
const userController = new UserController()

/**
 * @swagger
 * paths:
 *  /users:
 *   post:
 *    tags: ["users"]
 *    summary: Create a New User
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             example: Your Full Name
 *           email:
 *             type: string
 *             example: your@email.com
 *           password:
 *             type: string
 *             example: your-password
 *    responses:
 *     200:
 *      description: Create a new User
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *             id:
 *              type: string
 *              example: b5eb5250-54e7-41ff-a419
 *             name:
 *              type: string
 *              example: VUTTR
 *             email:
 *              type: string
 *              example: test@vuttr.com
 *             created_at:
 *              type: string
 *              example: 2021-01-21T17:05:52.765Z
 *             updated_at:
 *              type: string
 *              example: 2021-01-21T17:05:52.765Z
 *     401:
 *      description: User already exist
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: User already exist
 */
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

/**
 * @swagger
 * paths:
 *  /users:
 *   put:
 *    tags: ["users"]
 *    security:
 *      - bearerAuth: []
 *    summary: Update User
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *           name:
 *             type: String
 *             example: Your Full Name
 *           email:
 *             type: String
 *             example: your@email.com
 *           old_password:
 *             type: String
 *             example: "old_password"
 *           password:
 *             type: String
 *             example: "new-password"
 *    responses:
 *     200:
 *      description: Create a new User
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *             id:
 *              type: string
 *              example: b5eb5250-54e7-41ff-a419
 *             name:
 *              type: string
 *              example: VUTTR
 *             email:
 *              type: string
 *              example: test@vuttr.com
 *             created_at:
 *              type: string
 *              example: 2021-01-21T17:05:52.765Z
 *             updated_at:
 *              type: string
 *              example: 2021-01-21T17:05:52.765Z
 *     400:
 *      description: JWT Token is missing
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: JWT Token is missing
 *     401:
 *      description: User not found
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: User not found
 */

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

/**
 * @swagger
 * paths:
 *  /users:
 *   delete:
 *    tags: ["users"]
 *    security:
 *      - bearerAuth: []
 *    summary: Update User
 *    requestBody:
 *     content:
 *      application/json:
 *    responses:
 *     204:
 *      description: Delete User
 *     400:
 *      description: JWT Token is missing
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: JWT Token is missing
 *     401:
 *      description: You need to informed the old password to set a new password
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: User not found
 */

userRoutes.delete('/', userController.delete)

export default userRoutes
