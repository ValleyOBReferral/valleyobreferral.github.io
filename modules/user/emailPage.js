import { d } from "../../asset/js/custom.lib.js";
import { commonLoad } from "./common.js";
import { doc } from "./viewer.js";
const emailPage = `
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
          <section class="common-sec">
            <div class="container-fluid">
              <form name="emailSendForm" id="secure-message-form">
                <div class="row align-items-center">
                  <div class="col-md-5 col-lg-4">
                    <div class="user-send-email-wrapp">
                      <div class="mdl-input-bx">
                        <label>Name</label>
                        <input
                          type="text"
                          name=""
                          id="emailSendName"
                          class="form-control"
                          autocomplete="off"
                          required
                          placeholder="Copy & paste only"
                          oninput="inputPrevent(event)"
                        />
                      </div>

                      <div class="mdl-input-bx">
                        <label>Email</label>
                        <input
                          type="text"
                          name=""
                          id="emailSendEmail"
                          class="form-control"
                          autocomplete="off"
                          required
                          placeholder="Copy & paste only"
                          oninput="inputPrevent(event)"
                        />
                      </div>

                      <div class="mdl-input-bx">
                        <label>Date Of Birth</label>
                        <input
                          type="text"
                          name=""
                          id="emailSendDate"
                          class="form-control"
                          autocomplete="off"
                          required
                          placeholder="Copy & paste only"
                          oninput="inputPrevent(event)"
                        />
                      </div>

                      <div
                        style="
                          color: red;
                          text-align: center;
                          font-size: 14px;
                          margin-top: 10px;
                          margin-bottom: 15px;
                          display: none;
                        "
                        id="error"
                      >
                        Something is wrong. Please try again.
                      </div>
                      <button
                        type="submit"
                        class="custom-btn"
                        id="emailSendBtn"
                      >
                        Send
                      </button>
                    </div>
                    <!-- user-send-email-wrapp -->
                  </div>
                  <!-- col -->

                  <div class="col-md-7 col-lg-8">
                    <div class="user-send-doc-wrapp">
                      <div class="doc-view-bx">
                        <div style="width: 100%; height: 600px" id="viewerDiv">
                          ${doc}
                        </div>
                      </div>
                    </div>
                    <!-- user-send-doc-wrapp -->
                  </div>
                  <!-- col -->
                </div>
                <!-- row -->
              </form>
            </div>
            <!-- container -->
          </section>
          <!-- common-sec -->
        </main>
      </section>
      <!-- wrapper -->

      <!-- Modal Thank you Success message -->
      <div
        class="modal fade custom-modal success-modal"
        id="sentEmailModal"
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

            <div class="modal-body text-center">
              <div class="img mb-4">
                <img src="./asset/img/verified.png" alt="Success" />
              </div>
              <h3 class="modal-title text-center">Thank You!</h3>
              <p>Successfully Sent Document</p>
            </div>
            <!-- modal-body -->
          </div>
        </div>
      </div>
      <!-- modal -->

      <div id="loading">
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

// download file
const download = (data, fileName) => {
  let loading = document.querySelector("#loading");
  loading.style.display = "block";

  const anchor = document.createElement("a");
  if ("download" in anchor) {
    //html5 A[download]

    anchor.href = data;
    anchor.setAttribute("download", fileName);
    anchor.innerHTML = "downloading...";
    anchor.style.display = "none";
    anchor.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    document.body.appendChild(anchor);
    setTimeout(function () {
      anchor.click();
      document.body.removeChild(anchor);
      loading.style.display = "none";
    }, 66);
  }
};

const rendered = (type = "") => {
  if (type == "") {
    document.getElementById("loading").style.display = "none";
  }
};

PDFViewerApplication.rendered = rendered;

const uint8ArrayToBase64 = async (data) => {
  const base64url = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result);
    reader.readAsDataURL(new Blob([data]));
  });
  return base64url;
};

const emailLoad = async (docName, id) => {
  const { GAS: {user: GAS}, post, database, schema_ } = d;
  commonLoad();

  let form = document.forms["emailSendForm"];
  let client = document.querySelector("#emailSendName");
  let email = document.querySelector("#emailSendEmail");
  let date = document.querySelector("#emailSendDate");
  let button = document.querySelector("#emailSendBtn");
  let error = document.querySelector("#error");
  let loading = document.querySelector("#loading");

  date.addEventListener("input", (e) => {
    if (
      /^(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])\-\d{4}$/.test(date.value) ==
      false
    ) {
      error.style.display = "block";
      error.innerText = "Date of Birth allow only MM-DD-YYYY format.";
    } else {
      error.style.display = "none";
    }
  });

  form.onsubmit = async (e) => {
    e.preventDefault();
    error.style.display = "none";

    if (
      /^(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])\-\d{4}$/.test(date.value) ==
      false
    ) {
      error.style.display = "block";
      error.innerText = "Date of Birth allow only MM-DD-YYYY format.";
      return;
    }

    loading.style.display = "block";
    button.innerText = "Sending..";

    const data = await PDFViewerApplication.pdfDocument.saveDocument();
    let resultData64 = await uint8ArrayToBase64(data);

    schema_["uploadDocuments"].upload.metadata.name =
        schema_["uploadDocuments"].upload.metadata.name +
        "" +
        new Date().getTime() +
        docName;

    let file =  new File([data], schema_["uploadDocuments"].upload.metadata.name, { type: 'application/pdf' });

    new gapi.client.drive.files.upload({
      file: file,
      type: "application/pdf",
      metadata: schema_["uploadDocuments"].upload.metadata,
      onError: function (response) {
        error.style.display = "block";
        let status = error;
        console.log(response)
        status.style.color = "red";
        status.innerText = "Something is wrong. Please try again.!";
        if(response.error.code == 401){
          status.innerText = "Authenticate Error! Please login again.";
        }

        button.innerText = "Send";
        loading.style.display = "none";
      },
      onComplete: async function (response) {
        try{
          post(GAS, {
            type: 1,
            data: JSON.stringify({
              time: "",
              fileName: docName,
              fileId: response.id,
              date: date.value,
              name: client.value,
              email: email.value,
              id: "",
              database: database,
            }),
          })
          .then(async (res) => {
            res = JSON.parse(JSON.parse(res).messege);
            const { result } = res;
            if (result) {
              await PDFViewerApplication.open(PDFViewerApplication.data__);
              let fileName = client.value + "_" + date.value + "_" + docName;
              e.target.reset();
              button.innerText = "Send";
              loading.style.display = "none";
              error.style.display = "none";
              $("#sentEmailModal").modal("show");
              download(resultData64, fileName);
            } else {
              console.log(res);
              error.style.color = "red";
              error.style.display = "block";
              error.innerText = "Something is wrong. Please try again.";
              button.innerText = "Send";
              loading.style.display = "none";
            }
          })
          .catch((err) => {
            console.log(err);
            error.style.color = "red";
            error.style.display = "block";
            error.innerText = "Something is wrong. Please try again.";
            button.innerText = "Send";
            loading.style.display = "none";
          });

        } catch(err){
          let status = error;
          error.style.display = "block";
          console.log(err)
          status.style.color = "red";
          status.innerText = "Something is wrong. Please try again.!";
          if(err.status == 401){
            status.innerText = "Authenticate Error! Please login again.";
          }
          button.innerText = "Send";
          loading.style.display = "none";
        }
      },
      onProgress: function (event) {
        let status = error;
        error.style.display = "block";
        status.style.color = "#004a7f";
        status.innerText = "Progress " + (Number((event.loaded/event.total) * 100).toFixed(2)) + "%";
      },
    });
  };

  delete window.localStorage["pdfjs.history"];

  gapi.client.drive.files.get({
    "fileId": id,
    "alt" : "media",
  }).then(async res => {
    const binary = res.body;
    const len = binary.length;
    const buffer = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        buffer[i] = binary.charCodeAt(i);
    }
    

    webViewerLoad();

    PDFViewerApplication.data__ = buffer;
    await PDFViewerApplication.open(PDFViewerApplication.data__);
  }).catch(err => {
    console.log(err);
    if(err.status == 401){
      window.location = "./";
    }
  })
};

export { emailPage, emailLoad };
