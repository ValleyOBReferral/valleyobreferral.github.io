import { commonLoad, sortingLoad, searchLoad, emailLoad_ } from "./common.js";

const homePage = `
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
                <a href="javascript:void(0);" class="active">
                  <span class="txt">Home</span>
                </a>
              </li>
              <li id="historyBtn">
                <a href="javascript:void(0);">
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
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    const id = {
      id: index,
      file: x[2].substr(1),
      name: x[1].substr(1),
    };
    idList.push(id);
    result += `
    <tr>
  		<td>
        <a document="${id.id}" href="javascript:void(0);">
        ${x[1].substr(1)}
        </a>
      </td>
  	</tr>
    `;
    index++;
  }

  table.innerHTML = `
  <tbody>
	${result}
  </tbody>
  `;

  for (let x of idList) {
    let button = document.querySelector(`[document='${x.id}']`);
    // delete
    button.onclick = async () => {
      emailLoad_(x.name, x.file);
    };
  }
  table.style.display = "table";
  loading.style.display = "none";
  sortingLoad(0, data, type, showData);
};

const homeLoad = (data) => {
  commonLoad();
  showData(data);
  searchLoad(data, showData, [0]);
};

export { homePage, homeLoad };
