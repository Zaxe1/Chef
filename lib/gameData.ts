export type Ingredient = {
  id: string;
  name: string;
  emoji: string;
  category: 'vegetable' | 'fruit' | 'protein' | 'grain' | 'dairy' | 'spice' | 'sauce' | 'sweet' | 'other';
};

// 100+ ingredients for Free Cooking mode + used as the pool for level distractors.
export const INGREDIENTS: Ingredient[] = [
  // vegetables
  { id: 'tomato', name: 'Tomato', emoji: '🍅', category: 'vegetable' },
  { id: 'onion', name: 'Onion', emoji: '🧅', category: 'vegetable' },
  { id: 'garlic', name: 'Garlic', emoji: '🧄', category: 'vegetable' },
  { id: 'carrot', name: 'Carrot', emoji: '🥕', category: 'vegetable' },
  { id: 'potato', name: 'Potato', emoji: '🥔', category: 'vegetable' },
  { id: 'corn', name: 'Corn', emoji: '🌽', category: 'vegetable' },
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', category: 'vegetable' },
  { id: 'pepper', name: 'Bell Pepper', emoji: '🫑', category: 'vegetable' },
  { id: 'cucumber', name: 'Cucumber', emoji: '🥒', category: 'vegetable' },
  { id: 'lettuce', name: 'Lettuce', emoji: '🥬', category: 'vegetable' },
  { id: 'mushroom', name: 'Mushroom', emoji: '🍄', category: 'vegetable' },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', category: 'vegetable' },
  { id: 'eggplant', name: 'Eggplant', emoji: '🍆', category: 'vegetable' },
  { id: 'pumpkin', name: 'Pumpkin', emoji: '🎃', category: 'vegetable' },
  { id: 'chili', name: 'Chili Pepper', emoji: '🌶️', category: 'vegetable' },
  { id: 'ginger', name: 'Ginger', emoji: '🫚', category: 'vegetable' },
  // fruits
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'fruit' },
  { id: 'banana', name: 'Banana', emoji: '🍌', category: 'fruit' },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', category: 'fruit' },
  { id: 'lemon', name: 'Lemon', emoji: '🍋', category: 'fruit' },
  { id: 'orange', name: 'Orange', emoji: '🍊', category: 'fruit' },
  { id: 'grapes', name: 'Grapes', emoji: '🍇', category: 'fruit' },
  { id: 'watermelon', name: 'Watermelon', emoji: '🍉', category: 'fruit' },
  { id: 'pineapple', name: 'Pineapple', emoji: '🍍', category: 'fruit' },
  { id: 'mango', name: 'Mango', emoji: '🥭', category: 'fruit' },
  { id: 'peach', name: 'Peach', emoji: '🍑', category: 'fruit' },
  { id: 'cherry', name: 'Cherry', emoji: '🍒', category: 'fruit' },
  { id: 'blueberry', name: 'Blueberry', emoji: '🫐', category: 'fruit' },
  { id: 'kiwi', name: 'Kiwi', emoji: '🥝', category: 'fruit' },
  { id: 'coconut', name: 'Coconut', emoji: '🥥', category: 'fruit' },
  // proteins
  { id: 'egg', name: 'Egg', emoji: '🥚', category: 'protein' },
  { id: 'chicken', name: 'Chicken', emoji: '🍗', category: 'protein' },
  { id: 'beef', name: 'Beef', emoji: '🥩', category: 'protein' },
  { id: 'fish', name: 'Fish', emoji: '🐟', category: 'protein' },
  { id: 'shrimp', name: 'Shrimp', emoji: '🦐', category: 'protein' },
  { id: 'bacon', name: 'Bacon', emoji: '🥓', category: 'protein' },
  { id: 'cheese', name: 'Cheese', emoji: '🧀', category: 'dairy' },
  { id: 'milk', name: 'Milk', emoji: '🥛', category: 'dairy' },
  { id: 'butter', name: 'Butter', emoji: '🧈', category: 'dairy' },
  { id: 'yogurt', name: 'Yogurt', emoji: '🍶', category: 'dairy' },
  // grains
  { id: 'bread', name: 'Bread', emoji: '🍞', category: 'grain' },
  { id: 'rice', name: 'Rice', emoji: '🍚', category: 'grain' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝', category: 'grain' },
  { id: 'noodles', name: 'Noodles', emoji: '🍜', category: 'grain' },
  { id: 'tortilla', name: 'Tortilla', emoji: '🫓', category: 'grain' },
  { id: 'bagel', name: 'Bagel', emoji: '🥯', category: 'grain' },
  { id: 'croissant', name: 'Croissant', emoji: '🥐', category: 'grain' },
  { id: 'pretzel', name: 'Pretzel', emoji: '🥨', category: 'grain' },
  // spices & sauces
  { id: 'salt', name: 'Salt', emoji: '🧂', category: 'spice' },
  { id: 'pepper_spice', name: 'Black Pepper', emoji: '⚫', category: 'spice' },
  { id: 'soy_sauce', name: 'Soy Sauce', emoji: '🫗', category: 'sauce' },
  { id: 'hot_sauce', name: 'Hot Sauce', emoji: '🔥', category: 'sauce' },
  { id: 'honey', name: 'Honey', emoji: '🍯', category: 'sweet' },
  { id: 'sugar', name: 'Sugar', emoji: '🍬', category: 'sweet' },
  { id: 'chocolate', name: 'Chocolate', emoji: '🍫', category: 'sweet' },
  { id: 'vanilla', name: 'Vanilla', emoji: '🌼', category: 'spice' },
  { id: 'cinnamon', name: 'Cinnamon', emoji: '🟤', category: 'spice' },
  // other / prepared
  { id: 'pizza', name: 'Pizza', emoji: '🍕', category: 'other' },
  { id: 'burger', name: 'Burger', emoji: '🍔', category: 'other' },
  { id: 'fries', name: 'Fries', emoji: '🍟', category: 'other' },
  { id: 'hotdog', name: 'Hot Dog', emoji: '🌭', category: 'other' },
  { id: 'taco', name: 'Taco', emoji: '🌮', category: 'other' },
  { id: 'burrito', name: 'Burrito', emoji: '🌯', category: 'other' },
  { id: 'sandwich', name: 'Sandwich', emoji: '🥪', category: 'other' },
  { id: 'soup', name: 'Soup', emoji: '🍲', category: 'other' },
  { id: 'salad', name: 'Salad', emoji: '🥗', category: 'other' },
  { id: 'sushi', name: 'Sushi', emoji: '🍣', category: 'other' },
  { id: 'cookie', name: 'Cookie', emoji: '🍪', category: 'sweet' },
  { id: 'cake', name: 'Cake', emoji: '🍰', category: 'sweet' },
  { id: 'donut', name: 'Donut', emoji: '🍩', category: 'sweet' },
  { id: 'icecream', name: 'Ice Cream', emoji: '🍦', category: 'sweet' },
  { id: 'pie', name: 'Pie', emoji: '🥧', category: 'sweet' },
  { id: 'pancake', name: 'Pancake', emoji: '🥞', category: 'grain' },
  { id: 'waffle', name: 'Waffle', emoji: '🧇', category: 'grain' },
  { id: 'popcorn', name: 'Popcorn', emoji: '🍿', category: 'grain' },
  { id: 'coffee', name: 'Coffee', emoji: '☕', category: 'other' },
  { id: 'tea', name: 'Tea', emoji: '🍵', category: 'other' },
  { id: 'wine', name: 'Wine', emoji: '🍷', category: 'other' },
  { id: 'beer', name: 'Beer', emoji: '🍺', category: 'other' },
  { id: 'olive', name: 'Olive', emoji: '🫒', category: 'vegetable' },
  { id: 'nuts', name: 'Nuts', emoji: '🥜', category: 'other' },
  { id: 'chestnut', name: 'Chestnut', emoji: '🌰', category: 'other' },
  { id: 'salt2', name: 'Sea Salt', emoji: '🧂', category: 'spice' },
  { id: 'herb', name: 'Herbs', emoji: '🌿', category: 'spice' },
  { id: 'lime', name: 'Lime', emoji: '🍋', category: 'fruit' },
  { id: 'pear', name: 'Pear', emoji: '🍐', category: 'fruit' },
  { id: 'greenapple', name: 'Green Apple', emoji: '🍏', category: 'fruit' },
  { id: 'melon', name: 'Melon', emoji: '🍈', category: 'fruit' },
  { id: 'crab', name: 'Crab', emoji: '🦀', category: 'protein' },
  { id: 'lobster', name: 'Lobster', emoji: '🦞', category: 'protein' },
  { id: 'octopus', name: 'Octopus', emoji: '🐙', category: 'protein' },
  { id: 'oyster', name: 'Oyster', emoji: '🦪', category: 'protein' },
  { id: 'squid', name: 'Squid', emoji: '🦑', category: 'protein' },
  { id: 'bento', name: 'Bento', emoji: '🍱', category: 'other' },
  { id: 'curry', name: 'Curry', emoji: '🍛', category: 'other' },
  { id: 'ramen', name: 'Ramen', emoji: '🍜', category: 'grain' },
  { id: 'dumpling', name: 'Dumpling', emoji: '🥟', category: 'other' },
  { id: 'falafel', name: 'Falafel', emoji: '🧆', category: 'protein' },
  { id: 'baguette', name: 'Baguette', emoji: '🥖', category: 'grain' },
  { id: 'shavedice', name: 'Shaved Ice', emoji: '🍧', category: 'sweet' },
  { id: 'custard', name: 'Custard', emoji: '🍮', category: 'sweet' },
  { id: 'champagne', name: 'Champagne', emoji: '🥂', category: 'other' },
  { id: 'tumbler', name: 'Tumbler', emoji: '🥃', category: 'other' },
  { id: 'salt3', name: 'Rock Salt', emoji: '🪨', category: 'spice' },
  { id: 'butter2', name: 'Ghee', emoji: '🧈', category: 'dairy' },
  { id: 'cream', name: 'Cream', emoji: '🥛', category: 'dairy' },
  { id: 'jam', name: 'Jam', emoji: '🍓', category: 'sweet' },
  { id: 'mustard', name: 'Mustard', emoji: '🟡', category: 'sauce' },
  { id: 'ketchup', name: 'Ketchup', emoji: '🥫', category: 'sauce' },
  { id: 'mayo', name: 'Mayo', emoji: '🥚', category: 'sauce' },
  { id: 'vinegar', name: 'Vinegar', emoji: '🍶', category: 'sauce' },
  { id: 'oil', name: 'Olive Oil', emoji: '🫒', category: 'sauce' },
  { id: 'sesame', name: 'Sesame', emoji: '⚪', category: 'spice' },
  { id: 'cumin', name: 'Cumin', emoji: '🟤', category: 'spice' },
  { id: 'paprika', name: 'Paprika', emoji: '🔴', category: 'spice' },
  { id: 'oregano', name: 'Oregano', emoji: '🌿', category: 'spice' },
  { id: 'basil', name: 'Basil', emoji: '🌱', category: 'spice' },
  { id: 'mint', name: 'Mint', emoji: '🌿', category: 'spice' },
  { id: 'rosemary', name: 'Rosemary', emoji: '🌿', category: 'spice' },
];

