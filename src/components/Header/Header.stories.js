import React from 'react'
import { action } from '@storybook/addon-actions'
import Header from './Header'

export default {
  title: 'Header',
  component: Header,
}

export const Basic = () => (
  <Header
    rows={9}
    cols={9}
    flags={0}
    mines={10}
    onNewGameClick={action('new game clicked')}
  />
)
