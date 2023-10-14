
export type language = 'en' | 'kr' | 'fr' | 'cn'

export type languagePayload = {
    plaintext: string,
    code: language
  }

export type setupData = {
    language: languagePayload,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    setting: string
}