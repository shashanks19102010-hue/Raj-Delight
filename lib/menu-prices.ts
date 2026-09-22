// Prices transcribed from the uploaded Raj Delight Menu 2024 PDF.
// The helper intentionally returns null for website-only categories/items whose price is not present in that PDF.

type PriceMap = Record<string, Record<string, number>>;

export const menuPrices: PriceMap = {
  'Warm & Cozy': { 'Tea (HOT)': 40, 'Masala Tea (HOT)': 50, 'Coffee (HOT)': 60, 'Green Tea': 50, 'Lemon Tea': 50, 'Black Tea': 40, 'Black Coffee': 50 },
  'Shake It Up': { 'Cold Coffee': 149, 'Cold Coffee (With ice cream)': 169, 'Strawberry Shake': 189, 'Butter Scotch Shake': 189, 'Chocolate Shake': 189, 'Vanilla Shake': 179, 'Black Current Skake': 179, 'Banana Shake': 159, 'Belgian Chocolate Shake': 199, 'Oreo Shake': 179, 'Kit Kat Shake': 179, 'Mango Shake': 119, 'Choco Cookies Shake': 189, 'Choco Nutella Shake': 179, 'Choco Brownie Shake': 189, 'Choco Muffin Shake': 189, 'Choco Fudge Shake': 199, 'Choco Hazelnut Shake': 189 },
  'Fizzy Mocktails': { 'Blue Lagoon': 149, 'Virgin Mojito': 149, 'Orange Mojito': 149, 'Mint Mojito': 139, 'Fresh Lime Soda (Sweet/Salt/Mix)': 99, 'Ice Tea': 39, 'Fruit Punch': 159, 'Aam Panna': 159, 'Mango Cooler': 139 },
  'Soulful Soups': { 'Manchow Soup': 139, 'Hot & Sour Soup': 139, 'Sweet Corn Soup': 119, 'Lemon Coriander Soup': 119, 'Cream Of Tomato Soup': 129, 'Cream Of Mushroom Soup': 149, 'Veg Clear Soup': 99, 'Thupka Soup': 139 },
  'Lassi': { 'Butter Milk (Masala Chhas)': 89, 'Punjabi Lassi (Sweet)': 99 },
  'Tandoori Station': { 'Tandoori Paneer Tikka': 289, 'Tandoori Paneer Malai Tikka': 319, 'Tandoori Achari Paneer Tikka': 299, 'Tandoori Pudina Paneer Tikka': 319, 'Tandoori Pudina Soya Chaap': 259, 'Tandoori Masala Chaap': 249, 'Tandoori Stuffed Aloo': 209, 'Afghani Soya Chaap': 329, 'Tandoori Soya Chaap': 289, 'Tandoori Malai Chaap': 329, 'Tandoori Achaari Chaap': 259, 'Tandoori Mushroom Tikka': 319, 'Tandoori Stuffed mushroom Tikka': 359, 'Tandoori Broccoli': 299, 'Tandoori Veg Seekh Kabab': 259, 'Dahi Ke Kabab': 269, 'Hara Bhara Kabab': 199, 'Tandoori Pineapple Tikka': 279, 'Dahi Ke Shole': 319, 'Chilli Paneer Roll': 149, 'Paneer Tikka Roll': 159, 'Malai Paneer Tikka Roll': 169, 'Tandoori Chaap Roll': 149 },
  'Indian Main Course': { 'Paneer Lababdar (Special)': 299, 'Kadhai Paneer': 329, 'Paneer Makhani': 289, 'Paneer Do Pyaza': 299, 'Panner Butter Masala': 329, 'Paneer Tikka Masala': 349, 'Handi Paneer': 299, 'Paneer Rogan Josh (Flavoured By Raj)': 319, 'Palak Paneer': 289, 'Paneer Changezi (Flavoured By Raj)': 349, 'Shahi Paneer': 299, 'Paneer Kali Mirch': 299, 'Navratan Korma': 299, 'Lucknowi Kofta': 299, 'Malai Kofta': 299, 'Mutter Paneer': 299, 'Mushroom Masala Mutter': 299, 'Mushroom Do Pyaza': 310, 'Mushroom Masala': 299, 'Corn Palak': 299, 'Mix Veg': 220, 'Nizami Handi (Hyderabadi)': 329, 'Jeera Aloo': 150, 'Gobhi Adraki': 199, 'Pindi Chana Masala': 220, 'Methi Mutter Malai': 240, 'Kadhai Mushroom': 279, 'Jalfrezi': 199, 'Punjabi Aloo': 199, 'Kadhai Soya Chaap': 279, 'Soya Chaap Tikka Masala': 299 },
  'Dal Delight': { 'Dal Makhani (Special)': 280, 'Dal Handi (Amritsari)': 259, 'Yellow Dal Tadka': 219, 'Dal Fry': 229, 'Dal Panchrangi': 259 },
  'Rice': { 'Steam Rice': 120, 'Jeera Rice': 149, 'Veg Pulao': 199, 'Matar Pulao': 189, 'Kashmiri Pulao (Special)': 219 },
  'Biryani': { 'Veg Biryani': 289, 'Paneer Tikka Biryani': 319, 'Veg Hyderabadi Biryani (special)': 310 },
  'Raita': { 'Boondi Raita': 139, 'Mix Veg Raita': 149, 'Pineapple Raita': 159, 'Fruit Raita': 169, 'Plain Curd': 69 },
  'Salad': { 'Garden green Salad': 99, 'Cucumber Salad': 69, 'Onion Salad': 69, 'Kimchi Salad': 99 },
  'Indian Breads': { 'Plain Roti': 20, 'Butter Roti': 30, 'Laccha Paratha': 60, 'Tava Roti Plain': 15, 'Tava Roti Butter': 20, 'Plain Naan': 50, 'Butter Naan': 60, 'Cheese Naan': 80, 'Garlic Naan': 60, 'Kashmiri Naan': 99, 'Missi Roti': 49, 'Onion Missi Roti': 69, 'Stuffed Naan': 70, 'Rumali Roti': 15, 'Bread Basket (Raj Delight Special)': 349 },
  'Paratha': { 'Paneer Paratha': 99, 'Aloo Paratha': 89, 'Onion Paratha': 89, 'Mix Veg Paratha': 99, 'Green Chilli Paratha': 75, 'Gobhi Paratha': 89 },
  'Papad': { 'Masala Papad': 60, 'Plain Papad': 35, 'Fry Papad': 55 },
  'Chinese Appetizers': { 'Chilli Paneer Dry': 289, 'Chilli Baby Corn': 259, 'Paneer\'65': 260, 'Crispy Corn Salt & Pepper': 210, 'American Corn': 249, 'Chilli Mushroom': 299, 'Chilli Soya Chaap': 249, 'Spring Roll': 179, 'Honey Chilli Potato': 189, 'Chilli Potato': 179, 'Paneer-in-Hot Garlic (Raj Delight Special)': 279, 'Veg Manchurian Dry': 249, 'Paneer Manchurian Dry': 259, 'Crispy Baby Corn': 229, 'Paneer Green Garlic': 269, 'Crispy Veggies (Salt & Pepper)': 210 },
  'Dumplings': { 'Steem Veg Momos': 119, 'Steem Paneer Momos': 149, 'Veg Kurkure Momos': 169, 'Paneer Kurkure Momos': 189, 'Pan Fryed Chilli Garlic Momos': 199, 'Tandoori Veg Momos': 189, 'Tandoori Paneer Momos': 209 },
  'Saucy Delights': { 'Manchurian Gravy': 249, 'Chilli Paneer Gravy': 259, 'Veg Hot Garlic Gravy': 269, 'Chilli Mushroom Gravy': 299 },
  'Chinese Cuisine': { 'Veg Fried Rice': 249, 'Schezwan Fried Rice': 279, 'Chilli Garlic Fried Rice': 269, 'Veg Noodles': 199, 'Hakka Noodles': 239, 'Singapori Noodles': 239, 'Chilli Garlic Noodles': 229, 'Schezwan Noodles': 229, 'Paneer Noodles': 239 },
  'Smokey Grills': { 'Tandoori Sizzler': 429, 'Chinesse Sizzler': 399 },
  'Continental': { 'Classic Margherita Pizza': 269, 'Farm House Pizza': 279, 'Corn & Cheese Pizza': 259, 'Neapolitan Pizza': 279, 'Paneer Tikka Pizza': 299, 'Double Cheese Margherita Pizza': 299, 'Mushroom Mania': 319 },
  'Italian Pasta': { 'Red Sauce Pasta': 220, 'White Sauce Pasta': 240, 'Mix Sauce Pasta': 269 },
  'Sandwich': { 'Veg Grilled Sandwich': 149, 'Veg Cheese Grilled Sandwich': 160, 'Paneer Grilled Sandwich': 199, 'Tandoori Paneer Grilled Sandwich': 210, 'Double Decker Grilled Sandwich': 219, 'Double Decker Cheese Grilled Sandwich': 239 },
  'Garlic Breads': { 'Cheese Garlic Bread': 179, 'Stuff Garlic Bread': 199 },
  'Delicious Burger': { 'Classic Veg Burger': 79, 'Cheese Burger': 110, 'Paneer Burger': 109, 'Cheese Paneer Burger': 129, 'Jalapeno Burger': 119, 'Cheese Jalapeno Burger': 139 },
  'Fries': { 'French Fries': 120, 'Peri Peri French Fries': 140, 'Cheese French Fries': 159, 'New York Style French Fries': 179 },
  'Special Thali': { 'Rajsthani Thali (Special)': 599, 'Raj Delight Delux Thali': 349, 'Bajra Roti': 19, 'Makka Roti': 19 },
  'South Indian': { 'Plain Dosa': 119, 'Masala Dosa': 139, 'Paneer Dosa': 189, 'Paneer Masala Dosa': 199, 'Cheese Dosa': 189, 'Spring Onion Dosa': 149, 'Rawa Masala Dosa': 189, 'Rawa Paneer Dosa': 219, 'Rawa Onion Dosa': 159, 'Chilli Paneer Dosa': 210, 'Mysore Plain Dosa': 129, 'Mysore Masala Dosa': 159, 'Mysore Onion Dosa': 169, 'Mysore Paneer Dosa': 199, 'Mysore Paneer Masala Dosa': 210, 'Mysore Rawa Masala Dosa': 179, 'Mysore Rawa Paneer Dosa': 199, 'Mysore Rawa Onion Dosa': 219, 'Ginni Dosa': 219, 'Family Dosa': 249, 'Idli Sambar': 139, 'Idli Chaat (Raj Delight Special)': 189, 'Vada Sambar': 149, 'Plain Uttapam': 109, 'Onion Uttapam': 139, 'Masala Uttapam': 129, 'Paneer Uttapam': 149, 'Cheese Uttapam': 169, 'South Indian Platter (Raj Delight Special)': 269 },
  'Starters Smart': { 'Pav Bhaji': 119, 'Chole Bhature': 120, 'Cheese Pav Bhaji': 139, 'Extra Pav': 40, 'Extra Bhatura (1 Pc)': 30 },
  'Dessert': { 'Gulab Jamun (1 Pcs)': 39, 'Gulab Jamun (with ice cream)': 69, 'Halwa (seasonal)': 119, 'White Sponge (1 Pcs)': 29, 'Fruit Cream(Seasonal)': 79 },
  'Variety Of Ice Cream': { 'Vanilla Ice Cream': 99, 'Chocolate Ice Cream': 99, 'Butter Scotch Ice Cream': 139, 'Strawberry Ice Cream': 99, 'Tutti Frutti Ice Cream': 129, 'Black Current Ice Cream': 149, 'American Nut Ice Cream': 149, 'Belgium Ice Cream': 159, 'Brownie Sizzler': 259 },
  'Kitty Menu': { 'Chole Bhature': 120, 'Mangore': 210, 'Mix Pakoda': 210, 'Aloo Pakoda': 119, 'Pyaz Pakoda': 119, 'Paneer Pakoda': 229, 'Fried Idli': 199, 'Sweet Corn': 199, 'Mong Daal Chila': 139, 'Veg Poha': 149, 'Aloo Tikki': 50 },
};

