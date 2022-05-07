/**
 * @vitest-environment happy-dom
 */

/* eslint-disable vars-on-top */

import { expect, it } from 'vitest'

declare global {
  // eslint-disable-next-line no-var
  var __property: unknown
}

it('defined on self/window are defined on global', () => {
  expect(self).toBeDefined()
  expect(window).toBeDefined()

  expect(self.__property).not.toBeDefined()
  expect(window.__property).not.toBeDefined()
  expect(globalThis.__property).not.toBeDefined()

  globalThis.__property = 'defined_value'

  expect(__property).toBe('defined_value')
  expect(self.__property).toBe('defined_value')
  expect(window.__property).toBe('defined_value')
  expect(globalThis.__property).toBe('defined_value')

  self.__property = 'test_value'

  expect(__property).toBe('test_value')
  expect(self.__property).toBe('test_value')
  expect(window.__property).toBe('test_value')
  expect(globalThis.__property).toBe('test_value')

  window.__property = 'new_value'

  expect(__property).toBe('new_value')
  expect(self.__property).toBe('new_value')
  expect(window.__property).toBe('new_value')
  expect(globalThis.__property).toBe('new_value')

  globalThis.__property = 'global_value'

  expect(__property).toBe('global_value')
  expect(self.__property).toBe('global_value')
  expect(window.__property).toBe('global_value')
  expect(globalThis.__property).toBe('global_value')

  const obj = {}

  self.__property = obj

  expect(self.__property).toBe(obj)
  expect(window.__property).toBe(obj)
  expect(globalThis.__property).toBe(obj)
})

it('usage with defineProperty', () => {
  Object.defineProperty(self, '__property', {
    get: () => 'self_property',
    configurable: true,
  })

  expect(__property).toBe('self_property')
  expect(self.__property).toBe('self_property')
  expect(globalThis.__property).toBe('self_property')
  expect(window.__property).toBe('self_property')

  Object.defineProperty(window, '__property', {
    get: () => 'window_property',
    configurable: true,
  })

  expect(__property).toBe('window_property')
  expect(self.__property).toBe('window_property')
  expect(globalThis.__property).toBe('window_property')
  expect(window.__property).toBe('window_property')

  Object.defineProperty(globalThis, '__property', {
    get: () => 'global_property',
    configurable: true,
  })

  expect(__property).toBe('global_property')
  expect(self.__property).toBe('global_property')
  expect(globalThis.__property).toBe('global_property')
  expect(window.__property).toBe('global_property')
})
