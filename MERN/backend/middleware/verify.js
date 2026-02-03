exports.verifyUser = (req, res, next) => {
    const verify = req.session.user
    // res.json(verify)
    if(!verify){
        return res.json({
            success: false,
            message: "User not auntenticate"
        })
    }
    next()
};
