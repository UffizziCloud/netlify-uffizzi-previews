class productService {
  static getTodos = async (page, limit) => {
    return await fetch(
      process.env.REACT_APP_API_URL +
        "?page=" +
        `${page}` +
        "&limit=" +
        `${limit}` //passing 'limit' and 'page' as query parameters to node.js server
    ).then(
      (response) => response.json() // Converting received data to JSON
    );
  };

  static getTodoByParams = async (searchBy) => {
    return await fetch(
      process.env.REACT_APP_API_URL + "/" + `${searchBy}`
    ).then((response) => response.json());
  };

  static getPendingTodo = async (id) => {
    return await fetch(process.env.REACT_APP_API_URL + "/pending ").then(
      (response) => response.json()
    );
  };

  static getCompletedTodo = async () => {
    return await fetch(process.env.REACT_APP_API_URL + "/completed").then(
      (response) => response.json()
    );
  };

  static createTodo = async (data) => {
    return await fetch(process.env.REACT_APP_API_URL + "/create", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  static updateTodo = async (data, id) => {
    return await fetch(process.env.REACT_APP_API_URL + "/update/" + `${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data, id),
    }).then((response) => response.json());
  };

  static deleteTodo = async (id) => {
    return await fetch(process.env.REACT_APP_API_URL + "/delete/" + `${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  };

  static deleteTodos = async () => {
    return await fetch(process.env.REACT_APP_API_URL + "/delete", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  };
}
export default productService;
