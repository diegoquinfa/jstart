import { describe, it, expect } from 'vitest'
import { hello } from '../src/app.js'


describe('test', () => {
  const greeting = 'Hello World!'

  it(`should be "${greeting}"`, () => {
    expect(hello()).toBe(greeting)
  })
})