export const INGREDIENT_MAP: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i])
);

// 20 levels of increasing difficulty. correct = ingredient ids needed for the recipe.
// distractors are wrong options. Difficulty scales via more correct items + more distractors.
export type Level = {
  level: number;
  recipeName: string;
  recipeEmoji: string;
  correct: string[];
  distractors: string[];
};

export const LEVELS: Level[] = [
  { level: 1, recipeName: 'Scrambled Eggs', recipeEmoji: '🍳', correct: ['egg', 'butter', 'salt'], distractors: ['chocolate', 'fish'] },
  { level: 2, recipeName: 'Toast', recipeEmoji: '🍞', correct: ['bread', 'butter'], distractors: ['fish', 'onion', 'coffee'] },
  { level: 3, recipeName: 'Garlic Bread', recipeEmoji: '🥖', correct: ['bread', 'garlic', 'butter'], distractors: ['banana', 'chocolate'] },
  { level: 4, recipeName: 'Tomato Soup', recipeEmoji: '🍲', correct: ['tomato', 'onion', 'garlic', 'salt'], distractors: ['icecream', 'cookie'] },
  { level: 5, recipeName: 'Cheese Sandwich', recipeEmoji: '🥪', correct: ['bread', 'cheese', 'butter'], distractors: ['fish', 'donut', 'chili'] },
  { level: 6, recipeName: 'Fried Rice', recipeEmoji: '🍚', correct: ['rice', 'egg', 'onion', 'soy_sauce'], distractors: ['chocolate', 'cake', 'honey'] },
  { level: 7, recipeName: 'Pasta Pomodoro', recipeEmoji: '🍝', correct: ['pasta', 'tomato', 'garlic', 'olive'], distractors: ['banana', 'icecream', 'donut'] },
  { level: 8, recipeName: 'Chicken Taco', recipeEmoji: '🌮', correct: ['tortilla', 'chicken', 'lettuce', 'tomato', 'cheese'], distractors: ['chocolate', 'honey'] },
  { level: 9, recipeName: 'Beef Burger', recipeEmoji: '🍔', correct: ['bread', 'beef', 'lettuce', 'tomato', 'onion', 'cheese'], distractors: ['banana', 'icecream'] },
  { level: 10, recipeName: 'Sushi Roll', recipeEmoji: '🍣', correct: ['rice', 'fish', 'cucumber', 'soy_sauce'], distractors: ['chocolate', 'cheese', 'honey', 'donut'] },
  { level: 11, recipeName: 'Spicy Ramen', recipeEmoji: '🍜', correct: ['noodles', 'chili', 'garlic', 'soy_sauce', 'egg'], distractors: ['chocolate', 'honey', 'icecream'] },
  { level: 12, recipeName: 'Margherita Pizza', recipeEmoji: '🍕', correct: ['bread', 'tomato', 'cheese', 'basil', 'olive'], distractors: ['banana', 'chocolate', 'honey', 'donut'] },
  { level: 13, recipeName: 'Shrimp Curry', recipeEmoji: '🍛', correct: ['shrimp', 'onion', 'garlic', 'cumin', 'coconut', 'chili'], distractors: ['chocolate', 'icecream', 'donut'] },
  { level: 14, recipeName: 'Beef Stew', recipeEmoji: '🍲', correct: ['beef', 'potato', 'carrot', 'onion', 'garlic', 'rosemary', 'salt'], distractors: ['chocolate', 'banana', 'honey'] },
  { level: 15, recipeName: 'Fish Tacos', recipeEmoji: '🌮', correct: ['tortilla', 'fish', 'lettuce', 'lime', 'chili', 'avocado'], distractors: ['chocolate', 'honey', 'donut', 'cake'] },
  { level: 16, recipeName: 'Pancakes', recipeEmoji: '🥞', correct: ['egg', 'milk', 'butter', 'bread', 'sugar', 'honey'], distractors: ['fish', 'chili', 'garlic', 'soy_sauce'] },
  { level: 17, recipeName: 'Caesar Salad', recipeEmoji: '🥗', correct: ['lettuce', 'cheese', 'bread', 'garlic', 'olive', 'lemon', 'egg'], distractors: ['chocolate', 'honey', 'icecream', 'banana'] },
  { level: 18, recipeName: 'Lobster Bisque', recipeEmoji: '🍲', correct: ['lobster', 'onion', 'garlic', 'butter', 'cream', 'tomato', 'salt', 'pepper_spice'], distractors: ['chocolate', 'banana', 'honey', 'donut'] },
  { level: 19, recipeName: 'Octopus Salad', recipeEmoji: '🥗', correct: ['octopus', 'garlic', 'olive', 'lemon', 'herb', 'pepper_spice', 'salt', 'vinegar'], distractors: ['chocolate', 'honey', 'icecream', 'cake'] },
  { level: 20, recipeName: 'Master Chef Platter', recipeEmoji: '👑', correct: ['beef', 'shrimp', 'lobster', 'garlic', 'butter', 'tomato', 'basil', 'olive', 'lemon', 'salt'], distractors: ['chocolate', 'banana', 'honey', 'donut', 'icecream', 'cake'] },
];

