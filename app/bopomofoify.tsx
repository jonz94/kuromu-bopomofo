'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { bopomofoify } from '@/lib/bopomofoify'
import { description, title } from '@/lib/constant'
import { Copy, LucideLoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useId, useRef, useState } from 'react'
import { toast } from 'sonner'
import icon from './icon.png'

export function Bopomofoify() {
  const idForInputTextarea = useId()
  const idForOutputTextarea = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [outputValue, setOutputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  async function convert() {
    if (!inputRef.current) {
      return
    }

    setIsProcessing(true)

    const input = inputRef.current.value

    const output = await bopomofoify(input)

    setOutputValue(output)

    toast.success('轉換成功！')

    setIsProcessing(false)
  }

  return (
    <div className="mx-0 grid w-full grid-cols-1 gap-y-8 xs:max-w-full sm:mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      <div className="flex flex-col gap-y-2">
        <h1 className="flex flex-col items-center gap-x-2 text-xl font-bold xs:flex-row xs:text-2xl">
          <span>
            <Image alt="logo" src={icon} height={32} />
          </span>
          <span>{title}</span>
        </h1>
        <h2 className="mx-auto max-w-48 text-balance text-lg text-muted-foreground xs:mx-0 xs:max-w-[unset]">
          {description}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr,4rem,1fr]">
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor={idForInputTextarea} className="text-base">
            原始文字
          </Label>
          <Textarea
            ref={inputRef}
            id={idForInputTextarea}
            placeholder="在這裡輸入你想要轉換ㄉ文章或句子"
            className="min-h-40 border-transparent bg-muted text-lg shadow-none md:min-h-80 md:text-lg"
          />
        </div>

        <div className="grid place-content-center">
          <Button onClick={() => convert()} className="h-12" disabled={isProcessing}>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center">
                <p>轉換中</p>
                <p>
                  <LucideLoaderCircle className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" />
                </p>
              </div>
            ) : (
              <div>
                <p>轉換</p>
                <p className="hidden md:block">👉</p>
                <p className="block md:hidden">👇</p>
              </div>
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-2 md:w-full">
          <Label htmlFor={idForOutputTextarea} className="hidden text-base md:block">
            轉換後
          </Label>
          <Textarea
            id={idForOutputTextarea}
            readOnly
            className="h-full min-h-40 grow resize-none text-lg md:min-h-80 md:text-lg"
            value={outputValue}
            placeholder="點擊「轉換」ㄉ按鈕即可開始轉換～"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(outputValue)
              toast.success('複製成功！')
            } catch {
              toast.error('複製失敗 你的裝置不支援這個功能QQ')
            }
          }}
        >
          <Copy />
          複製
        </Button>
      </div>
    </div>
  )
}
