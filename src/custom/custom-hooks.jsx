/** @format */

export function calcPercent(arry, whatData) {
  let total = 0;
  for (const key in arry) {
    if (arry[key][whatData]) {
      total += 1;
    }
  }
  return total;
}

export function randomArray(array) {
  let _randomArray = array;

  let tmp = [];
  let current = 0;
  let top = _randomArray.length;

  if (top) {
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = _randomArray[current];
      _randomArray[current] = _randomArray[top];
      _randomArray[top] = tmp;
    }
  }

  return _randomArray;
}
