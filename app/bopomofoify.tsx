'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { bopomofoify } from '@/lib/bopomofoify'
import { description, title } from '@/lib/constant'
import { Copy, LucideLoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useId, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'
import icon from './icon.png'

export function Bopomofoify() {
  const idForInputTextarea = useId()
  const idForOutputTextarea = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [outputValue, setOutputValue] = useState('')
  const [isPending, startTransition] = useTransition()

  async function convert() {
    startTransition(async () => {
      if (!inputRef.current) {
        return
      }

      const input = inputRef.current.value
      const output = await bopomofoify(input)
      setOutputValue(output)
      toast.success('轉換成功！')
    })
  }

  return (
    <div className="mx-0 grid w-full grid-cols-1 gap-y-6 xs:max-w-full sm:mx-auto sm:max-w-screen-sm md:max-w-screen-md md:gap-y-8 lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
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
          <Button onClick={convert} className="h-12" disabled={isPending}>
            {isPending ? (
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

      <div className="flex justify-between">
        <Button className="[--primary:0_100_50%]" asChild>
          <a
            href="https://www.youtube.com/channel/UC2ZWggon1NOT2TGaVUMzY7A"
            className="flex items-center justify-center"
          >
            <span>
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="relative -top-px">訂閱庫洛姆</span>
          </a>
        </Button>

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
