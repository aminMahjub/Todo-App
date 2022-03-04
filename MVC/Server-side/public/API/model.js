class Model {
  constructor() {
    this.status = "all";
    this.saveStatus = localStorage.getItem('Status');
    this.saveTodos = localStorage.getItem('Todos');
    this.tasksList = [];
    this.users = [];
    this.validUser = { username: 'guest', password: null };

    if (this.saveTodos) {
      this.tasksList = JSON.parse(this.saveTodos); 
    }
    if (this.saveStatus) {
      this.status = this.saveStatus;     
    }
  }

  bindRenderPage = async(handleRenderPage) => {
    this.handleRenderPage = handleRenderPage;
    this.getUsers();
    await this.saveTodoInUser();
    await this.filterTasks(this.status);
  };

  addData = (taskText) => {
    let tasks = {
      text: taskText,
      id: this.tasksList.length,
      done: false,
      edit: false,
    };
    debugger
    this.tasksList.push(tasks);
    this.saveTodoInUser();
  };

  editTask = (handleEditTask) => {
    for (let task of this.tasksList) {
      if (handleEditTask.id == task.id) {
        task.edit = !task.edit;
        task.text = handleEditTask.childNodes[0].nodeValue;
      }
    }
    this.saveTodoInUser();
  };

  removeTask = (handleDeleteTask) => {
    this.tasksList = this.tasksList.filter((task) => {
      return task.id != handleDeleteTask;
    });
    this.saveTodoInUser();
  };

  completeTask = (handleCompleteTask) => {
    for (let task of this.tasksList) {
      if (handleCompleteTask == task.id) {
        task.done = !task.done;
      }
    }
    this.saveTodoInUser();
  };

  uploadTask = async () => {
    this.option = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(this.tasksList)
    }
    await fetch('http://localhost:9090/upload', this.option);
  }

  downloadTask = async () => {
    const url = 'http://localhost:9090/download';
    const res = await fetch(url);
    const data = await res.json();
    this.tasksList = data;
    this.saveTodoInUser();
  }

  getUsers = async () => {
    const url = 'http://localhost:9090/sendUsers';
    const res = await fetch(url);
    const data = await res.json();
    this.users = data; 
    console.log(this.users);
    this.bindGetValidUser();
  }

  saveTodoInUser = () => {
    this.users.forEach(user => {
      if (user.userName == this.validUser.username) {
        if (user.password == this.validUser.password) {
          user.todo = this.tasksList;
          console.log(user.todo);
          this.handleRenderPage(user.todo, this.users);
          localStorage.setItem('Todos', JSON.stringify(user.todo));
          this.sendFinallTodoUser();
        }
      }
    });
  }

  sendFinallTodoUser = async() => {
    this.option = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(this.users)
    }
    await fetch('http://localhost:9090/getusers', this.option);
  }

  bindGetValidUser = async () => {
    const url = 'http://localhost:9090/transportuser';
    const res = await fetch(url);
    const data = await res.json();
    this.validUser = { username: data[1], password: data[0] }
    console.log(this.validUser);
  }

  filterTasks = (handleFilterTasks) => {
    this.status = handleFilterTasks;
    let filterTask = this.tasksList.filter((task) => {
      switch (this.status) {
        case "all": {
          localStorage.setItem('Status', this.status);
          return true;
        }
        case "completed": {
          localStorage.setItem('Status', this.status);
          if (task.done) {
            return true;
          } else {
            return false;
          }
        }
        case "active": {
          localStorage.setItem('Status', this.status);
          if (!task.done) {
            return true;
          } else {
            return false;
          }
        }
      }
    });
    this.handleRenderPage(filterTask);
  };
}

export default Model;
