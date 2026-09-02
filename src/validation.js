export const categoryOptions = [
  'Smartphone',
  'Laptop',
  'Wearable',
  'Audio',
]

export const roleOptions = ['Engineer', 'Tester']

export function validateField(name, value) {
  const trimmedValue = typeof value === 'string' ? value.trim() : value

  switch (name) {
    case 'gadgetName':
      if (!trimmedValue) return 'Gadget name is required.'
      if (trimmedValue.length < 3) {
        return 'Gadget name must be at least 3 characters.'
      }
      break

    case 'category':
      if (!categoryOptions.includes(value)) {
        return 'Please select a category.'
      }
      break

    case 'manufacturer':
      if (!trimmedValue) return 'Manufacturer is required.'
      break

    case 'healthRating': {
      if (trimmedValue === '') return 'Health rating is required.'

      const rating = Number(value)
      if (Number.isNaN(rating) || rating < 1 || rating > 100) {
        return 'Health rating must be between 1 and 100.'
      }
      break
    }

    case 'techBrand':
      if (!trimmedValue) return 'Tech brand name is required.'
      break

    case 'role':
      if (!roleOptions.includes(value)) {
        return 'Please select a user role.'
      }
      break

    default:
      break
  }

  return ''
}
