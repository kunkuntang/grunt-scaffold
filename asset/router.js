var path = require('path')
var fs = require('fs')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function getHTML(page, subPage) {
    var viewDir = resolve('src')
    var htmlPath = path.join(viewDir, page)

    if (subPage) {
        try {
            var stat = fs.statSync(htmlPath)
            if (stat && stat.isDirectory()) {
                htmlPath = path.join(htmlPath, subPage)
            }
        } catch (error) {
            return 'cannot find such ' + page + ' folder in src!!'
        }
    }

    if (htmlPath.indexOf('.') === -1 && htmlPath.split('.')[1] !== 'html') {
        htmlPath += '.html'
    }
    console.log('file request: ' + htmlPath)
    try {
        var stat = fs.statSync(htmlPath)
        if (stat && stat.isFile()) {
            return fs.readFileSync(htmlPath, { encoding: 'utf-8' })
        }
    } catch (error) {
        return 'cannot find such html file of your request!!'
    }

    return 'some thing other errors occured!!'
}

module.exports = function (app) {

    app.get('/', function (req, res) {
        var page = req.params.page;
        var subPage = req.params.subPage;

        var html = getHTML('index', null)

        res.send(html)
    })

    app.get('/:page', function (req, res) {
        var page = req.params.page;
        var subPage = req.params.subPage;

        var html = getHTML(page, null)

        res.send(html)
    })

    app.get('/:page/:subPage', function (req, res) {
        var page = req.params.page;
        var subPage = req.params.subPage;
        var html = getHTML(page, subPage)

        res.send(html)
    })
}
