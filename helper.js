// function execShellCommand(cmd) {
//     const exec = require('child_process').exec;
//     return new Promise((resolve, reject) => {
//         exec(cmd, (error, stdout, stderr) => {
//             console.log(stdout)
//             if (error) reject(error)
//             if (!stdout) reject(stderr)
//             resolve(stdout);
//         });
//     });
// }

const execSync = require('child_process').execSync;
function execShellCommand(cmd) {
    return execSync(cmd, { encoding: 'utf-8' })
}

module.exports = {
    execShellCommand
}