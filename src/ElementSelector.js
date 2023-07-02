const Selector = require('./Selector');
const CombinedSelector = require('./CombinedSelector');
const AttributeSelector = require('./AttributeSelector');
const ClassSelector = require('./ClassSelector');
const IdSelector = require('./IdSelector');
const PseudoClassSelector = require('./PseudoClassSelector');
const PseudoElementSelector = require('./PseudoElementSelector');

class ElementSelector extends Selector {
  constructor(value) {
    super();
    this.selector = value;
  }

  id(value) {
    return new IdSelector(`${this.selector}#${value}`);
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

module.exports = { ElementSelector };
