// console.log("Hello World!");

// const state = {
//     taskList: [
//         {
//             image: "",
//              title: "",
//              type: "",
//              description: "",
//         },
//          {
//             image: "",
//              title: "",
//              type: "",
//              description: "",
//         },
//          {
//             image: "",
//              title: "",
//              type: "",
//              description: "",
//         },
//          {
//             image: "",
//              title: "",
//              type: "",
//              description: "",
//         }
//     ]
// }

const state = {
  tasklist: [],
};

const taskcontents = document.querySelector(".task_contents");
const taskmodal = document.querySelector(".task_modal_body");

const htmlTaskContent = (id, title, description, type, url) => {
  return `
    <div class="col-md-6 col-lg-4 mt-3" id="${id}" key="${id}">
      <div class="card shadow-sm task_card">
        <div class="card-header d-flex justify-content-end task_card+header">
          <button type="button" class="btn btn-outline-info mr-2 edit-button" name="${id} onclick="editTask.apply(this,arguments)">
            <i class="fas fa-pencil-alt" name="${id}"></i>
          </button>
          <button type="button" class="btn btn-outline-danger mr-2 delete-button" name="${id}" onclick="deletetask.apply(this,arguments)">
            <i class="fas fa-trash-alt" name="${id}"></i>
          </button>
        </div>
        <div class="card-body">
          ${
            url
              ? `<img width="100%" src="${url}" alt="card Image cap" class="card_image_top md-3 rounded-lg"/>`
              : `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADp8Q9+nG9anuOrfAAAAABJRU5ErkJggg==" alt="card Image cap" class="card_image_top md-3 rounded-lg"/>`
          }
          <h4 class="card-title">${title}</h4>
          <p class="card-text trim-3-lines text-muted">${description}</p>
          <div class="tags text-white d-flex flex-wrap">
            <span class="badge bg-primary m-1">${type}</span>
          </div>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showtask"  id=${id} onclick="openTask.apply(this,arguments)">open Task</button>
        </div>
      </div>
    </div>
  `;
};

const htmlModalContent = (id, title, description, url) => {
  const date = new Date(parseInt(id));
  return `
  <div id=${id}>
  ${
    url
      ? `<img width="100%" src="${url}" alt="card Image cap" class="card_image_top md-3 rounded-lg"/>`
      : `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADp8Q9+nG9anuOrfAAAAABJRU5ErkJggg==" alt="card Image cap" class="card_image_top md-3 rounded-lg"/>`
  }

<strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
  <h2 class="my-3">${title}</h2>
  <p class="lead">${description}</p>

  </div>
  
  `;
};

const updateLocalStorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.tasklist,
    })
  );
};

const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("task"));

  if (localStorageCopy) state.tasklist = localStorageCopy.tasks;

  state.tasklist.forEach((cardData) => {
    taskcontents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent(
        cardData.id,
        cardData.title,
        cardData.description,
        cardData.type,
        cardData.url
      )
    );
  });
};

const handleSubmit = (event) => {
  event.preventDefault();

  const id = Date.now().toString();
  const input = {
    url: document.getElementById("imgurl").value,
    title: document.getElementById("task_title").value,
    description: document.getElementById("desc").value,
    type: document.getElementById("tags").value,
  };

  taskcontents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent(id, input.title, input.description, input.type, input.url)
  );

  state.tasklist.push({ ...input, id });
  updateLocalStorage();

  // Reset form after submission
  document.getElementById("taskForm").reset();

  // Close modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addModal")
  );
  modal.hide();
};

// Load initial data when the DOM is loaded
loadInitialData();

// Add submit event listener to the task form
document.getElementById("taskForm").addEventListener("submit", handleSubmit);

const openTask = (e) => {
  if (!e) e = window.event;

  const taskId = e.target.id;
  const getTask = state.tasklist.find((task) => task.id === taskId);
  if (getTask) {
    const { id, title, description, url } = getTask;
    taskmodal.innerHTML = htmlModalContent(id, title, description, url);
  } else {
    console.error("Task not found");
  }
};

// const deletetask = () => {
//   if (!e) e = window.event;

//   const targetId = e.target.getAttribute("name");
//   const type = e.target.tagName;
//   // console.log(type)
//   const removetask = state.tasklist.filter(({ id }) => id !== targetId);
//   state.tasklist = removetask;

//   // console.log(removetask)
//   updateLocalStorage();
//   if (type === "BUTTON") {
//     console.log(e.target.parentNode.parentNode.parentNode);
//     return e.target.parentNode.parentNode.parentNode.parentNode.removechild(
//       e.target.parentNode.parentNode.parentNode
//     );
//   }
//   return e.target.parentNode.parentNode.parentNode.parentNode.removechild(
//     e.target.parentNode.parentNode.parentNode
//   );
// };
const deletetask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.getAttribute("name");
  const type = e.target.tagName;

  const updatedTaskList = state.tasklist.filter(({ id }) => id !== targetId);
  state.tasklist = updatedTaskList;
  updateLocalStorage();

  const taskCard = e.target.closest(".col-md-6");
  taskCard.parentNode.removeChild(taskCard);
};

const editButtons = document.querySelectorAll(".edit-button");

editButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    editTask(event);
  });
});

// const editTask = (e) => {
//   if (!e) e = window.event;
//   const targetId = e.target.id;
//   const type = e.target.tagName;

//   let parentNode;
//   let taskTitle;
//   let taskdescription;
//   let tags;
//   let submission;

//   if (type == -"BUTTON") {
//     parentNode = e.target.parentNode.parentNode;
//   } else {
//     parentNode = e.target.parentNode.parentNode.parentNode;
//   }

//   // taskTitle=parentNode.childNodes[3];
//   // console.log(taskTitle);

//   taskTitle = parentNode.childNodes[3].childNodes[3];

//   taskdescription = parentNode.childNodes[3].childNodes[5];
//   tags = parentNode.childNodes[3].childNodes[7].childNodes[1];

//   submitButton = parentNode.childNodes[5].childNodes[1];

//   taskTitle.setAttribute("contenteditable", "true");
//   taskdescription.setAttribute("ontenteditable", "true");
//   tags.setAttribute("ontenteditable", "true");

//   submitButton.setAttribute("onclick", "saveedit.apply(this,arguments)");
//   submitButton.removeAttribute("data-bs-toggle");
//   submitButton.removeAttribute("data-bs-target");
//   submitButton.innerHTML = "save Changes";
// };

// const saveedit = (e) => {
//   if (!e) e = window.event;

//   const targetId = e.target.id;
//   const parentNode = e.target.parentNode.parentNode;

//   const task_title = parentNode.childNodes[3].childNodes[3];
//   const description = parentNode.childNodes[3].childNodes[5];
//   const tags = parentNode.childNodes[3].childNodes[7].childNodes[1];
//   const submitButton = parentNode.childNodes[5].childNodes[1];

//   const updateData = {
//     task_title: task_title.innerHTML,
//     taskdescription: updateData.taskdescription,
//     tags: updateData.tags,
//     url: task.url,
//   };
//   let statecopy = state.tasklist;

//   statecopy = statecopy.map((task) =>
//     task.id === targetId
//       ? {
//           id: task.id,
//           title: updateData.task_title,
//           description: updateData.taskdescription,
//           tags: updateData.tags,
//           url: task,
//           url,
//         }
//       : task
//   );

//   state.tasklist = statecopy;
//   updateLocalStorage();
// };

// const editTask = (e) => {
//   if (!e) e = window.event;
//   const targetId = e.target.getAttribute("name");
//   const type = e.target.tagName;

//   let parentNode;
//   let taskTitle;
//   let taskDescription;
//   let tags;
//   let submitButton;

//   if (type === "BUTTON") {
//     parentNode = e.target.parentNode.parentNode;
//   } else {
//     parentNode = e.target.parentNode.parentNode.parentNode;
//   }

//   taskTitle = parentNode.querySelector(".card-title");
//   taskDescription = parentNode.querySelector(".card-text");
//   tags = parentNode.querySelector(".tags .badge");
//   submitButton = parentNode.querySelector(".btn-outline-info");

//   taskTitle.setAttribute("contenteditable", "true");
//   taskDescription.setAttribute("contenteditable", "true");
//   tags.setAttribute("contenteditable", "true");

//   submitButton.setAttribute("onclick", "saveedit.apply(this,arguments)");
//   submitButton.removeAttribute("data-bs-toggle");
//   submitButton.removeAttribute("data-bs-target");
//   submitButton.textContent = "Save Changes";
// };
const editTask = (e) => {
  if (!e) e = window.event;
  const taskCard = e.target.closest(".col-md-6");

  const taskTitle = taskCard.querySelector(".card-title");
  const taskDescription = taskCard.querySelector(".card-text");
  const tags = taskCard.querySelector(".tags .badge");
  const submitButton = taskCard.querySelector(".btn-outline-info");

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  tags.setAttribute("contenteditable", "true");

  submitButton.setAttribute("onclick", "saveEdit.apply(this,arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.textContent = "Save Changes";
};

const saveEdit = (e) => {
  if (!e) e = window.event;
  const taskCard = e.target.closest(".col-md-6");

  const taskTitle = taskCard.querySelector(".card-title").textContent;
  const taskDescription = taskCard.querySelector(".card-text").textContent;
  const tags = taskCard.querySelector(".tags .badge").textContent;

  const taskId = taskCard.getAttribute("id");
  const taskIndex = state.tasklist.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    state.tasklist[taskIndex].title = taskTitle;
    state.tasklist[taskIndex].description = taskDescription;
    state.tasklist[taskIndex].tags = tags;
    updateLocalStorage();
  }

  // Reset attributes and button text
  taskCard.querySelector(".card-title").removeAttribute("contenteditable");
  taskCard.querySelector(".card-text").removeAttribute("contenteditable");
  taskCard.querySelector(".tags .badge").removeAttribute("contenteditable");

  const submitButton = taskCard.querySelector(".btn-outline-info");
  submitButton.setAttribute("onclick", "editTask.apply(this,arguments)");
  submitButton.textContent = "Edit";
};

const searchTask = (query) => {
  // Convert query to lowercase for case-insensitive search
  const searchTerm = query.toLowerCase();

  // Clear the current task list on the screen
  taskcontents.innerHTML = "";

  // Filter tasks whose title contains the search term
  const filteredTasks = state.tasklist.filter((task) =>
    task.title.toLowerCase().includes(searchTerm)
  );

  // Render filtered tasks on the screen
  filteredTasks.forEach((task) => {
    taskcontents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent(
        task.id,
        task.title,
        task.description,
        task.type,
        task.url
      )
    );
  });
};

// Get the search input element
const searchInput = document.getElementById("searchInput");

// Add event listener to the search input
searchInput.addEventListener("input", (event) => {
  const query = event.target.value;
  searchTask(query);
});
