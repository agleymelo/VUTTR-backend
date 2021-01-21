import { createConnections } from 'typeorm'

createConnections()
  .then(_ => console.log('Database ON'))
  .catch(err => console.log(err))
