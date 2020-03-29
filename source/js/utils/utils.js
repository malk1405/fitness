// аналог DOMTokenList.toggle(token, force)
// реализовал, из-за того что полифил для IE
// видимо не поддерживает параметр force
export const setClass = (node, className, set) => {
  node.classList[set ? 'add' : 'remove'](className);
};
