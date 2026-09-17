// task-->01
{
  //
  // final tasks-01 solved------------------------------>585
  // Create TodoApp class
  // Requirement: A class TodoApp with property todos (array).
  class TodoApp {
    constructor() {
      this.todos = []; // will store all tasks
    }
  }

  const myTodos = new TodoApp();
  console.log(myTodos); // { todos: [] }
  //
}

// task-->02
{
  //
  // final tasks-02 solved------------------------------>586
  // Add addTodo method
  // Requirement: Add new task with 3 parameters — name, time, category.
  // Task must have default completed = false.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(name, category, time) {
      const categories = [
        "Study",
        "Entertainment",
        "Personal",
        "Health",
        "Learning",
      ];

      if (!categories.includes(category)) {
        console.log(`Invalid category! Choose from: ${categories.join(", ")}`);
        return;
      }

      const newTodo = {
        name,
        category,
        time,
        completed: false,
      };

      this.todos.push(newTodo);
      console.log(`Task "${name}" added ✅`);
    }
  }

  // Example
  const myTodos = new TodoApp();
  myTodos.addTodo("Math Homework", "Study", "2 hours");
  myTodos.addTodo("Watch Movie", "Entertainment", "3 hours");

  console.log(myTodos.todos);
  //
}

// task-->03
{
  //

  // final tasks-03 solved------------------------------>587
  // Add completeTodo method
  // Requirement: Find task by name -- mark completed = true.
  // If found -- return true, else false.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(name, category, time) {
      const categories = [
        "Study",
        "Entertainment",
        "Personal",
        "Health",
        "Learning",
      ];
      if (!categories.includes(category)) {
        console.log("Invalid category!");
        return;
      }
      this.todos.push({ name, category, time, completed: false });
    }

    completeTodo(name) {
      const todo = this.todos.find((t) => t.name === name);
      if (todo) {
        todo.completed = true;
        console.log(`Task "${name}" completed ✅`);
        return true;
      } else {
        console.log(`Task "${name}" not found ❌`);
        return false;
      }
    }
  }

  // Example
  const myTodos = new TodoApp();
  myTodos.addTodo("Math Homework", "Study", "2 hours");
  myTodos.completeTodo("Math Homework");
  console.log(myTodos.todos);

  //
}

// task-->04
{
  //
  // final tasks-04 solved------------------------------>588
  // Add removeTodo method
  // Requirement: Remove task by name.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(name, category, time) {
      const categories = [
        "Study",
        "Entertainment",
        "Personal",
        "Health",
        "Learning",
      ];
      if (!categories.includes(category)) {
        console.log("Invalid category!");
        return;
      }
      this.todos.push({ name, category, time, completed: false });
    }

    completeTodo(name) {
      const todo = this.todos.find((t) => t.name === name);
      if (todo) {
        todo.completed = true;
        console.log(`Task "${name}" completed ✅`);
        return true;
      }
      console.log(`Task "${name}" not found ❌`);
      return false;
    }

    removeTodo(name) {
      const index = this.todos.findIndex((t) => t.name === name);
      if (index !== -1) {
        this.todos.splice(index, 1);
        console.log(`Task "${name}" removed 🗑️`);
      } else {
        console.log(`Task "${name}" not found ❌`);
      }
    }
  }

  // Example
  const myTodos = new TodoApp();
  myTodos.addTodo("Math Homework", "Study", "2 hours");
  myTodos.addTodo("Watch Movie", "Entertainment", "3 hours");
  myTodos.removeTodo("Watch Movie");
  console.log(myTodos.todos);

  //
}

// task-->05
{
  //
  // final tasks-05 solved------------------------------>589
  // displayTodoList
  /**
   * Requirement:

Show all todos (name, category, time, completed).

If a parameter is given (e.g., "Study"), then only show todos of that category.

   */
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(name, category, time) {
      const categories = [
        "Study",
        "Entertainment",
        "Personal",
        "Health",
        "Learning",
      ];
      if (!categories.includes(category)) {
        console.log("Invalid category!");
        return;
      }
      this.todos.push({ name, category, time, completed: false });
    }

    displayTodoList(category = null) {
      if (this.todos.length === 0) {
        console.log("No tasks available.");
        return;
      }

      let filtered = this.todos;
      if (category) {
        filtered = this.todos.filter((t) => t.category === category);
      }

      if (filtered.length === 0) {
        console.log(`No tasks found for category "${category}".`);
        return;
      }

      console.log("📌 Todo List:");
      filtered.forEach((todo) => {
        console.log(
          `- ${todo.name} | Category: ${todo.category} | Time: ${todo.time} | Completed: ${todo.completed}`
        );
      });
    }
  }

  // Example
  const myTodos = new TodoApp();
  myTodos.addTodo("Math Homework", "Study", "2 hours");
  myTodos.addTodo("Gym", "Health", "1 hour");
  myTodos.displayTodoList(); // show all
  myTodos.displayTodoList("Health"); // show only Health

  //
}

