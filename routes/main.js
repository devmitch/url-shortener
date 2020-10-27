const express = require('express');
const mappingModel = require('../models/mapping');
const mongoose = require('mongoose');
const crypto = require('crypto-random-string');

let router = express.Router();

router.get('/favicon.ico', (req, res, next) => {
    return res.status(204);
})

router.get('/', (req, res, next) => {
    return res.render('index');
});

router.get('/:id', (req, res, next) => {
    mappingModel.Mapping.findOne({ key: req.params.id }, (err, mappingDoc) => {
        if (err || !mappingDoc) {
            return res.status(500).json({ "error": err });
        }
        return res.redirect(mappingDoc.url);
    });
});

router.post('/shorten', async (req, res, next) => {
    url = req.body.url;
    // prepend http:// or https:// so we dont recursively redirect back to the /:id route
    if (!(url.substring(0, 7) == 'http://' || url.substring(0, 8) == 'https://')) {
        url = 'http://' + url;
    }

    key = crypto({length: 10, type: "alphanumeric"});

    const mappingExists = await mappingModel.Mapping.findOne({ "url": url });
    if (mappingExists != null) { // url already mapped
        return res.status(200).json({ "url": mappingExists.key });
    }

    let newMapping = new mappingModel.Mapping({ "url": url, "key": key });

    newMapping.save((err, mappingDoc) => {
        if (err) { // key collision potentially?
            return res.status(500).json({"error": err});
        }
        res.status(200).json({ "url": mappingDoc.key });
    });
});

module.exports = router;