module.exports = {
    index: (req, res) => {
        // rendering from the default folder
        res.render('default/index')
    },
    loginGet: (req, res) => {
        // rendering from the default folder login file
        res.render('default/login')
    },
    loginPost: (req, res) => {
        // rendering from the default folder 
        res.send('submited a form')
    },
    registerGet: (req, res) => {
        // rendering from the default folder register file
        res.render('default/register')

    },
    registerPost: (req, res) => {
        res.send('submited a register form')
    }
}