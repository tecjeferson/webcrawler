const request = require('request')
const cheerio = require('cheerio')



const crawler = (site, mainTag, firstTag, secondTag, arquivo) => {
    return (
        request(site, function (err, res, body) {
            if (err) console.log('Error: ' + err)

            const $ = cheerio.load(body);

            $(mainTag).each(function list() {
                const first = $(this).find(firstTag).text().trim()
                const second = $(this).find(secondTag).text().trim()

                //console.log(first)



            })
        })


    )
}

crawler('https://www.oantagonista.com', '.container-post-home', 'h2', 'p', 'noticiasOanta.txt')

module.exports = {
    crawler
}