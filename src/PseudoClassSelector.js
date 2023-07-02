const Selector = require('./Selector');
const CombinedSelector = require('./CombinedSelector');
const PseudoElementSelector = require('./PseudoElementSelector');

class PseudoClassSelector extends Selector {
  constructor(value) {
    super();
    this.selector = value;
    this.usedParts.push('pseudoClass');
  }

  pseudoClass(value) {
    return new PseudoClassSelector(`${this.selector}:${value}`);
  }

  pseudoElement(value) {
    return new PseudoElementSelector(`${this.selector}::${value}`);
  }

  combine(selector, combinator) {
    return new CombinedSelector(`${this.selector} ${combinator} ${selector.stringify()}`);
  }
}

module.exports = { PseudoClassSelector };
