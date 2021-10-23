const uploadBtn = document.querySelector('.upload-btn');
const downloadBtn = document.querySelector('.download-btn');

class Model {
  constructor() {
    this.status = "all";
    this.saveStatus = localStorage.getItem('Status');
    this.saveTodos = localStorage.getItem('Todos');
    this.tasksList = [];

    if (this.saveTodos) {
      this.tasksList = JSON.parse(this.saveTodos); 
    }
    if (this.saveStatus) {
      this.status = this.saveStatus;     
    }
    this.option = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(this.tasksList)
    }
  }

  bindRenderPage = (handleRenderPage) => {
    this.handleRenderPage = handleRenderPage;
    this.filterTasks(this.status);
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
    localStorage.setItem('Todos', JSON.stringify(this.tasksList))
  };

  removeTask = (handleDeleteTask) => {
    this.tasksList = this.tasksList.filter((task) => {
      return task.id != handleDeleteTask;
    });
    this.handleRenderPage(this.tasksList);
    localStorage.setItem('Todos', JSON.stringify(this.tasksList))
  };

  completeTask = (handleCompleteTask) => {
    for (let task of this.tasksList) {
      if (handleCompleteTask == task.id) {
        task.done = !task.done;
      }
    }
    this.handleRenderPage(this.tasksList);
    localStorage.setItem('Todos', JSON.stringify(this.tasksList))
  };

  uploadTask = async() => {
    await fetch('http://localhost:9090/upload', this.option);
  }

  downloadTask = async() => {
    const url = 'http://localhost:9090/download';
    const res = await fetch(url);
    const data = await res.json();
    this.tasksList = data;
    console.log(this.tasksList);
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

uploadBtn.addEventListener('click', () => {  
  const model = new Model();
  model.uploadTask();
})

downloadBtn.addEventListener('click', () => {  
  const model = new Model();
  model.downloadTask();
})

export default Model;
