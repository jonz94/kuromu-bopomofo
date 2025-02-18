import initializeJiebaWASM, { add_word, cut } from 'jieba-wasm'

const lookupTable: Record<string, string> = {
  是不是: '484',
  還是: '還4',
  是: '4',
  我: '窩',
  你: 'ㄋ',
  妳: 'ㄋ',
  了: 'ㄌ',
  真的: '真ㄉ',
  的: 'ㄉ',
  某個: '某ㄍ',
  有個: '有ㄍ',
  個: 'ㄍ',
  他: 'ㄊ',
  她: 'ㄊ',
  牠: 'ㄊ',
  它: 'ㄊ',
  好: '豪',
  超: '敲',
  超可愛: '敲口i',
  可愛: '口i',
  做愛: '捉i',
  大便: '答辯',
  阿: 'ㄚ',
  喔: 'ㄛ',
  嗎: 'ㄇ',
  欸: 'ㄟ',
  吧: 'ㄅ',
}

let alreadyInitialized = false

export async function initialize() {
  if (alreadyInitialized) {
    return
  }

  await initializeJiebaWASM()

  add_word('超可愛')
  add_word('可愛')
  add_word('好在')
  add_word('做愛')
  add_word('翻湧')

  alreadyInitialized = true
}

export async function bopomofoify(input: string) {
  await initialize()

  const words = cut(input, true) as string[]

  // console.log(JSON.stringify(words, null, 2))

  return words
    .map((word) => {
      if (word.startsWith('阿')) {
        return word.replaceAll('阿', 'ㄚ')
      }

      return lookupTable[word] ?? word
    })
    .join('')
}
