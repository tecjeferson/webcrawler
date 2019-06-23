const cheerio = require('cheerio') //manipular a estrutura de dados resultante
const request = require('request') //fazer chamadas http

const getBody = site => new Promise((resolve, reject) => {
    request(site, function (error, response, body) {
        if (error) {
            reject(err)
        } else {
            resolve(body)
        }
    })
})

module.exports = async (site, mainTag, firstTag, secondTag) => {
    const arrayResult = new Array()
    try {
        const body = await getBody(site)
        const $ = cheerio.load(body)

        $(mainTag).map(function (value, label) {
            const first = $(this).find(firstTag).text().trim()
            const second = $(this).find(secondTag).text().trim()
            arrayResult.push({
                first,
                second
            })
        })
        return arrayResult
    } catch (e) {
        return e
    }
}

//crawler('https://www.oantagonista.com', '.container-post-home', 'h2', 'p')