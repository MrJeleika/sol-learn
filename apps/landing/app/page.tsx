import { DefaultLayout } from '@/app/layouts/default-layout'
import { About } from './components/sections/about'
import { Main } from './components/sections/main'
import { Nodes } from './components/sections/nodes'

export default function Home() {
  return (
    <DefaultLayout>
      <Main />
      <About />
      <Nodes />
    </DefaultLayout>
  )
}
