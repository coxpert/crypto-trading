import EmptyLayout from '@/layouts/EmptyLayout'
import dynamic from 'next/dynamic'
import { NextPageWithLayout } from 'pages'
const DocsPage = dynamic(() => import('@/pages/DocsPage'), { ssr: false })

const Docs: NextPageWithLayout = () => {
  return <DocsPage />
}

Docs.layout = EmptyLayout

export default Docs
