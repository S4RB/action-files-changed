import directoryHasChanges from '../src/directoryHasChanges'

const directory = 'settings/**/*'

test('Should return true if a file in the specified directory has changed', () => {
  const changedFiles = [
    'settings/tenant.yml'
  ]

  expect(directoryHasChanges(changedFiles, directory)).toBeTruthy()
})

test("Should return false filename doesn't include specified directory", () => {
  const changedFiles = [
    'src/config/index.ts'
  ]

  expect(directoryHasChanges(changedFiles, directory)).toBe(false)
})

test('Should return false if filename has similar folder in path but not in root of the repo', () => {
  const changedFiles = [
    'src/settings/index.ts'
  ]

  expect(directoryHasChanges(changedFiles, directory)).toBe(false)
})

test('Should return true if rules have changed', () => {
  const changedFiles = [
    'settings/rules/fn.js',
    'settings/rules/fn2.js'
  ]

  expect(directoryHasChanges(changedFiles, directory)).toBeTruthy()
})
