class Model {
  constructor() {
    this.tasksList = [];
    this.status = "all";
  }

  bindRenderPage = (handleRenderPage) => {
    this.handleRenderPage = handleRenderPage;
  };

  addData = (taskText) => {
    let tasks = {
      text: taskText,
      id: this.tasksList.length,
      done: false,
      edit: false,
    };

    this.tasksList.push(tasks);
    this.handleRenderPage(this.tasksList);
  };

  editTask = (handleEditTask) => {
    for (let task of this.tasksList) {
      if (handleEditTask.id == task.id) {
        task.edit = !task.edit;
        task.text = handleEditTask.childNodes[0].nodeValue;
      }
    }
    this.handleRenderPage(this.tasksList);
  };

  removeTask = (handleDeleteTask) => {
    this.tasksList = this.tasksList.filter((task) => {
      return task.id != handleDeleteTask;
    });
    this.handleRenderPage(this.tasksList);
  };

  completeTask = (handleCompleteTask) => {
    for (let task of this.tasksList) {
      if (handleCompleteTask == task.id) {
        task.done = !task.done;
      }
    }
    this.handleRenderPage(this.tasksList);
  };
  filterTasks = (handleFilterTasks) => {
    debugger;
    this.status = handleFilterTasks;
    let filteredTask = this.tasksList.filter((task) => {
      switch (this.status) {
        case "all": {
          return true;
        }
        case "completed": {
          if (task.done) {
            return true;
          } else {
            return false;
          }
        }
        case "active": {
          if (!task.done) {
            return true;
          } else {
            return false;
          }
        }
      }
    });
    this.handleRenderPage(filteredTask);
  };
}

export default Model;