// Free Cooking evaluation: rate a combination of ingredient ids.
export type DishRating = 'perfect' | 'good' | 'not_good' | 'bad' | 'so_bad';

export function rateDish(ingredientIds: string[]): { rating: DishRating; reason: string } {
  if (ingredientIds.length === 0) return { rating: 'so_bad', reason: 'You cooked nothing. Literally nothing.' };

  const items = ingredientIds.map((id) => INGREDIENT_MAP[id]).filter(Boolean);
  const categories = items.map((i) => i.category);
  const cats = new Set(categories);

  const hasSweet = categories.includes('sweet');
  const hasProtein = categories.includes('protein');
  const hasVeggie = categories.includes('vegetable');
  const hasGrain = categories.includes('grain');
  const hasSpice = categories.includes('spice') || categories.includes('sauce');
  const hasDairy = categories.includes('dairy');
  const hasFruit = categories.includes('fruit');

  // Count "weird" combos: sweet mixed with savory protein/garlic/onion
  const weirdCount =
    (hasSweet && hasProtein ? 1 : 0) +
    (hasSweet && (categories.includes('vegetable') && items.some((i) => ['garlic', 'onion', 'chili'].includes(i.id))) ? 1 : 0) +
    (hasFruit && hasProtein && hasSpice ? 1 : 0);

  const variety = cats.size;
  const count = items.length;

  // Perfect: balanced, 3-6 ingredients, a protein or grain + veggie, a seasoning, no weird clash
  if (count >= 3 && count <= 7 && (hasProtein || hasGrain) && hasVeggie && hasSpice && weirdCount === 0) {
    return { rating: 'perfect', reason: 'A balanced, well-seasoned dish. Masterful.' };
  }
  // Good: reasonable combo, some balance, no major clash
  if (count >= 2 && count <= 8 && weirdCount === 0 && (hasProtein || hasGrain || hasVeggie)) {
    return { rating: 'good', reason: 'A solid, edible combination.' };
  }
  // Not good: too few or slightly off but not offensive
  if (count === 1 || (weirdCount === 1 && count <= 5)) {
    return { rating: 'not_good', reason: 'It is... a choice. Not a good one.' };
  }
  // Bad: weird clash or too many ingredients
  if (weirdCount >= 1 || count > 8) {
    return { rating: 'bad', reason: 'The flavors are fighting. You lost.' };
  }
  // So bad: multiple clashes or dessert + savory + seafood
  if (weirdCount >= 2 || (hasSweet && categories.includes('protein') && hasFruit)) {
    return { rating: 'so_bad', reason: 'A crime against cuisine. Call the police.' };
  }
  return { rating: 'not_good', reason: 'Unremarkable. Like your cooking career.' };
}

export const RATING_TO_EVENT: Record<DishRating, string> = {
  perfect: 'free_perfect',
  good: 'free_good',
  not_good: 'free_not_good',
  bad: 'free_bad',
  so_bad: 'free_so_bad',
};
