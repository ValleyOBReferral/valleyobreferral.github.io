import { login, loginLoad } from "../../modules/admin/login.js";

console.log("ValleyOB Referrals Application.");

document.querySelector("#root").innerHTML = login;
loginLoad();
