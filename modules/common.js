import { d } from "../asset/js/custom.lib.js";

// search load
const searchLoad = (data, callback, indexs, type = null) => {
  let search = document.querySelector("#search");

  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    let usedData = [];
    for (let i = 0; i < data.length; i++) {
      indexs.forEach((value) => {
        if (
          data[i][value].toLowerCase().indexOf(search.value.toLowerCase()) >
            -1 &&
          usedData.indexOf(i) == -1
        ) {
          data[i].push(i + 1);
          data[i].push(data.length - i);
          finalData.push(data[i]);
          usedData.push(i);
        }
      });
    }
    if (type === null) callback(finalData, 1);
    else {
      type.data = finalData;
      callback(type, 1);
    }
  };
};

// sortin load
const sortingLoad = (index, data, type, callback, res = null) => {
  let sortingBtn = document.querySelector("#sortingBtn");
  let loading = document.querySelector("#loading");
  sortingBtn.onclick = () => {
    if (data.length) {
      loading.style.display = "block";

      let data1 = data[0][index];
      if (type == "") {
        data.forEach((v, i) => {
          data[i].push(i + 1);
          data[i].push(data.length - i);
        });
        type = 1;
      }

      data = data.sort((a, b) => {
        let x = a[index].substr(1).toLowerCase();
        let y = b[index].substr(1).toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });

      if (data[0][index] === data1) {
        data = data.reverse();
      }

      if (res === null) callback(data, type);
      else {
        res.data = data;
        callback(res, type);
      }
    }
  };
};

const uint8ArrayToBase64 = async (data) => {
  const base64url = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result);
    reader.readAsDataURL(new Blob([data]));
  });
  return base64url;
};

// download file
const download = async (id, fileName) => {
  let loading = document.querySelector("#loading");
  loading.style.display = "block";

  // create a text encoder
  let encoder = new TextEncoder();

  // encode the binary data to a base64 string
  let binary = (await gapi.client.drive.files.get({
      "fileId": id,
      "alt" : "media",
    })
  ).body

  const len = binary.length;
  const buffer = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      buffer[i] = binary.charCodeAt(i);
  }

  let data = await uint8ArrayToBase64(buffer);

  const anchor = document.createElement("a");
  if ("download" in anchor) {
    //html5 A[download]

    let extention = fileName.toLowerCase().indexOf(".pdf") >= 0 ? "" : ".pdf";
    anchor.href =  data;
    anchor.setAttribute("download", fileName + extention);
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

export { searchLoad, sortingLoad, download };
