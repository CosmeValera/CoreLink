import React from 'react'

import View from './View'

export default {
  title: 'GoldenLayout',
  component: View,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
}

const Template = (args) => <View {...args} />

export const Default = Template.bind({})
