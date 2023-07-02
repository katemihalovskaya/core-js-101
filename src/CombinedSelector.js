const Selector = require('./Selector');

class CombinedSelector extends Selector {
  constructor(value) {
    super();
    this.selector = value;
  }
}

module.exports = { CombinedSelector };
