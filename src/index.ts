import { Hono } from 'hono'
import pingRoute from './modules/ping'
import niktoRoute from './modules/nikto'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// const nikto = new Nikto({
//   description: "description",
//   uri: "uri",
//   namelink: "namelink",
//   iplink: "iplink"
// });

// nikto.save();

app.route('/ping', pingRoute)
app.route('/nikto', niktoRoute)

export default app;