class Controller {
  constructor(View, Model) {
    this.view = View;
    this.model = Model;

    this.view.bindAddBtn(this.handleBindAddBtn);
    this.view.bindCompleteBtn(this.handleCompleteTask);
    this.view.bindDeleteBtn(this.handleDeleteTask);
    this.view.bindEditBtn(this.handleEditTask);
    this.view.bindFilterTask(this.handleFilterTasks);
    this.model.bindRenderPage(this.handleRenderPage);
    this.model.bindUserInfo(this.handeUserInfo);
    this.view.bindUploadTasks(this.handleUploadTask);
    this.view.bindDownlaodTasks(this.handleDownloadTask);
  }

  handleFilterTasks = (filterELChild) => {
    this.model.filterTasks(filterELChild);
  };

  handleBindAddBtn = (taskText) => {
    this.model.addData(taskText);
  };

  handleCompleteTask = (completeBtnId) => {
    this.model.completeTask(completeBtnId);
  };

  handleDeleteTask = (deleteBtnId) => {
    this.model.removeTask(deleteBtnId);
  };

  handleEditTask = (editBtnParent) => {
    this.model.editTask(editBtnParent);
  };
  
  handleRenderPage = (taskList) => {
    this.view.renderPage(taskList);
  };

  handleUploadTask = () => {
    this.model.uploadTask();
  }

  handleDownloadTask = () => {
    this.model.downloadTask();
  }

  handeUserInfo = (userInfo) => {
    this.view.userInfo(userInfo)
  }
  

}

export default Controller;