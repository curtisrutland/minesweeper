import React from 'react'
import Image from './Image'
import flag from './assets/flag.svg'

export default function Flag({ size }) {
  return <Image size={size} src={flag} />
}
