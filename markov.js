/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains[word]) {
        chains[word].push(nextWord)
      }else {
        (chains[word] = [nextWord]);
      }
    }

    this.chains = chains;
    return this.chains
  }

  static randomize(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let key = MarkovMachine.randomize(keys);
    let outputSentence = [];

    while (outputSentence.length < numWords && key !== null) {
      outputSentence.push(key);
      key = MarkovMachine.randomize(this.chains[key]);
    }
    return outputSentence.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};