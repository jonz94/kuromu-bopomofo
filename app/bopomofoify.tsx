'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { bopomofoify } from '@/lib/bopomofoify'
import { description, title } from '@/lib/constant'
import { Copy } from 'lucide-react'
import Image from 'next/image'
import { useId, useRef, useState } from 'react'
import icon from './icon.png'

export function Bopomofoify() {
  const idForInputTextarea = useId()
  const idForOutputTextarea = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [outputValue, setOutputValue] = useState('')

  async function convert() {
    if (!inputRef.current) {
      return
    }

    const input = inputRef.current.value

    const output = await bopomofoify(input)

    setOutputValue(output)
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-y-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="flex items-center gap-x-2 text-3xl font-bold">
          <Image alt="logo" src={icon} height={32} />
          {title}
        </h1>
        <h2 className="text-lg text-muted-foreground">{description}</h2>
      </div>

      <div className="grid grid-cols-[1fr,4rem,1fr] gap-4">
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor={idForInputTextarea} className="text-base">
            原始文字
          </Label>
          <Textarea
            ref={inputRef}
            id={idForInputTextarea}
            className="min-h-80 border-transparent bg-muted text-lg shadow-none md:text-lg"
          />
        </div>

        <div className="grid place-content-center">
          <Button onClick={() => convert()}>轉換 👉</Button>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor={idForOutputTextarea} className="text-base">
            轉換後
          </Label>
          <Textarea
            id={idForOutputTextarea}
            readOnly
            className="h-full min-h-80 grow resize-none border-transparent bg-muted text-lg shadow-none md:text-lg"
            value={outputValue}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="secondary">
          <Copy />
          複製
        </Button>
      </div>
    </div>
  )
}
