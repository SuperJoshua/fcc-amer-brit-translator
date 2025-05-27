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
// Why four dictionaries instead of two? Why aren't they mirrored -- because they're not one-to-one?
//    I'm using custom dictionaries; I didn't mirrored them.

const a2bdict = require("./a2bdict.js")
const b2adict = require("./b2adict.js")

let dict = {}

function translate(text, locale) {
   let translation = ''

   switch (locale) {
      case "american-to-british": {
         dict = a2bdict
         // replace time and title
         translation = text.replaceAll(/\b(\d{1,2}):(\d{1,2})\b/g, `<span class="highlight">$1.$2</span>`)
         translation = translation.replaceAll(/\b[DMP][a-z]+\./g, replacer)
         break
      }
      case "british-to-american": {
         dict = b2adict
         // replace time and title
         translation = text.replaceAll(/\b(\d{1,2}).(\d{1,2})\b/g, `<span class="highlight">$1:$2</span>`)
         break
      }
      default: {
         // this shouldn't be reachable
         throw new Error("invalid locale request somehow made it into translate")
      }
   }

   // This only worked for one word matches. I couldn't figure out how to get regular expressions to do what I wanted. So I went with something that I understood better -- arrays.
   // translation = translation.replaceAll(/\b\w+\b/gi, replacer)
   
   // Yes, this is a principle example of something that could be refactored. But I'm not enjoying this task, and I'm not getting paid for it.
   const raw_arr = translation.split(' ')
   const new_arr = []
   for (let i = 0; i < raw_arr.length; i += 1) {
      let el = raw_arr[i]
      let punct = [',', '.'].includes(el.at(-1)) ? el.at(-1) : ''
      el = punct ? el.slice(0, -1) : el

      if (dict[el.toLowerCase()]) {
         new_arr.push(`<span class="highlight">${dict[el.toLowerCase()]}</span>${punct}`)
      }
      else if (!punct && i < raw_arr.length - 1) {
         let two_el = `${el} ${raw_arr[i + 1]}`
         punct = [',', '.'].includes(two_el.at(-1)) ? two_el.at(-1) : ''
         two_el = punct ? two_el.slice(0, -1) : two_el

         if (dict[two_el.toLowerCase()]) {
            new_arr.push(`<span class="highlight">${dict[two_el.toLowerCase()]}</span>${punct}`)
            i += 1
         }
         else if (!punct && i < raw_arr.length - 2) {
            let three_el = `${two_el} ${raw_arr[i + 2]}`
            punct = [',', '.'].includes(three_el.at(-1)) ? three_el.at(-1) : ''
            three_el = punct ? three_el.slice(0, -1) : three_el

            if (dict[three_el.toLowerCase()]) {
               new_arr.push(`<span class="highlight">${dict[three_el.toLowerCase()]}</span>${punct}`)
               i += 2
            }
            else {
               new_arr.push(el)
            }
         }
         else {
            new_arr.push(el)
         }
      }
      else {
         new_arr.push(`${el}${punct}`)
      }
   }
   translation = new_arr.join(' ')

   if (text === translation) {translation = "Everything looks good to me!"}
   
   return {text, translation}
}

function replacer(string) {
   if (dict[string.toLowerCase()]) {return `<span class="highlight">${dict[string.toLowerCase()]}</span>`}
   else {return string}
}

module.exports = translate