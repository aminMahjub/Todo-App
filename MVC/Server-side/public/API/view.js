class View {
  constructor() {
    this.btnAdd = document.querySelector(".add-task");
    this.inputValue = document.querySelector("input");
    this.todoList = document.querySelector(".todo-list");
    this.filterElement = document.getElementsByClassName("filter")[0];
    this.defaultFilter = document.querySelector('.default');
    this.uploadBtn = document.querySelector('.upload-btn');
    this.downlaodBtn = document.querySelector('.download-btn');
    this.username = document.querySelector('.user-name');
    this.signUpLink = document.querySelector('.signup-link')
    this.signInLink = document.querySelector('.signin-link')
    this.signaOutLink = document.querySelector('.signout-link')
  }
  
  bindAddBtn = (handleBindAddBtn) => {
    this.btnAdd.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.inputValue.value == "") alert("Your Input is Empty");
      else {
        handleBindAddBtn(this.inputValue.value);
      }
      this.inputValue.value = "";
    });
  };

  renderPage = (taskList) => {

    this.todoList.innerHTML = "";

    this.addTask(taskList);
  };

  addTask = (taskList) => {
    taskList.forEach(element => {
      const {id,edit,done,text} = element;
      let li = document.createElement("li");

      li.classList.add("li-item");
      li.textContent = text;
      li.id = `${id}`;

      if (done) {
        li.classList.remove("complete-btn");
        li.classList.add("complete-status");
      }

      if (edit) {
        li.contentEditable = true;
      }

      this.bindCreateBtn("delete-btn", "Delete", li);
      this.bindCreateBtn("edit-btn", "Edit", li);
      this.bindCreateBtn("complete-btn", "Complete", li);
      this.todoList.appendChild(li);
    });
  }

  bindCreateBtn = (classButton, btnText, li) => {
    let createButton = document.createElement("button");
    li.appendChild(createButton);

    createButton.className = classButton;
    createButton.textContent = btnText;
  };

  bindDeleteBtn = (handleDeleteTask) => {
    this.todoList.addEventListener("click", (event) => {
      let deleteButton = event.target;
      if (deleteButton.classList.contains("delete-btn")) {
        let deleteBtnParent = deleteButton.parentElement;
        let deleteBtnId = deleteBtnParent.id;
        handleDeleteTask(deleteBtnId);
      }
    });
  };

  bindCompleteBtn = (handleCompleteTask) => {
    this.todoList.addEventListener("click", (event) => {
      let completeButton = event.target;
      if (completeButton.classList.contains("complete-btn")) {
        let completeBtnParent = completeButton.parentElement;
        let completeBtnId = completeBtnParent.id;
        handleCompleteTask(completeBtnId);
      }
    });
  };

  bindEditBtn = (handleEditTask) => {
    this.todoList.addEventListener("click", (event) => {
      let editButton = event.target;
      if (editButton.classList.contains("edit-btn")) {
        let editBtnParent = editButton.parentElement;
        handleEditTask(editBtnParent);
      }
    });
  };

  bindFilterTask = (handleFilterTasks) => {
    this.filterElement.addEventListener("change", event => {
      event.preventDefault();
      let filterELChild = this.filterElement.value.toLowerCase();
      switch(filterELChild) {
        case 'all': {
          this.defaultFilter.textContent = 'All';
          break
        }
        case 'completed': {
          this.defaultFilter.textContent = 'Completed';
          break
        }
        case 'active': {
          this.defaultFilter.textContent = 'Active';
          break
        }

      }
      handleFilterTasks(filterELChild);  
      })
  };  

  bindUploadTasks = (handleUploadTask) => {
    this.uploadBtn.addEventListener("click", (event) => {
      event.preventDefault();
      handleUploadTask();
      alert('data uploaded from app');
    });
  }

  bindDownlaodTasks = (handleDownloadTask) => {
    this.downlaodBtn.addEventListener("click", (event) => {
      event.preventDefault();
      handleDownloadTask();
      alert('data applied to app');
    });
  }
  
  userInfo = (userInfo, userStatus) => {
    this.username.textContent = userInfo;
    debugger
    if (userStatus === 'realuser') {
      this.signInLink.style.display = 'none';
      this.signUpLink.style.display = 'none';
    } else {
      this.signInLink.style.display = 'none';
      this.signaOutLink.style.display = 'none';
    }

  }
}

export default View;
