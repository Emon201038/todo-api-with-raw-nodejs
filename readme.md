# Todo API with Raw Node.js

A simple and lightweight Todo API built using raw Node.js without any external frameworks. This project demonstrates how to create a RESTful API using only Node.js core modules.

## 🚀 Features

- ✅ Create, read, update, and delete todos
- 📁 File-based data storage
- 🔧 Built with vanilla Node.js (no frameworks)
- 🎯 RESTful API design
- 📝 JSON request/response handling
- ⚡ Lightweight and fast

## 📁 Project Structure

```
todo-api-with-raw-nodejs/
├── db/                 # Database/storage related files
├── helper/             # Utility functions and helpers
├── index.js           # Main server file
└── README.md          # Project documentation
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Emon201038/todo-api-with-raw-nodejs.git
   cd todo-api-with-raw-nodejs
   ```

2. **Start the server**
   ```bash
   node index.js
   ```

3. **The server will start running on** `http://localhost:3000` (or your configured port)

## 📚 API Endpoints

### Get All Todos
```http
GET /todos
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Sample Todo",
      "description": "This is a sample todo",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Todo
```http
GET /todos/:id
```

### Create New Todo
```http
POST /todos
Content-Type: application/json

{
  "title": "New Todo",
  "description": "Todo description"
}
```

### Update Todo
```http
PUT /todos/:id
Content-Type: application/json

{
  "title": "Updated Todo",
  "description": "Updated description",
  "completed": true
}
```

### Delete Todo
```http
DELETE /todos/:id
```

## 🧪 Testing the API

You can test the API using various tools:

### Using cURL

**Get all todos:**
```bash
curl http://localhost:3000/todos
```

**Create a new todo:**
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Build APIs with raw Node.js"}'
```

**Update a todo:**
```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Build APIs with raw Node.js", "completed": true}'
```

**Delete a todo:**
```bash
curl -X DELETE http://localhost:3000/todos/1
```

### Using Postman or Thunder Client

1. Import the API endpoints into your preferred API testing tool
2. Set the base URL to `http://localhost:3000`
3. Test each endpoint with appropriate request bodies

## 🏗️ Architecture

This project follows a simple architecture pattern:

- **index.js**: Main server file that handles HTTP requests and routing
- **helper/**: Contains utility functions for data manipulation, validation, etc.
- **db/**: Handles data storage and retrieval (likely JSON file-based storage)

## 🔧 Configuration

The server configuration can be modified in the main `index.js` file:

- **Port**: Default is 3000, can be changed via environment variable
- **CORS**: Configure cross-origin requests if needed
- **Data Storage**: Modify database connection or file paths

## 📝 Data Storage

This API uses file-based storage for simplicity. Todo data is stored in JSON format within the `db` directory. For production use, consider integrating with a proper database like:

- MongoDB
- PostgreSQL
- MySQL
- SQLite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Emon201038**
- GitHub: [@Emon201038](https://github.com/Emon201038)

## 🙏 Acknowledgments

- Built with vanilla Node.js
- Inspired by the need for lightweight API solutions
- Great for learning Node.js fundamentals

---

⭐ If you found this project helpful, please give it a star!
```

