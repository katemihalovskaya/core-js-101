const Selector = require('./Selector');
const CombinedSelector = require('./CombinedSelector');
const AttributeSelector = require('./AttributeSelector');
const PseudoClassSelector = require('./PseudoClassSelector');
const PseudoElementSelector = require('./PseudoElementSelector');

class ClassSelector extends Selector {
  constructor(value) {
    super();
    this.selector = value;
    this.usedParts.push('class');
  }

  class(value) {
    this.selector += `.${value}`;
    return this;
  }

  attr(value) {
    return new AttributeSelector(`${this.selector}[${value}]`);
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

module.exports = { ClassSelector };
