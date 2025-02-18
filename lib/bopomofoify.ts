import initializeJiebaWASM, { add_word, cut } from 'jieba-wasm'

const lookupTable: Record<string, string> = {
  是不是: '484',
  是: '4',
  我: '窩',
  你: 'ㄋ',
  妳: 'ㄋ',
  了: 'ㄌ',
  的: 'ㄉ',
  個: 'ㄍ',
  他: 'ㄊ',
  她: 'ㄊ',
  牠: 'ㄊ',
  它: 'ㄊ',
  好: '毫',
  超: '敲',
  可愛: '口i',
  做愛: '捉i',
  大便: '答辯',
  阿: 'ㄚ',
  喔: 'ㄛ',
  嗎: 'ㄇ',
  欸: 'ㄟ',
}

let alreadyInitialized = false

export async function initialize() {
  if (alreadyInitialized) {
    return
  }

  await initializeJiebaWASM()

  add_word('翻湧')

  alreadyInitialized = true
}

export async function bopomofoify(input: string) {
  await initialize()

  const words = cut(input, true)

  return words.map((word) => lookupTable[word] ?? word).join('')
}
