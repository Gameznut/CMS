module.exports = {
    index: (req, res) => {
        // rendering from the default folder
        res.render('default/index')
    },
    loginGet: (req, res) => {
        // rendering from the default folder
        res.render('default/login')
    },
    loginPost: (req, res) => {
        // rendering from the default folder
        res.send('submited a form')
    },
}