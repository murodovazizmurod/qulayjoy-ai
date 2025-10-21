const getInnerHTMLOfElement = (selector: string) => {
  const element = document.querySelector(selector);

  if (!element) {
    return '';
  }

  return element.innerHTML;
};

export default getInnerHTMLOfElement;
