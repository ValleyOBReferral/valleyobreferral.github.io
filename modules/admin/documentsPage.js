import { d } from "../../asset/js/custom.lib.js";
import { commonLoad, searchLoad, sortingLoad } from "./common.js";

const documentsPage = `
<style>
  .user-backup-table-wrapp .custom-table th:nth-child(1) {
    min-width: 80px;
  }
  .user-backup-table-wrapp .custom-table th:nth-child(2) {
    min-width: 200px;
  }
  .user-backup-table-wrapp .custom-table th:nth-child(3) {
    min-width: 200px;
  }
</style>
<div>
  <section id="wrapper">
    <header class="site-header">
      <div class="container-fluid">
        <nav class="navbar site-navigation">
          <div class="navbar-brand">
            <a href="javascript:void(0);">
              <img src="./asset/img/logo.svg" alt="Logo" />
            </a>
          </div>

          <div class="search-dv">
            <form name="search-form" id="search_form">
              <button type="submit">
                <img src="./asset/img/search-icon.png" alt="Search" />
              </button>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                autocomplete="off"
                spellcheck="false"
              />
            </form>
            <span id="sortingBtn" class="ic-dv arrow-ic">
              <a href="javascript:void(0);">
                <img src="./asset/img/up-dwn-arr.png" alt="Icon" />
              </a>
            </span>
          </div>

          <ul class="navbar-nav">
            <li id="homeBtn">
              <a href="javascript:void(0);" class="">
                <span class="txt">Home</span>
              </a>
            </li>
            <li id="documentsBtn">
              <a href="javascript:void(0);" class="active">
                <span class="txt">Document</span>
              </a>
            </li>
            <li id="logoutBtn">
              <a href="javascript:void(0);">
                <span class="icon"
                  ><img src="./asset/img/logout.png" alt="LogOut"
                /></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- container -->
    </header>

    <main class="site-main">
      <section class="user-backup-sec">
        <div class="container-fluid">
          <div class="user-backup-table-wrapp">
            <div class="user-popup-btns">
              <button
                class="custom-btn"
                data-toggle="modal"
                data-target="#addNewDocumentModal"
              >
                Add New Document
              </button>
              <button
                class="custom-btn"
                data-toggle="modal"
                data-target="#backupModal"
              >
                Backup
              </button>
              <button
                class="custom-btn"
                data-toggle="modal"
                data-target="#changePasswordModal"
              >
                Change Password
              </button>
            </div>
            <!-- user-popup-btns -->

            <table class="custom-table"></table>
          </div>
        </div>
        <!-- container -->
      </section>
      <!-- common-sec -->
    </main>
  </section>
  <!-- wrapper -->

  <!-- Modal addNewDocumentModal -->
  <div
    class="modal fade custom-modal"
    id="addNewDocumentModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      role="document"
      style="max-width: 600px"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close ml-auto"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <h3 class="modal-title text-center">Add Document</h3>

          <section class="custom-form-sec">
            <div class="drag-and-drop-wrapp">
              <div class="drop-zone">
                <form
                  action="#"
                  name="documentUploadForm"
                  method="get"
                  class="formWrappFile"
                >
                  <div class="file">
                    <div class="file__input" id="file__input">
                      <input
                        class="file__input--file"
                        id="customFile"
                        type="file"
                        multiple="multiple"
                        name="files[]"
                      />
                      <label
                        class="file__input--label"
                        for="customFile"
                        data-text-btn="Upload"
                      >
                        <div class="drop-zone__prompt">
                          <h3>Drag & Drop Files Here To Share</h3>
                          <p>PDF Files ONLY. less than 10 MB each</p>
                          <div class="img">
                            <img
                              src="./asset/img/cloud-computing.png"
                              alt="Upload"
                              disabled
                            />
                          </div>
                        </div>
                      </label>
                    </div>
                    <div style="margin: 20px 0" id="filesList"></div>
                  </div>
                  <div class="link-dv">
                    <button
                      onclick="document.querySelector('#customFile').click()"
                      type="button"
                      class="custom-btn"
                    >
                      Select Files
                    </button>
                    <button
                      type="submit"
                      class="custom-btn btnUpload"
                      style="display: none"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <!-- drag-and-drop-wrapp -->
          </section>
          <!-- custom-form-sec -->
        </div>
        <!-- modal-body -->
      </div>
    </div>
  </div>
  <!-- modal -->

  <!-- Modal backup -->
  <div
    class="modal fade custom-modal"
    id="backupModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close ml-auto"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <h3 class="modal-title text-center">Backup</h3>

          <section class="custom-form-sec">
            <form id="backup-form" class="icon-form" action="" method="post">
              <div class="mdl-input-bx">
                <label>Enter Backup Email</label>
                <input
                  type="text"
                  name=""
                  id="backupEmail"
                  class="form-control"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Enter Backup Email"
                />
              </div>

              <button id="backupBtn" type="submit" class="custom-btn popSubmit">
                Backup
              </button>
              <div
                style="
                  color: red;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="backup-error"
              >
                Please try again.
              </div>
              <div
                style="
                  color: green;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="backup-success"
              >
                Success!
              </div>
            </form>
          </section>
          <!-- custom-form-sec -->
        </div>
        <!-- modal-body -->
      </div>
    </div>
  </div>
  <!-- modal -->

  <!-- Modal Change Password -->
  <div
    class="modal fade custom-modal"
    id="changePasswordModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close ml-auto"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <h3 class="modal-title text-center">Change Password</h3>

          <section class="custom-form-sec">
            <form
              class="icon-form"
              action=""
              name="changePasswordForm"
              method="post"
            >
              <div class="mdl-input-bx">
                <label>Enter Old Password</label>
                <input
                  minlength="5"
                  type="text"
                  spellcheck="false"
                  name=""
                  required
                  id="oldPass"
                  class="form-control"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Enter Old Password"
                />
              </div>

              <div class="mdl-input-bx">
                <label>Enter New Password</label>
                <input
                  minlength="5"
                  type="text"
                  spellcheck="false"
                  name=""
                  required
                  id="newPass"
                  class="form-control"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Enter New Password"
                />
              </div>

              <div class="mdl-input-bx">
                <label>Confirm New Password</label>
                <input
                  minlength="5"
                  type="text"
                  spellcheck="false"
                  name=""
                  required
                  id="conNewPass"
                  class="form-control"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Confirm New Password"
                />
              </div>

              <button
                type="submit"
                id="changePasswordBtn"
                class="custom-btn popSubmit"
              >
                Change
              </button>

              <div
                style="
                  color: red;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="changePassword-error"
              >
                Please try again.
              </div>
              <div
                style="
                  color: green;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="changePassword-success"
              >
                Success!
              </div>
            </form>
          </section>
          <!-- custom-form-sec -->
        </div>
        <!-- modal-body -->
      </div>
    </div>
  </div>
  <!-- modal -->

  <div style="" id="loading">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</div>
`;

