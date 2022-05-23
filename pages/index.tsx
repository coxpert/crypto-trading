import HomePage from '@/pages/HomePage'
import type { NextPage } from 'next'
import { ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  layout?: ({ children }: { children: ReactNode; }) => JSX.Element
}


const Home: NextPage = () => {
  return <HomePage />
}
export default Home
