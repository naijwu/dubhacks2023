
export type language = 'en' | 'kr' | 'fr' | 'cn'

export type targetLanguage = 'en'

export type languagePayload = {
    plaintext: string,
    code: language
  } | undefined

export type setupData = {
    language: languagePayload,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    situation: {
        user: string,
        assistant: string,
        action: string,
    }
}