"use strict"

const chai = require("chai")
const assert = chai.assert

const translate = require("../components/translator.js")

suite("Unit Tests", function () {
   test(`Translate "Mangoes are my favorite fruit." to British English`, function () {
      assert.strictEqual(translate("Mangoes are my favorite fruit.", "american-to-british").translation, `Mangoes are my <span class="highlight">favourite</span> fruit.`)
   })
   test(`Translate "I ate yogurt for breakfast." to British English`, function () {
      assert.strictEqual(translate("I ate yogurt for breakfast.", "american-to-british").translation, `I ate <span class="highlight">yoghurt</span> for breakfast.`)
   })
   test(`Translate "We had a party at my friend's condo." to British English`, function () {
      assert.strictEqual(translate("We had a party at my friend's condo.", "american-to-british").translation, `We had a party at my friend's <span class="highlight">flat</span>.`)
   })
   test(`Translate "Can you toss this in the trashcan for me?" to British English`, function () {
      assert.strictEqual(translate("Can you toss this in the trashcan for me?", "american-to-british").translation, `Can you toss this in the <span class="highlight">bin</span> for me?`)
   })
   test(`Translate "The parking lot was full." to British English`, function () {
      assert.strictEqual(translate("The parking lot was full.", "american-to-british").translation, `The <span class="highlight">car park</span> was full.`)
   })
   // Shouldn't the result be "Heath Robinson contraption"?
   test(`Translate "Like a high tech Rube Goldberg machine." to British English`, function () {
      assert.strictEqual(translate("Like a high tech Rube Goldberg machine.", "american-to-british").translation, `Like a high tech <span class="highlight">Heath Robinson device</span>.`)
   })
   test(`Translate "To play hooky means to skip class or work." to British English`, function () {
      assert.strictEqual(translate("To play hooky means to skip class or work.", "american-to-british").translation, `To <span class="highlight">bunk off</span> means to skip class or work.`)
   })
   test(`Translate "No Mr. Bond, I expect you to die." to British English`, function () {
      assert.strictEqual(translate("No Mr. Bond, I expect you to die.", "american-to-british").translation, `No <span class="highlight">Mr</span> Bond, I expect you to die.`)
   })
   test(`Translate "Dr. Grosh will see you now." to British English`, function () {
      assert.strictEqual(translate("Dr. Grosh will see you now.", "american-to-british").translation, `<span class="highlight">Dr</span> Grosh will see you now.`)
   })
   test(`Translate "Lunch is at 12:15 today." to British English`, function () {
      assert.strictEqual(translate("Lunch is at 12:15 today.", "american-to-british").translation, `Lunch is at <span class="highlight">12.15</span> today.`)
   })
   test(`Translate "We watched the footie match for a while." to American English`, function () {
      assert.strictEqual(translate("We watched the footie match for a while.", "british-to-american").translation, `We watched the <span class="highlight">soccer</span> match for a while.`)
   })
   test(`Translate "Paracetamol takes up to an hour to work." to American English`, function () {
      assert.strictEqual(translate("Paracetamol takes up to an hour to work.", "british-to-american").translation, `<span class="highlight">Tylenol</span> takes up to an hour to work.`)
   })
   test(`Translate "First, caramelise the onions." to American English`, function () {
      assert.strictEqual(translate("First, caramelise the onions.", "british-to-american").translation, `First, <span class="highlight">caramelize</span> the onions.`)
   })
   test(`Translate "I spent the bank holiday at the funfair." to American English`, function () {
      assert.strictEqual(translate("I spent the bank holiday at the funfair.", "british-to-american").translation, `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`)
   })
   test(`Translate "I had a bicky then went to the chippy." to American English`, function () {
      assert.strictEqual(translate("I had a bicky then went to the chippy.", "british-to-american").translation, `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`)
   })
   test(`Translate "I've just got bits and bobs in my bum bag." to American English`, function () {
      assert.strictEqual(translate("I've just got bits and bobs in my bum bag.", "british-to-american").translation, `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`)
   })
   test(`Translate "The car boot sale at Boxted Airfield was called off." to American English`, function () {
      assert.strictEqual(translate("The car boot sale at Boxted Airfield was called off.", "british-to-american").translation, `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`)
   })
   test(`Translate "Have you met Mrs Kalyani?" to American English`, function () {
      assert.strictEqual(translate("Have you met Mrs Kalyani?", "british-to-american").translation, `Have you met <span class="highlight">Mrs.</span> Kalyani?`)
   })
   test(`Translate "Prof Joyner of King's College, London." to American English`, function () {
      assert.strictEqual(translate("Prof Joyner of King's College, London.", "british-to-american").translation, `<span class="highlight">Prof.</span> Joyner of King's College, London.`)
   })
   test(`Translate "Tea time is usually around 4 or 4.30." to American English`, function () {
      assert.strictEqual(translate("Tea time is usually around 4 or 4.30.", "british-to-american").translation, `Tea time is usually around 4 or <span class="highlight">4:30</span>.`)
   })
   // These tests don't make any sense -- all of the translations show the highlighting; these are just repeats.
   test(`Highlight translation in "Mangoes are my favorite fruit."`, function () {
      assert.strictEqual(translate("Mangoes are my favorite fruit.", "american-to-british").translation, `Mangoes are my <span class="highlight">favourite</span> fruit.`)
   })
   test(`Highlight translation in "I ate yogurt for breakfast."`, function () {
      assert.strictEqual(translate("I ate yogurt for breakfast.", "american-to-british").translation, `I ate <span class="highlight">yoghurt</span> for breakfast.`)
   })
   test(`Highlight translation in "We watched the footie match for a while."`, function () {
      assert.strictEqual(translate("We watched the footie match for a while.", "british-to-american").translation, `We watched the <span class="highlight">soccer</span> match for a while.`)
   })
   test(`Highlight translation in "Paracetamol takes up to an hour to work."`, function () {
      assert.strictEqual(translate("Paracetamol takes up to an hour to work.", "british-to-american").translation, `<span class="highlight">Tylenol</span> takes up to an hour to work.`)
   })
})
