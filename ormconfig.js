 module.exports = {
    "type": process.env.TYPE_DATABASE,
    "url":  process.env.URL_DATABASE,
    "useNewUrlParser": process.env.useNewUrlParser,
    "synchronize": process.env.synchronize,
    "logging": process.env.logging,
    "entities": [process.env.entities]
 }