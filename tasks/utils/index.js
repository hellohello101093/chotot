export function getCategoryNameTimViecNhanh(text) {
  return text.replace(/\n/g, '');
}

export function getTotalItemCategoryTimViecNhanh(text) {
  return parseInt(text.replace(/[^0-9]+/g, ''));
}
