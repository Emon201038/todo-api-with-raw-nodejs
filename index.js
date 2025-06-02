const http = require("http");
const Todo = require("./helper/todos");

http
  .createServer((req, res) => {
    const rawUrl = new URL(req.url, "http://localhost:8080");
    const pathname = rawUrl.pathname;
    const todo = new Todo();

    if (
      (pathname === "/todos" || pathname === "/todos/") &&
      req.method === "GET"
    ) {
      const todos = todo.getTodos();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          success: true,
          message: "Api is working",
          data: todos,
        })
      );
      res.end();
    } else if (pathname === "/todos" && req.method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", async () => {
        const parsedData = JSON.parse(data);
        const newTodo = await todo.createTodo(parsedData.title);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            success: true,
            message: "New todo is created",
            data: newTodo,
          })
        );

        res.end();
      });
    } else if (req.method === "GET" && /^\/todos\/[^\/]+$/.test(pathname)) {
      const todoId = pathname.split("/")[2];

      const singleTodo = todo.getTodoById(todoId);
      if (singleTodo) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            success: true,
            message: "Todo found",
            data: singleTodo,
          })
        );
        res.end();
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({ success: false, message: "Todo not found" })
        );
        res.end();
      }
    } else if (req.method === "PUT" && /^\/todos\/[^\/]+$/.test(pathname)) {
      const todoId = pathname.split("/")[2];
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", async () => {
        const parsedData = JSON.parse(data);

        // Only accept "title" and/or "isCompleted"
        const allowedFields = ["title", "isCompleted"];
        const keys = Object.keys(parsedData);
        const isValidUpdate = keys.every((key) => allowedFields.includes(key));

        const hasAtLeastOneField =
          "title" in parsedData || "isCompleted" in parsedData;

        if (!isValidUpdate || !hasAtLeastOneField) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.write(
            JSON.stringify({
              success: false,
              message:
                "Invalid data. Only 'title' and/or 'isCompleted' are allowed, and at least one is required.",
            })
          );
          return res.end();
        }

        const updatedTodo = await todo.updateTodo(todoId, parsedData);
        if (updatedTodo) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(
            JSON.stringify({
              success: true,
              message: "Todo updated successfull",
              data: updatedTodo,
            })
          );
          res.end();
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.write(
            JSON.stringify({ success: false, message: "Todo not found" })
          );
          res.end();
        }
      });
    } else if (req.method === "DELETE" && /^\/todos\/[^\/]+$/.test(pathname)) {
      const todoId = pathname.split("/")[2];
      const deletedTodo = todo.deleteTodo(todoId);
      if (deletedTodo) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            success: true,
            message: "Todo deleted successfull",
            data: deletedTodo,
          })
        );
        res.end();
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({ success: false, message: "Todo not found" })
        );
        res.end();
      }
    } else if (pathname === "/" && req) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ success: true, message: "Api is working" }));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ success: false, message: "Not found" }));
      res.end();
    }
  })
  .listen(8080, () => console.log("Server running on port 8080"));
