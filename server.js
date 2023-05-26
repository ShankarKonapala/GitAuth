const express = require('express')
const dbConnect = require('./dbConnect')
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const port = process.env.port;

require('dotenv').config({path: '.env'});

app.use(cors());

app.use(express.json())


app.use('/api/users/',userRoute)


const axios = require('axios')

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '<e9ed2ec137eb58df2686>'
const clientSecret = '<85f57b9bf6ee61878df79d9e3e85aaf3b01bf21f>'


// Declare the redirect route
app.get('/home', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
    
  }).then((response) => {
    
    const accessToken = response.data.access_token
    console.log(response.data)
    
    // redirect the user to the home page, along with the access token
    res.redirect(`/home.html?access_token=${accessToken}`)
  })
})

app.use(express.static(__dirname + '/public'))



























app.get('/', (req, res)=> res.send('Hello World'))
app.listen(port,() => console.log(`Node JS server is started at ${port}!`));