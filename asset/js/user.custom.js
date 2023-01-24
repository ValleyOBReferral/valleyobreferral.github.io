import { login, loginLoad } from "../../modules/user/login.js";

console.log("ValleyOB Referrals Application for User.");

const appLoad = async () => {
  await gapi.client.init({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
      "https://sheets.googleapis.com/$discovery/rest?version=v4",
    ],
  });

  // extend gapi
  gapi.client.sheets.spreadsheets.values.getQuery = ({
    spreadsheetId,
    range,
    query,
    sheet,
  }) => {
    return new Promise(async (resolve, reject) => {
      if (spreadsheetId && sheet && query) {
        try {
          let data = await (
            await fetch(
              `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?access_token=${
                gapi.client.getToken().access_token
              }&tq=${query}&sheet=${sheet}${range ? `&range=${range}` : ""}`
            )
          ).text();

          if (data.indexOf("google.visualization.Query.setResponse(") >= 0) {
            let response = JSON.parse(
              data.substr(data.indexOf("{")).slice(0, -2)
            );
            if (response.status == "error") {
              if(response.errors[0].reason == "invalid_query"){
                resolve({
                  status: 200,
                  result: {
                    values: [],
                  },
                });
              }
              else reject({
                ...response,
                status: 400,
              });
            } else {
              let values = response.table.rows.map((v) => {
                return v.c.map((v_) => {
                  return v_.v;
                });
              });

              resolve({
                status: 200,
                result: {
                  values,
                },
              });
            }
          } else {
            reject({
              ...JSON.parse(data.replace(")]}'\n", "")),
              status: 400,
            });
          }
        } catch (err) {
          reject({
            status: 401,
            result: {
              error: err,
            },
          });
        }
      } else {
        reject({
          status: 400,
          result: {
            error: {
              message: "Invalid JSON payload received",
            },
          },
        });
      }
    });
  };

  gapi.client.drive.files.getData64 = ({
    fileId
  }) => {
    return new Promise(async (resolve, reject) => {
      if (fileId) {
        try {
          let data = await (
            await fetch(
              `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?access_token=${
                gapi.client.getToken().access_token
              }&tq=${query}&sheet=${sheet}${range ? `&range=${range}` : ""}`
            )
          ).text();

          if (data.indexOf("google.visualization.Query.setResponse(") >= 0) {
            let response = JSON.parse(
              data.substr(data.indexOf("{")).slice(0, -2)
            );
            if (response.status == "error") {
              if(response.errors[0].reason == "invalid_query"){
                resolve({
                  status: 200,
                  result: {
                    values: [],
                  },
                });
              }
              else reject({
                ...response,
                status: 400,
              });
            } else {
              let values = response.table.rows.map((v) => {
                return v.c.map((v_) => {
                  return v_.v;
                });
              });

              resolve({
                status: 200,
                result: {
                  values,
                },
              });
            }
          } else {
            reject({
              ...JSON.parse(data.replace(")]}'\n", "")),
              status: 400,
            });
          }
        } catch (err) {
          reject({
            status: 401,
            result: {
              error: err,
            },
          });
        }
      } else {
        reject({
          status: 400,
          result: {
            error: {
              message: "Invalid JSON payload received",
            },
          },
        });
      }
    })
  }

  gapi.client.drive.files.upload = class {
    constructor(options) {
      this.file = options.file;
      this.type = options.type;
      this.token = gapi.client.getToken().access_token;
      this.metadata = options.metadata;
      this.onError = options.onError;
      this.onComplete = options.onComplete;
      this.onProgress = options.onProgress;

      this.url =
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable";

      this.xhr = new XMLHttpRequest();
      this.xhr.open("POST", this.url, true);
      this.xhr.setRequestHeader("Authorization", "Bearer " + this.token);
      this.xhr.setRequestHeader("Content-Type", "application/json");
      this.xhr.setRequestHeader("X-Upload-Content-Type", this.type);
      this.xhr.setRequestHeader("X-Upload-Content-Length", this.file.size);
      this.xhr.onload = this.onXhrLoad.bind(this);
      this.xhr.onerror = this.onXhrError.bind(this);
      // this.xhr.upload.onprogress = this.onXhrProgress.bind(this);
      this.xhr.send(JSON.stringify(this.metadata));
    }

    onXhrLoad() {
      if (this.xhr.status === 200) {
        this.url = this.xhr.getResponseHeader("Location");
        this.sendFile();
      } else {
        this?.onError(JSON.parse(this.xhr.response));
      }
    }

    onXhrError() {
      this?.onError(this.xhr.response);
    }

    onXhrProgress(event) {
      this?.onProgress(event);
    }

    sendFile() {
      let xhr = new XMLHttpRequest();
      xhr.open("PUT", this.url, true);
      xhr.setRequestHeader("Content-Type", this.type);
      xhr.onload = () => {
        if (xhr.status === 200) {
          this?.onComplete(JSON.parse(xhr.response));
        } else {
          this?.onError(JSON.parse(xhr.response));
        }
      };
      xhr.onerror = this.onError.bind(this);
      xhr.upload.onprogress = this.onProgress.bind(this);
      xhr.send(this.file);
    }
  };

  document.querySelector("#root").innerHTML = login;
  loginLoad();
};

gapi.load("client", appLoad);