// task-->06
{
  //
  // final tasks-06 solved------------------------------>590
  // hoursWorked
  // Requirement: Total hours of all completed tasks.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(name, category, time) {
      this.todos.push({ name, category, time, completed: false });
    }

    completeTodo(name) {
      const todo = this.todos.find((t) => t.name === name);
      if (todo) todo.completed = true;
    }

    hoursWorked() {
      // Assuming time is in "X hours" format
      return this.todos
        .filter((t) => t.completed)
        .reduce((sum, t) => sum + parseInt(t.time), 0);
    }
  }

  // Example
  const myTodos = new TodoApp();
  myTodos.addTodo("Math Homework", "Study", "2 hours");
  myTodos.addTodo("Gym", "Health", "1 hour");
  myTodos.completeTodo("Math Homework");
  console.log("Total hours worked:", myTodos.hoursWorked()); // 2

  //
}

// task-->07
/**
 * {
    //
    // final tasks-07 solved------------------------------>591
    // timeNeeded
    // Requirement: Total hours of incomplete tasks.
    timeNeeded() {
  return this.todos
    .filter(t => !t.completed)
    .reduce((sum, t) => sum + parseInt(t.time), 0);
}
    // 
}

 */

// task-->08
{
  /**
 *     // final tasks-08 solved------------------------------>592
// editTodo
// Requirement: Update a task’s name, category, or time.
// If found and updated → return true. Otherwise false
editTodo(oldName, newName = null, newCategory = null, newTime = null) {
  const todo = this.todos.find(t => t.name === oldName);
  if (!todo) return false;

  if (newName) todo.name = newName;
  if (newCategory) todo.category = newCategory;
  if (newTime) todo.time = newTime;

  return true;
}

 */
}

// task-->09
{
  /**
 * //
// final tasks-09 solved------------------------------>593
// getTodo
getTodo(param) {
  return this.todos.find(t => t.name === param || t.category === param);
}
console.log(myTodos.getTodo("English Homework")); // single task
console.log(myTodos.getTodo("Health")); // first Health task

//
 */
}

// task-->10
{
  /**
 * {
    //
// final tasks-10 solved------------------------------>594
    // largestTodo
    // Requirement: Among all tasks, find the task with maximum time.
    largestTodo() {
  if (this.todos.length === 0) return undefined;

  return this.todos.reduce((max, t) => {
    return parseInt(t.time) > parseInt(max.time) ? t : max;
  });
}
}
 */
}

// task-->11
{
  /**
 * {
    //
// final tasks-11 solved------------------------------>595
    // smallestTodo
    smallestTodo() {
  const incompletes = this.todos.filter(t => !t.completed);
  if (incompletes.length === 0) return undefined;

  return incompletes.reduce((min, t) => {
    return parseInt(t.time) < parseInt(min.time) ? t : min;
  });
}
    //
}
 */
}

// task-->12
{
  /** 
 * {
    // final tasks-12 solved------------------------------>596
sortTodos() {
  return this.todos
    .filter(t => !t.completed)
    .sort((a, b) => parseInt(b.time) - parseInt(a.time));
}
console.log("Sorted Todos:", myTodos.sortTodos());

}
*/
}

// task-->13
{
  /** 
 * {
    // undoTodo
    // final tasks-13 solved------------------------------>597
    undoTodo(name) {
  const todo = this.todos.find(t => t.name === name);
  if (todo && todo.completed === true) {
    todo.completed = false;
    return true;
  }
  return false;
}

    //
}
*/
}

// task-->14
{
  /**
 *    // final tasks-14 solved------------------------------>598
    // completedPercentage
    // Requirement: Return how many % of tasks are completed (0–100%).
    completedPercentage() {
  if (this.todos.length === 0) return 0;

  const completedCount = this.todos.filter(t => t.completed).length;
  return (completedCount / this.todos.length) * 100;
}

 */
}

// task-->15
{
  /**
 * {
    //
    // final tasks-15 solved------------------------------>599
    // importTodos
    // Requirement: Take a JSON string, parse it, and add each todo to the list.
    importTodos(jsonString) {
  try {
    const tasks = JSON.parse(jsonString);
    if (Array.isArray(tasks)) {
      tasks.forEach(task => {
        this.todos.push({
          name: task.name,
          category: task.category,
          time: task.time,
          completed: task.completed || false
        });
      });
    }
  } catch (error) {
    console.log("Invalid JSON string!");
  }
}

    //
}

 */
}

// task-->16
{
  /**
 * // final tasks-16 solved------------------------------>600
 * clearAllTodos
 * Requirement: Clear the entire list (remove all todos).
 * clearAllTodos() {
  this.todos = [];
  console.log("All todos cleared");
}
  myTodos.clearAllTodos();
console.log(myTodos.todos); // []


 */
}

// ------------------Finished 600-js-problem-solves------------------------------->
