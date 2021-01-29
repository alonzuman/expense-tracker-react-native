export const EXP_CATEGORIES = {
  categories: {
    foodAndBeverage: {
      label: 'Food & Beverage',
      emoji: '🍾'
    },
    bills: {
      label: 'Bills',
      emoji: '🧾'
    },
    transportation: {
      label: 'Transportation',
      emoji: '🚌'
    },
    shopping: {
      label: 'Shopping',
      emoji: '🛍️'
    },
    electricity: {
      parent: 'bills',
      label: 'Electricity',
      emoji: '💡'
    },
    water: {
      parent: 'bills',
      label: 'Water',
      emoji: '🚰'
    },
    restaurant: {
      parent: 'foodAndBeverage',
      label: 'Restaurant',
      emoji: '🥡'
    },
    groceries: {
      parent: 'foodAndBeverage',
      label: 'Groceries',
      emoji: '🍒'
    }
  }
}

export const CURRENCIES = {
  ILS: {
    label: 'ILS',
    symbol: '₪'
  },
  USD: {
    label: 'USD',
    symbol: '$'
  }
}
