import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import SessionController from '../controllers/SessionController'

const sessionRoutes = Router()
const sessionController = new SessionController()

/**
 * @swagger
 * /session:
 *  post:
 *   tags: ["session"]
 *   summary: Authenticate
 *   description: Route for user authentication and token generation
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *        type: object
 *        properties:
 *          email:
 *            type: String
 *            example: your@email.com
 *          password:
 *            type: String
 *            example: "your-password"
 *   responses:
 *    200:
 *     description: Session Succesfully
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *            user:
 *              type: object
 *              properties:
 *                  id:
 *                    type: string
 *                    example: b5eb5250-54e7-41ff-a419
 *                  name:
 *                    type: string
 *                    example: VUTTR
 *                  email:
 *                    type: string
 *                    example: test@vuttr.com
 *                  created_at:
 *                    type: string
 *                    example: 2021-01-21T17:05:52.765Z
 *                  updated_at:
 *                    type: string
 *                    example: 2021-01-21T17:05:52.765Z
 *            token:
 *              type: string
 *              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTEyMzc5NTgsImV4cCI6MTYxMTMyNDM1OCwic3ViIjoiYjVlYjUyNTAtNTRlNy00MWZmLWE0MTktMDBkNGU5NDdhN2ZiIn0.eO_fZlANPPlfOvmkhOkWpKG04HoWOYnKWc3Eju7j-Ug"
 *    401:
 *     description: Incorrect email/password combination
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: Incorrect email/password combination
 */
sessionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  sessionController.store
)

export default sessionRoutes
