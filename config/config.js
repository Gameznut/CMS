module.exports = {
    MONGODBURI : 'mongodb://localhost:27017/CMS',
    PORT: process.env.PORT || 3000,
    globalVariable: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');        
        
        next();
    }
}