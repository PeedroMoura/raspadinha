import { describe, it, expect } from 'vitest'
import {
  debounce,
  throttle,
  deepClone,
  generateId,
  isEmpty,
  get,
  set,
  capitalize,
  kebabCase,
  camelCase,
  formatFileSize,
  parseQueryParams,
  buildUrl
} from '@/utils'

describe('Utils', () => {
  describe('debounce', () => {
    it('should delay function execution', async () => {
      let called = false
      const debouncedFn = debounce(() => {
        called = true
      }, 100)

      debouncedFn()
      expect(called).toBe(false)

      await new Promise(resolve => setTimeout(resolve, 150))
      expect(called).toBe(true)
    })
  })

  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('hello')).toBe('hello')
      expect(deepClone(true)).toBe(true)
      expect(deepClone(null)).toBe(null)
    })

    it('should clone arrays', () => {
      const original = [1, 2, { a: 3 }]
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned[2]).not.toBe(original[2])
    })

    it('should clone objects', () => {
      const original = { a: 1, b: { c: 2 } }
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.b).not.toBe(original.b)
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('should use custom prefix', () => {
      const id = generateId('test')
      expect(id).toMatch(/^test_/)
    })
  })

  describe('isEmpty', () => {
    it('should return true for empty values', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('   ')).toBe(true)
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
    })

    it('should return false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false)
      expect(isEmpty([1])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty(false)).toBe(false)
    })
  })

  describe('get', () => {
    const obj = {
      a: {
        b: {
          c: 'value'
        }
      }
    }

    it('should get nested property', () => {
      expect(get(obj, 'a.b.c')).toBe('value')
    })

    it('should return default value for missing property', () => {
      expect(get(obj, 'a.b.d', 'default')).toBe('default')
    })

    it('should handle null/undefined objects', () => {
      expect(get(null, 'a.b.c', 'default')).toBe('default')
      expect(get(undefined, 'a.b.c', 'default')).toBe('default')
    })
  })

  describe('set', () => {
    it('should set nested property', () => {
      const obj = {}
      set(obj, 'a.b.c', 'value')
      expect(get(obj, 'a.b.c')).toBe('value')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('HELLO')).toBe('Hello')
      expect(capitalize('hELLO')).toBe('Hello')
    })
  })

  describe('kebabCase', () => {
    it('should convert to kebab-case', () => {
      expect(kebabCase('camelCase')).toBe('camel-case')
      expect(kebabCase('PascalCase')).toBe('pascal-case')
      expect(kebabCase('snake_case')).toBe('snake-case')
      expect(kebabCase('space separated')).toBe('space-separated')
    })
  })

  describe('camelCase', () => {
    it('should convert to camelCase', () => {
      expect(camelCase('kebab-case')).toBe('kebabCase')
      expect(camelCase('snake_case')).toBe('snakeCase')
      expect(camelCase('space separated')).toBe('spaceSeparated')
    })
  })

  describe('formatFileSize', () => {
    it('should format file sizes', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1024 * 1024)).toBe('1 MB')
      expect(formatFileSize(1536)).toBe('1.5 KB')
    })
  })

  describe('parseQueryParams', () => {
    it('should parse query parameters', () => {
      const params = parseQueryParams('https://example.com?foo=bar&baz=qux')
      expect(params).toEqual({ foo: 'bar', baz: 'qux' })
    })
  })

  describe('buildUrl', () => {
    it('should build URL with query parameters', () => {
      const url = buildUrl('https://example.com', { foo: 'bar', baz: 'qux' })
      expect(url).toBe('https://example.com/?foo=bar&baz=qux')
    })

    it('should handle null/undefined values', () => {
      const url = buildUrl('https://example.com', { foo: 'bar', baz: null, qux: undefined })
      expect(url).toBe('https://example.com/?foo=bar')
    })
  })
})
