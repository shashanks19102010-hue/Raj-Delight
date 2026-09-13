export type MenuCategory = {
  name: string;
  items: string[];
};

// Public menu names currently visible on the restaurant's Zomato listing.
// Prices are intentionally omitted because the live listing gates prices behind login.
export const menuCategories: MenuCategory[] = [
  { name: 'Warm & Cozy', items: ['Black Coffee', 'Black Tea', 'Coffee (hot)', 'Green Tea', 'Lemon Tea', 'Masala Tea (hot)', 'Tea (hot)'] },
  { name: 'Shake It Up', items: ['Butter Scotch Shake', 'Black Current Skake', 'Strawberry Shake', 'Chocolate Shake', 'Cold Coffee', 'Banana Shake', 'Belgian Chocolate Shake', 'Choco Brownie Shake', 'Choco Cookies Shake', 'Choco Fudge Shake', 'Choco Hazelnut Shake', 'Choco Muffin Shake', 'Choco Nutella Shake', 'Cold Coffee (with Ice Cream)', 'Kit Kat Shake', 'Mango Shake', 'Oreo Shake', 'Shikanji', 'Vanilla Shake'] },
  { name: 'Fizzy Mocktails', items: ['Fruit Punch', 'Aam Panna', 'Blue Lagoon', 'Fresh Lime Soda (mix)', 'Fresh Lime Soda (salt)', 'Fresh Lime Soda (sweet)', 'Ice Tea', 'Mango Cooler', 'Mint Mojito', 'Orange Mojito', 'Virgin Mojito'] },
  { name: 'Soulful Soups', items: ['Manchow Soup', 'Thupka Soup', 'Cream Of Tomato Soup', 'Cream Of Mushroom Soup', 'Hot & Sour Soup', 'Lemon Coriander Soup', 'Sweet Corn Soup', 'Veg Clear Soup'] },
  { name: 'Lassi', items: ['Punjabi Lassi (sweet)', 'Butter Milk (masala Chhas)'] },
  { name: 'Tandoori Station', items: ['Tandoori Paneer Tikka', 'Tandoori Masala Chaap', 'Tandoori Malai Chaap', 'Tandoori Achari Paneer Tikka', 'Dahi Ke Kabab', 'Tandoori Achaari Chaap', 'Chilli Paneer Roll', 'Afghani Soya Chaap', 'Dahi Ke Shole', 'Hara Bhara Kabab', 'Malai Paneer Tikka Roll', 'Paneer Tikka Roll', 'Tandoori Broccoli', 'Tandoori Chaap Roll', 'Tandoori Mushroom Tikka', 'Tandoori Paneer Malai Tikka', 'Tandoori Paneer Tikka Saslik', 'Tandoori Pineapple Tikka', 'Tandoori Pudina Paneer Tikka', 'Tandoori Pudina Soya Chaap', 'Tandoori Soya Chaap', 'Tandoori Stuffed Aloo', 'Tandoori Stuffed Mushroom Tikka', 'Tandoori Veg Seekh Kabab'] },
  { name: 'Indian Main Course', items: ['Kadhai Paneer', 'Paneer Lababdar (special)', 'Shahi Paneer', 'Panner Butter Masala', 'Handi Paneer', 'Mushroom Masala', 'Malai Kofta', 'Punjabi Aloo', 'Paneer Makhani', 'Mix Veg', 'Kadhai Soya Chaap', 'Kashmiri Dum Aloo', 'Corn Palak', 'Gobhi Adraki', 'Jalfrezi', 'Jeera Aloo', 'Kadhai Mushroom', 'Lucknowi Kofta', 'Methi Mutter Malai', 'Mushroom Do Pyaza', 'Mushroom Mutter Masala', 'Mutter Paneer', 'Navratan Korma', 'Nizami Handi (hyderabadi)', 'Palak Paneer', 'Paneer Changezi (flavoured By Raj)', 'Paneer Do Pyaza', 'Paneer Kali Mirch', 'Paneer Rogan Josh (flavoured By Raj)', 'Paneer Tikka Masala', 'Pindi Chana Masala', 'Soya Chaap Tikka Masala'] },
  { name: 'Dal Delight', items: ['Dal Makhani (special)', 'Yellow Dal Tadka', 'Dal Fry', 'Dal Handi (amritsari)', 'Dal Panchrangi'] },
  { name: 'Rice', items: ['Jeera Rice', 'Kashmiri Pulao (special)', 'Matar Pulao', 'Steam Rice', 'Veg Pulao'] },
  { name: 'Biryani', items: ['Veg Hyderabadi Biryani (special)', 'Paneer Tikka Biryani', 'Veg Biryani'] },
  { name: 'Raita', items: ['Boondi Raita', 'Fruit Raita', 'Mix Veg Raita', 'Pineapple Raita', 'Plain Curd'] },
  { name: 'Salad', items: ['Cucumber Salad', 'Garden Green Salad', 'Kimchi Salad', 'Onion Salad'] },
  { name: 'Indian Breads', items: ['Bread Basket (raj Delight Special)', 'Butter Naan', 'Butter Roti', 'Cheese Naan', 'Garlic Naan', 'Kashmiri Naan', 'Laccha Paratha', 'Missi Roti', 'Onion Missi Roti', 'Plain Naan', 'Plain Roti', 'Rumali Roti', 'Stuffed Naan', 'Tava Roti Butter', 'Tava Roti Plain'] },
  { name: 'Paratha', items: ['Aloo Paratha', 'Paneer Paratha', 'Gobhi Paratha', 'Green Chilli Paratha', 'Mix Veg Paratha', 'Onion Paratha'] },
  { name: 'Papad', items: ['Fry Papad', 'Masala Papad', 'Plain Papad'] },
  { name: 'Chinese Appetizers', items: ['Crispy Corn Salt & Pepper', 'Honey Chilli Potato', 'Spring Roll', 'Chilli Soya Chaap', 'Chilli Potato', 'Veg Manchurian Dry', 'Crispy Baby Corn', 'American Corn', 'Chilli Baby Corn', 'Chilli Mushroom', 'Chilli Paneer Dry', 'Crispy Veggies (salt & Pepper)', 'Paneer Green Garlic', 'Paneer Manchurian Dry', "Paneer'65", 'Paneer-in-hot Garlic (raj Delight Special)'] },
  { name: 'Dumplings', items: ['Paneer Steem Momos', 'Tandoori Veg Momos', 'Paneer Kurkure Momos', 'Veg Steem Momos', 'Tandoori Paneer Momos', 'Pan Fryed Chilli Garlic Momos', 'Veg Kurkure Momos'] },
  { name: 'Saucy Delighats', items: ['Manchurian Gravy', 'Chilli Paneer Gravy', 'Chilli Mushroom Gravy', 'Veg Hot Garlic Gravy'] },
  { name: 'Chinese Cuisine', items: ['Chilli Garlic Noodles', 'Chilli Garlic Fried Rice', 'Veg Noodles', 'Veg Fried Rice', 'Hakka Noodles', 'Paneer Noodles', 'Schezwan Fried Rice', 'Schezwan Noodles', 'Singapori Noodles'] },
  { name: 'Smokey Grills', items: ['Chinesse Sizzler', 'Tandoori Sizzler'] },
  { name: 'Continental', items: ['Classic Margherita Pizza', 'Double Cheese Margherita Pizza', 'Corn & Cheese Pizza', 'Farm House Pizza', 'Mushroom Mania', 'Neapolitan Pizza', 'Paneer Tikka Pizza'] },
  { name: 'Garlic Breads', items: ['Cheese Garlic Bread', 'Stuff Garlic Bread'] },
  { name: 'Delicious Burger', items: ['Cheese Burger', 'Cheese Jalapeno Burger', 'Cheese Paneer Burger', 'Classic Veg Burger', 'Jalapeno Burger', 'Paneer Burger'] },
  { name: 'Italian Pasta', items: ['Mix Sauce Pasta', 'White Sauce Pasta', 'Red Sauce Pasta'] },
  { name: 'Fries', items: ['French Fries', 'Peri Peri French Fries', 'Cheese French Fries', 'New York Style French Fries'] },
  { name: 'Sandwich', items: ['Double Decker Cheese Grilled Sandwich', 'Double Decker Grilled Sandwich', 'Paneer Grilled Sandwich', 'Tandoori Paneer Grilled Sandwich', 'Veg Cheese Grilled Sandwich', 'Veg Grilled Sandwich'] },
  { name: 'Special Thali', items: ['Raj Delight Delux Thali', 'Bajra Roti', 'Makka Roti', 'Rajsthani Thali (special)'] },
  { name: 'South Indian', items: ['Masala Dosa', 'Paneer Masala Dosa', 'Plain Dosa', 'Cheese Dosa', 'Cheese Uttapam', 'Chilli Paneer Dosa', 'Family Dosa', 'Ginni Dosa', 'Idli Chaat (raj Delight Special)', 'Idli Sambar', 'Masala Uttapam', 'Mysore Masala Dosa', 'Mysore Onion Dosa', 'Mysore Paneer Dosa', 'Mysore Paneer Masala Dosa', 'Mysore Plain Dosa', 'Mysore Rawa Masala Dosa', 'Mysore Rawa Onion Dosa', 'Mysore Rawa Paneer Dosa', 'Onion Uttapam', 'Paneer Dosa', 'Paneer Uttapam', 'Plain Uttapam', 'Rawa Masala Dosa', 'Rawa Onion Dosa', 'Rawa Paneer Dosa', 'South Indian Platter', 'Spring Onion Dosa', 'Vada Sambar', 'Veg Uttapam'] },
  { name: 'Starters Smart', items: ['Pav Bhaji', 'Chole Bhature', 'Cheese Pav Bhaji', 'Extra Bhatura (1 Pcs)', 'Extra Pav'] },
  { name: 'Dessert', items: ['Fruit Cream (seasonal)', 'Gulab Jamun (1 Pcs)', 'Gulab Jamun (with Ice Cream)', 'Halwa (seasonal)', 'White Sponge (1 Pcs)'] },
  { name: 'Variety Of Ice Cream', items: ['American Nut Ice Cream', 'Belgium Ice Cream', 'Black Current Ice Cream', 'Brownie Sizzler', 'Butter Scotch Ice Cream', 'Chocolate Ice Cream', 'Strawberry Ice Cream', 'Tutti Frutti Ice Cream', 'Vanilla Ice Cream'] },
  { name: 'Kitty Menu', items: ['Veg Poha', 'Aloo Pakoda', 'Aloo Tikki', 'Chole Bhature [Kitty]', 'Fried Idli', 'Mangore', 'Mix Pakoda', 'Mong Daal Chila', 'Paneer Pakoda', 'Pyaz Pakoda', 'Sweet Corn'] },
  { name: 'Navratri Food', items: ['Nav. Aloo Onda', 'Nav. French Fries', 'Nav. Fruit Chaat', 'Nav. Fruit Cream', 'Nav. Gravy Aloo', 'Nav. Kuttu Pakore', 'Nav. Kuttu Puri', 'Nav. Lassi', 'Nav. Malai Tikka', 'Nav. Pineapple Tikka', 'Nav. Russian Salad', 'Nav. Sabudana Khichdi', 'Nav. Sabudana Pakore', 'Nav. Sitafal', 'Nav. Stuff Aloo', 'Navratri Thali'] },
  { name: "Drink's", items: ['Water', 'Soft Drink Big', 'Soft Drink Glass', 'Soft Drink Small'] },
];

export const allMenuItems = menuCategories.flatMap((category) =>
  category.items.map((name) => ({ name, category: category.name }))
);

export const menuItemCount = allMenuItems.length;
