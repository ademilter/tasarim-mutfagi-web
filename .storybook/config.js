import React from 'react'
import { addParameters, addDecorator, configure } from '@storybook/react'
import { create } from '@storybook/theming'
import { withA11y } from '@storybook/addon-a11y'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { ThemeProvider } from 'styled-components'
import ResetStyle from '../src/style/resetStyle'
import GlobalStyle from '../src/style/globalStyle'
import ThemeStyle from '../src/style/theme'

function Layout(storyFn) {
  return (
    <ThemeProvider theme={ThemeStyle}>
      <>
        <ResetStyle />
        <GlobalStyle />
        <div style={{ padding: '30px' }}>{storyFn()}</div>
      </>
    </ThemeProvider>
  )
}

addDecorator(Layout)
addDecorator(withA11y)

const theme = create({
  // brandTitle: 'My custom storybook',
  // brandUrl: 'https://tm19.com',
  // brandImage: 'https://placehold.it/350x150',
})

addParameters({
  viewport: {
    viewports: {
      iphonex: INITIAL_VIEWPORTS.iphonex,
      Desktop: {
        name: 'Desktop',
        styles: {
          width: '1200px',
          height: '800px'
        }
      }
    }
  },
  options: {
    theme
  }
})

const req = require.context('../stories', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
