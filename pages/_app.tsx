import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { NextPage } from 'next'
import AuthProvider from '../src/components/auth/AuthContext'
import createEmotionCache from '../src/createEmotionCache'
import { AppGlobalStyles } from '../src/layouts/AppGlobalStyles'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
  Component: NextPageWithLayout
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>App Name</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppGlobalStyles>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </AppGlobalStyles>
    </CacheProvider>
  )
}

export default MyApp
