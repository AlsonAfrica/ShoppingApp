# Shopping List Application

A React-based shopping list application that uses Redux for state management and provides a seamless experience for managing your shopping needs.

## Features

- Create and manage shopping lists with ease
- Mark items as purchased
- Edit item names and quantities
- Delete items from your list
- Persistent storage across sessions
- Real-time user feedback and error handling
- Responsive and user-friendly interface

## Technologies Used

- React.js
- Redux for state management
- Async Local Storage for data persistence
- React Icons

## Installation

1. Clone the repository:
```bash
https://github.com/AlsonAfrica/ShoppingApp.git
```

2. Navigate to the project directory:
```bash
cd ShoppingApp
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npx expo start
```

## Project Structure

<img width="177" alt="image" src="https://github.com/user-attachments/assets/16a4b24e-1e87-4496-a861-8da06cda61b1" />


## State Management

The application uses Redux for state management with the following structure:

### Actions
- `addItem`: Adds a new item to the shopping list
- `editItem`: Modifies an existing item's properties
- `deleteItem`: Removes an item from the list
- `togglePurchased`: Marks an item as purchased/unpurchased

### State Shape
```javascript
{
  items: [
    {
      id: string,
      name: string,
      quantity: number,
      isPurchased: boolean
    }
  ]
}
```

## Local Storage

The application automatically saves the shopping list to Async Local Storage  whenever changes are made. The data is loaded when the application starts, ensuring persistence across sessions.

## Error Handling

The application includes comprehensive error handling for:
- Empty item names
- Invalid quantities
- Duplicate items
- Storage failures

## User Feedback

Users receive visual feedback through:
- Success messages for successful actions
- Error messages for failed operations
- Visual confirmation for completed actions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Documentation
- Please follow the link to the App Documentation: https://docs.google.com/document/d/1yf2tV-oo8jAfl2yB2SfdiV7yND1Qfg2JNIDJG8UFCmo/edit?usp=sharing

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Contact

Your Name - nhlakaniphoradebe337@gmail.com
Project Link: https://github.com/AlsonAfrica/ShoppingApp.git

