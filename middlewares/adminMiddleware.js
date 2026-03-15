module.exports.isAdmin = (req, res, next) => {
    if(req.user.admin) {
        next()
    } else {
        res.status(401).json({ message: 'You do not have admin privileges'})
    }
}