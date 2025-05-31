import { Hono } from 'hono'
import pingRoute from './modules/ping'
import niktoRoute from './modules/nikto'
import nmapRoute from './modules/nmap'
import host from './modules/host'
import subfinder from './modules/subfinder';

import { cors } from 'hono/cors'

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
app.use('*', cors())
// nikto.save();
app.route('/ping', pingRoute)
app.route('/nikto', niktoRoute)
app.route('/nmap', nmapRoute)
app.route('/host', host)
app.route('/subfinder', subfinder)
app.get('/ai/:ip', async (c) => {
  // ambil input slug 
  const { ip } = c.req.param()
  // baca file data/host/{ip}/resume.txt
  const fs = require('fs');
  const resumeFilePath = `data/${ip}/resume.txt`;
  if (!fs.existsSync(resumeFilePath)) {
    return c.json({
      status: 404,
      message: 'Resume file not found'
    })
  }
  const resume = fs.readFileSync(resumeFilePath, 'utf8');
  return c.json({
    status: 200,
    message: 'Success get resume',
    data: resume
  })
})

export default app;