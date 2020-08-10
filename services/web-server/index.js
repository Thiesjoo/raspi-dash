const fs = require('fs')
const router = require('express').Router();

router.get('/', (req, res, next) => {
  try {
    let path = process.cwd() + '/public/index.html';
    if (fs.existsSync(path)) {
      res.sendFile(path)
    } else {
      next("File not found")
    }
  } catch (err) {
    next(err)
  }
});

module.exports = router;
