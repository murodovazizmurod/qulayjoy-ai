export default (htmlText: string) => {
  const span = document.createElement('span');
  span.innerHTML = htmlText;

  return span.textContent || span.innerText;
};
