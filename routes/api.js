"use strict"

// const translator = new Translator()
const translate = require("../components/translator.js")

module.exports = function (app) {
   app.route("/api/translate")
   .post(function(req, res){
      if (!(Object.hasOwn(req.body, "text") && Object.hasOwn(req.body, "locale"))) {
         res.send({"error": "Required field(s) missing"})
      }

      else if (req.body.text === '') {
         res.send({"error": "No text to translate"})
      }

      else if (!(req.body.locale === "american-to-british" || req.body.locale === "british-to-american")) {
         res.send({"error": "Invalid value for locale field"})
      }

      else {
         res.send(translate(req.body.text, req.body.locale))
      }
   })
}
