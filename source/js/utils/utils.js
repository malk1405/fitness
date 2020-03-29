// аналог DOMTokenList.toggle(token, force)
// реализовал, из-за того что полифил для IE
// видимо не поддерживает параметр force
export const setClass = (node, className, set) => {
  if (set) node.classList.add(className);
  else node.classList.remove(className);
};
