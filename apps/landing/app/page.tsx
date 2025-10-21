import { DefaultLayout } from '@/app/layouts/default-layout'
import { About } from './components/sections/about'

export default function Home() {
  return (
    <DefaultLayout>
      <main className=" bg-green-500 pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-black">Welcome to SOL Learn</h2>
          <p className="text-lg text-black mb-8">
            An interactive educational platform that makes Solana blockchain development accessible through visual
            programming. Using an intuitive node-based interface, learners can drag-and-drop components to build and
            understand Solana transactions, programs, and cryptographic operations.
          </p>
          <button className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </main>
      <About />
    </DefaultLayout>
  )
}
