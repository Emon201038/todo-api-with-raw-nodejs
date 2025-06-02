const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db/todo.json");

class Todo {
  getTodos() {
    const rawData = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(rawData);
  }

  async createTodo(title) {
    const todos = await fs.promises.readFile(dbPath, "utf-8");

    const newTodo = {
      id: Math.floor(1000 + Math.random() * 9000),
      title,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await fs.promises.writeFile(
      dbPath,
      JSON.stringify([...JSON.parse(todos), newTodo], null, 2)
    );
    return newTodo;
  }

  getTodoById(id) {
    const rawData = fs.readFileSync(dbPath, "utf-8");
    const todos = JSON.parse(rawData);

    return todos.find((todo) => todo.id == id);
  }

  async updateTodo(id, data) {
    const todos = await fs.promises.readFile(dbPath, "utf-8");
    const updatedTodos = JSON.parse(todos).map((todo) => {
      if (todo.id == id) {
        return { ...todo, ...data, updatedAt: new Date().toISOString() };
      } else {
        return todo;
      }
    });
    await fs.promises.writeFile(
      dbPath,
      JSON.stringify(updatedTodos, null, 2),
      "utf-8"
    );
    return updatedTodos.find((todo) => todo.id == id);
  }

  deleteTodo(id) {
    const todos = fs.readFileSync(dbPath, "utf-8");
    const todo = JSON.parse(todos).find((todo) => todo.id == id);
    if (!todo) {
      return null;
    }
    const updatedTodos = JSON.parse(todos).filter((todo) => todo.id != id);
    fs.writeFileSync(dbPath, JSON.stringify(updatedTodos, null, 2));

    return todo;
  }
}

module.exports = Todo;
