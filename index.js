const express = require('express')
const app = express()
const path = require('path')
const crawler = require('./lib/crawler')
const request = require('request')
const cheerio = require('cheerio')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')

})


app.get('/result', (req, res) => {
    const {
        site,
        MainClass,
        FirstTag,
        SecondTag
    } = req.query



    return (
        request(site, function (err, res, body) {
            if (err) console.log('Error: ' + err)

            const $ = cheerio.load(body);

            $(MainClass).each(function list() {
                const first = $(this).find(FirstTag).text().trim()
                const second = $(this).find(SecondTag).text().trim()
                console.log(first)
                if (site && MainClass && FirstTag && SecondTag) {

                    //const crawlerWeb = crawler(endereco, geral, primeiro, segundo)

                    res.render('result', {
                        error: false,
                        first: first,
                        second: second

                    })
                } else {
                    res.render('result', {
                        error: "Erro no crawler"
                    })
                }
                // console.log(this.site,
                //     MainClass,
                //     FirstTag,
                //     SecondTag)
                console.log(first)

            })
            const crawler = crawler(site, MainClass, FirstTag, SecondTag)
        })
    )


})






app.listen(port, err => {
    if (err) {
        console.log("The server could not starts")
    } else {
        console.log("Server is running...")
    }
})