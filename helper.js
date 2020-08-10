const execSync = require('child_process').execSync;
function execShellCommand(cmd) {
    return execSync(cmd, { encoding: 'utf-8' })
}


const { validationResult } = require('express-validator');

const errorHandler = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let arr = errors.array();
        let status = 400;
        console.log(errors)
        if (arr.find(x=> x.msg.toLowerCase().includes("not found"))) status = 404
      return res.status(status).json({ errors: arr });
    }
    next()
}




module.exports = {
    execShellCommand,
    errorHandler,
    config: require("./config")
}
