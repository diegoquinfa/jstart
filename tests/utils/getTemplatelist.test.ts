import { describe, it, expect } from 'vitest'
import { getTemplateDirs } from '@/utils'

describe('Get Template List', () => {
  it('would be the list of names directory templates in config jstart', () => {
    expect(getTemplateDirs).toBe('hell')
  })
})