const showData = (data, type = "") => {
  const { post, GAS, database, dateCovert } = d;
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    const id = {
      id: index,
      file: x[2],
    };
    if (type) id.id = x[3];
    idList.push(id);
    result += `
    <tr>
  		<td>${dateCovert(x[0].substr(1))}</td>
  		<td>${x[1].substr(1)}</td>
      <td class="text-center">
        <button id="delete-${id.id}" class="tb-btn-smpl delete text-center">
          <span class="icon"><img src="./asset/img/Icon-feather-trash.png" alt="Trash"/></span>
        </button>
      </td>
  	</tr>
    `;
    index++;
  }

  table.innerHTML = `
  <tr>
    <th>Date</th>
    <th>Name</th>
    <th class="text-center">Delete</th>
  </tr>
	${result}
  `;

  for (let x of idList) {
    let button = document.querySelector(`#delete-${x.id}`);
    // delete
    button.onclick = async () => {
      loading.style.display = "block";
      let res = await post(GAS, {
        type: 9,
        data: JSON.stringify({
          ...x,
          database: database,
        }),
      });
      res = JSON.parse(JSON.parse(res).messege);
      showData(res.data);
      searchLoad(res.data, showData, [1]);
      document.querySelector("#search").value = "";
    };
  }
  table.style.display = "table";
  loading.style.display = "none";
  sortingLoad(1, data, type, showData);
};

