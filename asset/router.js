var path = require('path')
var fs = require('fs')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function getHTML(page, subPage) {
    var viewDir = resolve('src')
    var path = viewDir + page
    console.log(path)

    if (fs.stat(path).isDirectory()) {
        path = viewDir + subPage
    }

    fs.readFileSync(path, function (data) {
        console.log('html content', data)
        return data
    })
}

module.exports = function (app) {

    app.get('/:page/:subPage', function (req, res) {
        var page = req.params.page;
        var subPage = req.params.subPage;
        console.log(page)
        console.log(subPage)
        var html = getHTML(page, subPage)

        res.send(html)
    })
}