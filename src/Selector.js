class Selector {
  constructor() {
    this.selector = '';
    this.partsOrder = [
      'element',
      'id',
      'class',
      'attribute',
      'pseudoClass',
      'pseudoElement',
    ];
    this.usedParts = [];
  }

  validatePartOrder(part) {
    const lastPartIndex = this.usedParts.length - 1;
    const lastPart = this.usedParts[lastPartIndex];

    if (
      lastPart
      && this.partsOrder.indexOf(part) < this.partsOrder.indexOf(lastPart)
    ) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, '
          + 'id, class, attribute, pseudo-class, pseudo-element',
      );
    }

    this.usedParts.push(part);
  }

  validatePartOccurrence(part) {
    if (
      part === 'element'
      && this.usedParts.includes('element')
    ) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    if (
      part === 'id'
      && this.usedParts.includes('id')
    ) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    if (
      part === 'pseudoElement'
      && this.usedParts.includes('pseudoElement')
    ) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    if (part === 'attribute' && this.usedParts.filter((p) => p === 'attribute').length > 0) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
  }

  element(value) {
    this.validatePartOrder('element');
    this.validatePartOccurrence('element');
    throw new Error(`Invalid selector: ${value}`);
  }

  id(value) {
    this.validatePartOrder('id');
    this.validatePartOccurrence('id');
    throw new Error(`Invalid selector: ${value}`);
  }

  class(value) {
    this.validatePartOrder('class');
    throw new Error(`Invalid selector: ${value}`);
  }

  attr(value) {
    this.validatePartOrder('attribute');
    throw new Error(`Invalid selector: ${value}`);
  }

  pseudoClass(value) {
    this.validatePartOrder('pseudoClass');
    throw new Error(`Invalid selector: ${value}`);
  }

  pseudoElement(value) {
    this.validatePartOrder('pseudoElement');
    this.validatePartOccurrence('pseudoElement');
    throw new Error(`Invalid selector: ${value}`);
  }

  combine(selector, combinator) {
    throw new Error(`Invalid selector: ${this.selector} ${selector} ${combinator}`);
  }

  stringify() {
    return this.selector;
  }
}

module.exports = { Selector };
