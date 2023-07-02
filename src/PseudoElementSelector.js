const Selector = require('./Selector');

class PseudoElementSelector extends Selector {
  constructor(value) {
    super();
    this.selector = value;
    this.usedParts.push('pseudoElement');
  }
}

module.exports = { PseudoElementSelector };
