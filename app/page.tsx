import { Bopomofoify } from '@/app/bopomofoify'
import { ModeToggle } from '@/components/mode-toggle'

// force dynamic rendering to ensure proper WebAssembly initialization
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="grid min-h-screen place-items-center p-4">
      <main className="flex size-full flex-col justify-center gap-y-4">
        <Bopomofoify />

        <div className="absolute right-4 top-4">
          <ModeToggle></ModeToggle>
        </div>
      </main>
    </div>
  )
}
