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
//    I'm using custom dictionaries; I didn't mirror them.

const a2bdict = require("./a2bdict.js")
const b2adict = require("./b2adict.js")

let dict = {}

function translate(text, locale) {
   let translation = ''

   switch (locale) {
      case "american-to-british": {
         dict = a2bdict
         // Replace time and title. This is a hack.
         translation = text.replaceAll(/\b(\d{1,2}):(\d{1,2})\b/g, `<span class="highlight">$1.$2</span>`)
         translation = translation.replaceAll(/\b[DMP][a-z]+\./g, replacer)
         break
      }
      case "british-to-american": {
         dict = b2adict
         // Replace time and title. This is also a hack.
         translation = text.replaceAll(/\b(\d{1,2}).(\d{1,2})\b/g, `<span class="highlight">$1:$2</span>`)
         break
      }
      default: {
         // This shouldn't be reachable.
         throw new Error("invalid locale request somehow made it into translate")
      }
   }

   // This only worked for one word matches. I couldn't figure out how to get regular expressions to do what I wanted. So I went with something that I understood better -- arrays.
   // translation = translation.replaceAll(/\b\w+\b/gi, replacer)
   
   // This is a hack, and certainly should be refactored. But I'm not enjoying this task, and I'm not getting paid for it.
   const raw_arr = translation.split(' ')
   const new_arr = []
   for (let i = 0; i < raw_arr.length; i += 1) {
      let one_el = raw_arr[i]
      let two_el = i < raw_arr.length - 1 ? `${one_el} ${raw_arr[i + 1]}` : ''
      let three_el = i < raw_arr.length - 2 ? `${two_el} ${raw_arr[i + 2]}` : ''

      let skip = false

      if (three_el) {
         do_three()
      }
      else if (two_el && !skip) {
         do_two()
      }
      else if (!skip) {
         do_one()
      }
      else {throw new Error("Something is wrong with the logic.")}

      function do_three() {
         const re_three = /\b\w+ \w+ \w+\b/
         if ((three_el.match(re_three)) !== null) {
            const result = three_el.replace(re_three, replacer)
            if (result !== three_el) {
               new_arr.push(result)
               i += 2
               skip = true
            }
            else {do_two()}
         }
         else {do_two()}
      }

      function do_two() {
         const re_two = /\b\w+ \w+\b/
         if ((two_el.match(re_two)) !== null) {
            const result = two_el.replace(re_two, replacer)
            if (result !== two_el) {
               new_arr.push(result)
               i += 1
               skip = true
            }
            else {do_one()}
         }
         else {do_one()}
      }

      function do_one(){
         const re_one = /\b\w+\b/
         if ((one_el.match(re_one)) !== null) {
            new_arr.push(one_el.replace(re_one, replacer))
         }
         else {new_arr.push(one_el)}
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