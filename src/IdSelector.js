const Selector = require('./Selector');
const AttributeSelector = require('./AttributeSelector');
const ClassSelector = require('./ClassSelector');
const CombinedSelector = require('./CombinedSelector');
const PseudoClassSelector = require('./PseudoClassSelector');
const PseudoElementSelector = require('./PseudoElementSelector');

class IdSelector extends Selector {
  constructor(value) {
    super();
    this.selector = value;
    this.usedParts.push('id');
  }

  class(value) {
    return new ClassSelector(`${this.selector}.${value}`);
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

module.exports = { IdSelector };
