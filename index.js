// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' })
})

// task api
app.get('/api/:date', (req, res) => {
	const { date } = req.params
	const dateCheck = new Date(date)
	if (dateCheck == 'Invalid Date') {
		res.set({ 'Content-Type': 'application/json' }).json({ error: 'Invalid Date' })
  }else{

    if (date.search('-') != -1) {
      const dateUTC = new Date(date)
			const unixDate = Math.floor(dateUTC.getTime() / 1000)
			res
      .set({
					'Content-Type': 'application/json',
				})
				.json({
					unix: unixDate,
					utc: dateUTC.toUTCString(),
				})
		} else {
      const dateUNIX = new Date(date * 1000)
			const dateUTC = dateUNIX.toUTCString()
			res
      .set({
        'Content-Type': 'application/json',
      })
      .json({
        unix: date,
        utc: dateUTC,
      })
    }
		}
})

// empty date endpoint
app.get("/api",(req,res)=>{
  const currentDate = new Date();
  const currentDateUNIX = Math.floor(currentDate.getTime() / 1000) 
  res
      .set({
					'Content-Type': 'application/json',
				})
				.json({
					unix: currentDateUNIX,
					utc: currentDate.toUTCString(),
				})
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port)
})
