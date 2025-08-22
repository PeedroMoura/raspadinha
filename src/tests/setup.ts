import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

vi.stubGlobal('localStorage', localStorageMock)

// Mock IntersectionObserver
const intersectionObserverMock = vi.fn()
intersectionObserverMock.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})

vi.stubGlobal('IntersectionObserver', intersectionObserverMock)

// Mock ResizeObserver
const resizeObserverMock = vi.fn()
resizeObserverMock.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})

vi.stubGlobal('ResizeObserver', resizeObserverMock)

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(''),
  },
})

// Mock fetch
global.fetch = vi.fn()

// Console warnings/errors that we want to suppress in tests
const originalWarn = console.warn
const originalError = console.error

console.warn = vi.fn((message, ...args) => {
  // Suppress specific Vue warnings in tests
  if (typeof message === 'string' && message.includes('[Vue warn]')) {
    return
  }
  originalWarn(message, ...args)
})

console.error = vi.fn((message, ...args) => {
  // Suppress specific errors in tests
  if (typeof message === 'string' && (
    message.includes('ResizeObserver loop limit exceeded') ||
    message.includes('Non-passive event listener')
  )) {
    return
  }
  originalError(message, ...args)
})
