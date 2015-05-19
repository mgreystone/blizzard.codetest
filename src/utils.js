'use strict'

export function roundLargeNumber (value) {
  if (value >= 1000) {
    return Math.round(value * 0.001) + 'K'
  }

  return value
}
