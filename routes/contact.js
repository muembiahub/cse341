const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Contact Page');
})

module.exports = router;