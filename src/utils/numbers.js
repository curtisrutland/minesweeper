export function randomInt(exclusiveMax) {
  return getRandomInt(0, exclusiveMax)
}

function getRandomInt(min, max, inclusive = false) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min
}

export function range(exclusiveMax) {
  const result = []
  for (let i = 0; i < Math.abs(exclusiveMax); i++) result.push(i)
  return result
}
