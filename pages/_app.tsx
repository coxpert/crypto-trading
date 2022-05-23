import '../styles/globals.scss'
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
import { ModalContextProvider } from '@/components/modal'
import { SettingModal } from '@/components/modal/SettingModal'
import { Web3ReactProvider } from '@web3-react/core'
import { providers } from 'ethers'
import { Web3ContextProvider } from '@/layouts/Web3Provider'
import { NextPageWithLayout } from 'pages'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const getWeb3Library = (provider: any): providers.Web3Provider => {
  const library = new providers.Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}
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
        <Web3ReactProvider getLibrary={getWeb3Library}>
          <Web3ContextProvider>
            <AuthProvider>
              <ModalContextProvider>
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
                <SettingModal />
              </ModalContextProvider>
            </AuthProvider>
          </Web3ContextProvider>
        </Web3ReactProvider>
      </AppGlobalStyles>
    </CacheProvider>
  )
}

export default MyApp
