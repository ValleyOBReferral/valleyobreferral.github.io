import { d } from "../../asset/js/custom.lib.js";
import { commonLoad, searchLoad, sortingLoad, download } from "./common.js";

const historyPage = `
<div>
  <style>
  .common-sec {
    padding: 30px 0;
  }

  .container-fluid {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .user-backup-table-wrapp {
    margin-left: 280px;
  }
  .user-backup-table-wrapp .custom-table th,
  .user-backup-table-wrapp .custom-table td {
    min-width: 170px;
  }
  .user-backup-table-wrapp .custom-table th:first-child,
  .user-backup-table-wrapp .custom-table td:first-child {
    padding-left: 0;
  }
  .user-backup-table-wrapp .custom-table th:nth-child(3) {
    min-width: 300px;
  }
  .user-backup-table-wrapp .tb-btn {
    border: none;
    padding: 0;
    font-size: 18px;
  }

  .custom-table {
    border-collapse: collapse;
    font-size: 16px;
  }
  .custom-table th,
  .custom-table td {
    min-width: 180px;
  }
  .custom-table th .icon,
  .custom-table td .icon {
    margin-right: 3px;
  }
  .custom-table th {
    padding: 15px;
    font-size: 18px;
  }
  .custom-table td {
    padding: 12px 15px;
  }
  .custom-table .tb-btn {
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 5px 15px;
    background-color: #fff;
  }
  .custom-table .tb-btn .white {
    display: none;
  }
  .custom-table .tb-btn:hover {
    background-color: #004a7f;
    color: #fff;
  }
  .custom-table .tb-btn:hover .white {
    display: inline;
  }
  .custom-table .tb-btn:hover .black {
    display: none;
  }
  .custom-table .icon-btn {
    border: none;
    padding: 0;
    margin: 0;
    background: none;
  }
  .custom-table .icon-btn .icon {
    flex: none;
  }
  .custom-table .icon-btn .icon .iconBlue {
    display: none;
  }
  .custom-table .icon-btn:hover .icon .iconBlack {
    display: none;
  }
  .custom-table .icon-btn:hover .icon .iconBlue {
    display: inline;
  }


  </style>
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
                spellchaeck="false"
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
            <li>
              <a href="javascript:void(0);" class="active">
                <span class="icon">
                  <img
                    src="./asset/img/share-clock.png"
                    alt="History"
                    class="iconBlack"
                  />
                  <img
                    src="./asset/img/share-clock-blue.png"
                    alt="History"
                    class="iconBlue"
                  />
                </span>
                <span class="txt">History</span>
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
      <section class="common-sec user-backup-sec">
        <div class="container-fluid">
          <div class="user-backup-table-wrapp">
            <table class="custom-table"></table>
          </div>
        </div>
        <!-- container -->
      </section>
      <!-- common-sec -->
    </main>
  </section>
  <!-- wrapper -->

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

const showData = ({ user, database, data }, type = "") => {
  const { post, GAS: {admin: GAS}, dateCovert, schema_ } = d;
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    let id = index;
    if (type) id = x[6];
    idList.push({
      id,
      file: x[4].substr(1),
      name: x[0].substr(1) + " - " + x[3].substr(1),
    });

    const downloadBtn = `
    <button download="${id}" class="icon-btn download">
      <span class="icon">
        <img src="./asset/img/download.png" alt="Download" class="iconBlack"/>
        <img src="./asset/img/download-white.png" alt="Download" class="iconBlue">
      </span>
    </button>`;

    result += `
    <tr>
      <td>${x[0].substr(1)}</td>
      <td>${x[1].substr(1)}</td>
      <td>${x[2].substr(1)}</td>
      <td>${x[3].substr(1)}</td>
      <td>${dateCovert(x[5])}</td>
      <td class="text-center">
        ${downloadBtn}
      </td>
      <td class="text-center">
        <button id="delete-${id}" class="tb-btn-smpl delete">
          <span class="icon"
            ><img
              src="./asset/img/Icon-feather-trash.png"
              alt="Trash"
          /></span>
        </button>
      </td>
    </tr>
    `;
    index++;
  }

  table.innerHTML = `
  <caption
    style="
      text-align: center;
      display: table-caption;
      font-weight: 600;
      font-size: 18px;
      caption-side: top;
      color: #000;
      margin-bottom: 10px;
    "
  >
    ${user}
  </caption>
  <tr>
    <th>Name</th>
    <th>Date of Birth</th>
    <th>Email</th>
    <th>Document</th>
    <th>Date</th>
    <th class="text-center">Download</th>
    <th class="text-center position-relative">
      <button id="clearAllBtn"
        class="custom-btn popSubmit"
        style="
          position: absolute;
          top: -50px;
          left: 0;
          right: 0;
          margin: 0 auto;
          max-width: 130px;
          padding: 10px 20px;
          font-size: 14px;
        "
      >
        Clear History
      </button>
      <span>Delete</span>
    </th>
  </tr>
	${result}
  `;

  for (let x of idList) {
    //console.log(x)
    let button = document.querySelector(`#delete-${x.id}`);
    let exportBtn = document.querySelector(`[download='${x.id}']`);
    // delete
    button.onclick = async () => {
      loading.style.display = "block";

      await gapi.client.drive.files.delete({
        fileId: x.file
      })

      let range = schema_["deleteHistory"].resource.requests[0].deleteDimension.range
      range.startIndex = x.id - 1;
      range.endIndex = x.id;
      schema_["deleteHistory"].spreadsheetId = database;
      
      await gapi.client.sheets.spreadsheets.batchUpdate({
        ...schema_["deleteHistory"]
      })

      let res = await gapi.client.sheets.spreadsheets.values.getQuery(
        {
          ...schema_["getHistory"]
        }
      )

      if (res.status == 200) {
        const obj = {
          data: res.result.values,
          user: user,
          database
        }
        showData(obj);
        searchLoad(res.result.values, showData, [0, 1, 2], obj);
      } else{
        console.log(res)
      }
    };

    if (exportBtn) {
      exportBtn.onclick = () => {
        download(x.file, x.name);
      };
    }
  }
  table.style.display = "table";
  loading.style.display = "none";

  // clear all history
  let clearAllBtn = document.querySelector("#clearAllBtn");
  clearAllBtn.onclick = async () => {
    clearAllBtn.innerHTML = "Processing...";
    loading.style.display = "block";
    let res = await post(GAS, {
      type: 7,
      data: JSON.stringify({
        database: database,
      }),
    });
    res = JSON.parse(JSON.parse(res).messege);
    clearAllBtn.innerHTML = "Clear History";
    showData(res);
    searchLoad(res.data, showData, [0, 1, 2], res);
    document.querySelector("#search").value = "";
  };
  sortingLoad(0, data, type, showData, { user, database, data });
};

const historyLoad = (database, userName) => {
  const {schema_} = d;
  commonLoad(1);

  schema_["getHistory"].spreadsheetId = database;
  gapi.client.sheets.spreadsheets.values.getQuery(
    {
      ...schema_["getHistory"]
    }
  ).then(async (res) => {
    if (res.status == 200) {
      const obj = {
        data: res.result.values,
        user: userName,
        database
      }
      showData(obj);
      searchLoad(res.result.values, showData, [0, 1, 2], obj);
    } else{
      console.log(res)
    }
  })
  .catch((err) => {
    console.log(err);
    if(err.staus == 401){
      window.location = "./";
    }
  });
};

export { historyPage, historyLoad };
