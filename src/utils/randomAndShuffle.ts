export function getRandomInt({ min, max }: { min: number; max: number }) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* Fisher Yates shuffle */
export function shuffle({ array }: { array: any[] }) {
  var arrayLen = array.length,
    value,
    index

  while (arrayLen) {
    index = Math.floor(Math.random() * arrayLen--)

    value = array[arrayLen]
    array[arrayLen] = array[index]
    array[index] = value
  }

  return array
}
