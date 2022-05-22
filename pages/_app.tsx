import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { NextPage } from 'next'
import AuthProvider from '@/components/auth/AuthContext'
import createEmotionCache from '@/createEmotionCache'
import { AppGlobalStyles } from '@/layouts/AppGlobalStyles'
import { config } from '@/config'
import { Layout } from '@/layouts/Layout'

type NextPageWithLayout = NextPage & {
  layout?: React.FunctionComponent
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
  Component: NextPageWithLayout
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const AppLayout = Component.layout ?? Layout

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{config.AppName}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppGlobalStyles>
        <AuthProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </AuthProvider>
      </AppGlobalStyles>
    </CacheProvider>
  )
}

export default MyApp
