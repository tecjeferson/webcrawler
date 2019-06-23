const express = require('express')
const app = express()
const path = require('path')
const crawler = require('./lib/crawler')
// const request = require('request')
// const cheerio = require('cheerio')

//crawler.pegarDados('https://www.oantagonista.com', '.container-post-home', 'h2', 'p')

// console.log(crawler {
//     firstTag
// })

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')

})

app.get('/result', async (req, res) => {
    const {
        site,
        MainClass,
        FirstTag,
        SecondTag
    } = req.query
    const result = await crawler(site, MainClass, FirstTag, SecondTag)
    res.render('result', {
        result
    })
})



app.listen(port, err => {
    if (err) {
        console.log("The server could not starts")
    } else {
        console.log("Server is running...")
    }
})