const aliases: Record<string, string> = {
  'butterscotch shake': 'Butter Scotch Shake',
  'black currant shake': 'Black Current Skake',
  'panner butter masala': 'Panner Butter Masala',
  'paneer butter masala': 'Panner Butter Masala',
  'chinese sizzler': 'Chinesse Sizzler',
  'chole bhature kitty': 'Chole Bhature',
  'chole bhature kitty menu': 'Chole Bhature',
  'fresh lime soda sweet': 'Fresh Lime Soda (Sweet/Salt/Mix)',
  'fresh lime soda salt': 'Fresh Lime Soda (Sweet/Salt/Mix)',
  'fresh lime soda mix': 'Fresh Lime Soda (Sweet/Salt/Mix)',
  'singapore noodles': 'Singapori Noodles',
  'paneer steam momos': 'Steem Paneer Momos',
  'veg steam momos': 'Steem Veg Momos',
  'pan fried chilli garlic momos': 'Pan Fryed Chilli Garlic Momos',
  'stuffed garlic bread': 'Stuff Garlic Bread',
  'rajasthani thali special': 'Rajsthani Thali (Special)',
  'south indian platter': 'South Indian Platter (Raj Delight Special)',
  'gulab jamun 1 pc': 'Gulab Jamun (1 Pcs)',
  'gulab jamun with ice cream': 'Gulab Jamun (with ice cream)',
  'white sponge 1 pc': 'White Sponge (1 Pcs)',
  'butterscotch ice cream': 'Butter Scotch Ice Cream',
  'black currant ice cream': 'Black Current Ice Cream',
  'mushroom mutter masala': 'Mushroom Masala Mutter'
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');

export function getMenuPrice(category: string, item: string): number | null {
  const direct = menuPrices[category]?.[item];
  if (typeof direct === 'number') return direct;
  const alias = aliases[normalize(item)];
  if (alias && menuPrices[category]?.[alias] !== undefined) return menuPrices[category][alias];
  const needle = normalize(item);
  const match = Object.entries(menuPrices[category] ?? {}).find(([name]) => normalize(name) === needle);
  return match ? match[1] : null;
}
