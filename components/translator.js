;"use strict"

/*
const americanOnly = require("./american-only.js")
const americanToBritishSpelling = require("./american-to-british-spelling.js")
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require("./british-only.js")

class Translator {

}

module.exports = Translator
*/

// Why am I expected to use a class instead of a function?
//    I'm using a function.
// Why four dictionaries instead of two? Why aren't they mirrored?
//    I'm using custom dictionaries, but I didn't mirrored them.

const a2bdict = require("./a2bdict.js")
const b2adict = require("./b2adict.js")

let dict = {}

function translate(text, locale) {
   switch (locale) {
      case "american-to-british": {
         dict = a2bdict
         // replace time
         break
      }
      case "british-to-american": {
         dict = b2adict
         // replace time
         break
      }
      default: {
         // this shouldn't be reachable
         throw new Error("invalid locale request somehow made it into translate")
      }
   }

   // Uncertain how to go about this. The dictionaries have replacements up to three words in length and include hyphens and periods. Make an unweildly regular expression and try to get everything in one go? Maybe three passes looking for 1, 2, and 3-word matches? Plus there are the titles and times to deal with. 
   let translation = text.replaceAll(/\b[a-z.-]+/gi, replacer)
   
   if (text === translation) {translation = "Everything looks good to me!"}
   
   return {text, translation}
}

function replacer(string) {
   if (dict[string].toLowerCase()) {return `<span class="highlight">${dict[string]}</span>`}
   else {return string}
}

module.exports = translate