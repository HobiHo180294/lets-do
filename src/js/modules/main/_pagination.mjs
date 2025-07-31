export function updateButtons(prevBtn, currentPage) {
  const prevBtnCopy = prevBtn;
  prevBtnCopy.disabled = currentPage <= 1;
}
export function getCurrentPage(currentPageElement) {
  return Number(currentPageElement.textContent);
}
