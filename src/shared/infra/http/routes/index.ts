import { Router } from 'express'

import toolsRoutes from '@modules/tools/infra/http/routes/tools.routes'
import sessionRoutes from '@modules/users/infra/http/routes/session.routes'
import userRoutes from '@modules/users/infra/http/routes/user.routes'

const routes = Router()

routes.use('/session', sessionRoutes)

routes.use('/users', userRoutes)

routes.use('/tools', toolsRoutes)

export default routes
