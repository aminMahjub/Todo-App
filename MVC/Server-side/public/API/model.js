class Model {
  constructor() {
    this.status = "all";
    this.tasksList = [];
    this.users = [];
    this.saveStatus = localStorage.getItem('Status');
    this.saveTodos = localStorage.getItem('Todos');
    this.validUser = { username: 'guest', password: null, status: null };


    if (this.saveTodos) {
      this.tasksList = JSON.parse(this.saveTodos); 
    }
    if (this.saveStatus) {
      this.status = this.saveStatus;     
    }
  }

  bindRenderPage = async (handleRenderPage) => {
    this.handleRenderPage = handleRenderPage;
    console.log(window.performance);
    await this.getUsers();
    await this.filterTasks(this.status);
  };

  bindUserInfo = (handleUserInfo) => {
    this.handleUserInfo = handleUserInfo;
  }

  addData = (taskText) => {
    let tasks = {
      text: taskText,
      id: this.tasksList.length,
      done: false,
      edit: false,
    };
    debugger
    this.tasksList.push(tasks);
    this.handleRenderPage(this.tasksList);
    localStorage.setItem('Todos', JSON.stringify(this.tasksList));
  };

  editTask = (handleEditTask) => {
    for (let task of this.tasksList) {
      if (handleEditTask.id == task.id) {
        task.edit = !task.edit;
        task.text = handleEditTask.childNodes[0].nodeValue;
      }
    }
    this.handleRenderPage(this.tasksList);
    localStorage.setItem('Todos', JSON.stringify(this.tasksList));
  };

  removeTask = (handleDeleteTask) => {
    debugger
    this.tasksList = this.tasksList.filter((task) => {
      return task.id != handleDeleteTask;
    });
    this.handleRenderPage(this.tasksList);
    localStorage.setItem('Todos', JSON.stringify(this.tasksList));
  };

  completeTask = (handleCompleteTask) => {
    for (let task of this.tasksList) {
      if (handleCompleteTask == task.id) {
        task.done = !task.done;
      }
    }
    this.handleRenderPage(this.tasksList);
    localStorage.setItem('Todos', JSON.stringify(this.tasksList));
  };

  uploadTask = async () => {
    debugger
    await this.saveTodoInUser('uploadtask');
    console.log(this.users);
    this.option = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(this.users)
    }
    await fetch('http://localhost:9090/upload', this.option);

  }

  downloadTask = async () => {
    const url = 'http://localhost:9090/download';
    const res = await fetch(url);
    const data = await res.json();
    this.users = data;
    debugger
    await this.saveTodoInUser('downloadtask');
  }

  getUsers = async () => {
    const url = 'http://localhost:9090/sendUsers';
    const res = await fetch(url);
    const data = await res.json();
    this.users = data; 
    console.log(this.users);
    await this.bindGetValidUser();
  }

  saveTodoInUser = async(status) => {
    this.users.forEach((user) => {
      if (user.userName == this.validUser.username) {
        if (user.password == this.validUser.password) {
          console.log(user.todo, this.users);
          if (status === 'downloadtask') {
            this.tasksList = user.todo;
            this.handleRenderPage(this.tasksList);
            localStorage.setItem('Todos', JSON.stringify(this.tasksList));
          } else {
            user.todo = this.tasksList;
            this.sendFinallTodoUser();
          }
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
    this.validUser = { username: data[1], password: data[0] , status: data[2] }
    this.handleUserInfo(this.validUser.username, this.validUser.status);
  }

  filterTasks = async(handleFilterTasks) => {
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
    localStorage.setItem('Todos', JSON.stringify(filterTask));
  };
}

export default Model;
