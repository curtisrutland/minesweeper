import React from 'react'
import Image from './Image'
import bomb from './assets/bomb.svg'

export default function Bomb({ size }) {
  return <Image size={size} src={bomb} />
}
