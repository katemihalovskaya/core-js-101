/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class CssSelector {
  constructor() {
    this.selectorParts = [];
    this.selectorOrder = [
      'element',
      'id',
      'class',
      'attribute',
      'pseudoClass',
      'pseudoElement',
    ];
    this.selectorCounts = {
      element: 0,
      id: 0,
      pseudoElement: 0,
    };
    this.usedParts = [];
  }

  element(value) {
    this.validatePartOccurrence('element');
    this.checkOrder('element');
    this.selectorCounts.element += 1;
    this.selectorParts.push(value);
    return this;
  }

  id(value) {
    this.validatePartOccurrence('id');
    this.checkOrder('id');
    this.selectorCounts.id += 1;
    this.selectorParts.push(`#${value}`);
    return this;
  }

  class(value) {
    this.checkOrder('class');
    this.selectorParts.push(`.${value}`);
    return this;
  }

  attr(value) {
    this.checkOrder('attribute');
    this.selectorParts.push(`[${value}]`);
    return this;
  }

  pseudoClass(value) {
    this.checkOrder('pseudoClass');
    this.selectorParts.push(`:${value}`);
    return this;
  }

  pseudoElement(value) {
    this.validatePartOccurrence('pseudoElement');
    this.checkOrder('pseudoElement');
    this.selectorCounts.pseudoElement += 1;
    this.selectorParts.push(`::${value}`);
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.selectorParts.push(`${selector1.stringify()} ${combinator} ${selector2.stringify()}`);
    return this;
  }

  stringify() {
    return this.selectorParts.join('');
  }

  checkOrder(part) {
    const lastPartIndex = this.usedParts.length - 1;
    const lastPart = this.usedParts[lastPartIndex];

    if (
      lastPart
      && this.selectorOrder.indexOf(part) < this.selectorOrder.indexOf(lastPart)
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
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CssSelector().element(value);
  },
  id(value) {
    return new CssSelector().id(value);
  },
  class(value) {
    return new CssSelector().class(value);
  },
  attr(value) {
    return new CssSelector().attr(value);
  },
  pseudoClass(value) {
    return new CssSelector().pseudoClass(value);
  },
  pseudoElement(value) {
    return new CssSelector().pseudoElement(value);
  },
  combine(selector1, combinator, selector2) {
    return new CssSelector().combine(selector1, combinator, selector2);
  },
};


/**
* Returns the rectangle object with width and height parameters and getArea() method
*
* @param {number} width
* @param {number} height
* @return {Object}
*
* @example
*    const r = new Rectangle(10,20);
*    console.log(r.width);       // => 10
*    console.log(r.height);      // => 20
*    console.log(r.getArea());   // => 200
*/

function Rectangle(width, height) {
  this.width = width;
  this.height = height;

  function calculateArea() {
    return this.width * this.height;
  }

  this.getArea = calculateArea;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const parsedObject = JSON.parse(json);
  const instance = Object.create(proto);
  Object.assign(instance, parsedObject);
  return instance;
}

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