let fileNo;
let filesListObj;
const addDocumentsLoad = (data) => {
  commonLoad();
  showData(data);
  searchLoad(data, showData, [1]);

  let button = document.querySelector(".btnUpload");
  let loading = document.querySelector("#loading");

  document.querySelector("#customFile").onchange = (e) => {
    fileListCreate(e.target.files);
    button.style.display = "inline";
  };

  fileNo = 0;
  filesListObj = {};
  document.forms["documentUploadForm"].onsubmit = async (e) => {
    e.preventDefault();
    button.innerText = "Processing..";
    loading.style.display = "block";

    for (let id in filesListObj) {
      let fileId = document.querySelector(`[file='${id}']`);
      fileId.scrollIntoView();
      let status = fileId.querySelector(".status");
      status.style.color = "#004a7f";
      status.innerText = "Uploading...";
      let result;
      try {
        const data = await fileUpload(filesListObj[id]);
        result = JSON.parse(JSON.parse(data).messege);
        showData(result.data);
        searchLoad(result.data, showData, [1]);
        document.querySelector("#search").value = "";
        loading.style.display = "block";
      } catch (err) {
        result = {
          result: false,
          err: err,
        };
      }
      if (result.result === true) {
        delete filesListObj[id];
        status.style.color = "green";
        status.innerText = "Uploaded";
      } else {
        console.log(result);
        status.style.color = "red";
        status.innerText = "Upload Failed!";
      }
    }

    button.innerText = "Upload";
    loading.style.display = "none";
    if (Object.values(filesListObj).length == 0) {
      button.style.display = "none";
    }
  };
};

const fileListCreate = async (files) => {
  const { readFiles } = d;
  let filesList = document.querySelector("#filesList");
  let templetete = "";
  for (let i = files.length - 1; i >= 0; i--) {
    fileNo++;
    const file = files[i];
    let error;
    let icon = "file.svg";
    if (file.type == "application/pdf") {
      icon = "pdf.svg";
      if (file.size >= 10 * 2 ** 20) {
        error = "File size > 5MB.";
      } else {
        error = "";
        filesListObj[fileNo] = {
          fileName: file.name,
          data64: (await readFiles(file))[0],
        };
      }
    } else {
      error = "File is not a PDF.";
    }
    templetete += `
    <div file="${fileNo}" style="display: flex; flex-direction: row; font-size: 16px; color: rgba(0, 0, 0, 0.3); align-items: flex-start; margin: 10px 0; justify-content: space-around;">
      <img style="width: 30px" src="./asset/img/${icon}">
      <div style="width: 100%; max-width: 100%; padding: 0 10px; text-align: left;">
       <div>${file.name}</div>
       <div class="status" style="color: red; font-size: 10px">${error}</div>
      </div>
      <div onclick="removeFileFromList(${fileNo})">x</div>
    </div>`;
  }
  filesList.innerHTML = templetete + filesList.innerHTML;
  console.log(filesListObj);
};

const removeFileFromList = (id) => {
  let fileDiv = document.querySelector(`[file='${id}']`);
  fileDiv.remove();
  delete filesListObj[id];
};

const fileUpload = (file) => {
  const { post, GAS, database } = d;
  const { fileName, data64 } = file;
  return post(GAS, {
    type: 7,
    data: JSON.stringify({
      date: "",
      fileName,
      data64,
      database,
    }),
  });
};

window.removeFileFromList = removeFileFromList;
export { documentsPage, addDocumentsLoad };
