function generateRandomIndex () {
  let randomIndex = ''
  const collection = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

  for (let i = 0; i < 5; i++) {
    const index = collection.split('')[Math.floor(Math.random() * collection.length)]
    randomIndex += index
  }

  return randomIndex
}

module.exports = generateRandomIndex
