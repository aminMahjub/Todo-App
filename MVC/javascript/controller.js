class Controller {
  constructor(View, Model) {
    this.view = View;
    this.model = Model;

    this.view.bindAddBtn(this.handleBindAddBtn);
    this.model.bindRenderPage(this.handleRenderPage);
    this.view.bindCompleteBtn(this.handleCompleteTask);
    this.view.bindDeleteBtn(this.handleDeleteTask);
    this.view.bindEditBtn(this.handleEditTask);
    this.view.bindFilterTask(this.handleFilterTasks);
  }

  handleBindAddBtn = (taskText) => {
    this.model.addData(taskText);
  };

  handleRenderPage = (taskList) => {
    this.view.renderPage(taskList);
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

  handleFilterTasks = (filterELChild) => {
    this.model.filterTasks(filterELChild);
  };
}

export default Controller;