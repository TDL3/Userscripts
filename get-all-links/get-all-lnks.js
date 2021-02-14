// ==UserScript==
// @name         Get All Links
// @name:zh-CN   获取网页中的全部链接
// @name:zh-HK   獲取網頁中的全部鏈接
// @name:zh-TW   獲取網頁中的全部鏈接
// @namespace    https://tdl3.com/
// @version      0.2.1
// @description  Get all links from a website, change @match to the website to which you want to get links.
// @description:zh-CN  获取网页中的全部链接，将 @match 改到你想获得链接的网站。
// @description:zh-HK  獲取網頁中的全部鏈接，將 @match 改到你想獲得鏈接的網站 。
// @description:zh-TW  獲取網頁中的全部鏈接，將 @match 改到你想獲得鏈接的網站 。
// @author       TDL3
// @match        https://heyeased.weebly.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

const filter_results = false;
const filter_regex = new RegExp(/png|jpg/g);

function make_table(results) {
  let table = "<table><thead><th>Names</th><th>Links</th></thead><tbody>";
  results.forEach(result => {
    table += `<tr><td> ${result.name} </td><td> ${result.url} </td></tr>`;
  });
  table += "</table>";
  window.open("").document.write(table);
}

function make_list(results) {
  let list = "";
  results.forEach(result => {
    list += `<div>${result.url}</div>`;
  });

  window.open("").document.write(list);
}

function add_button(text, onclick, cssObj) {
  cssObj = cssObj || {
    position: "absolute",
    bottom: "7%",
    right: "4%",
    "z-index": 3,
  };
  let button = document.createElement("button");
  let btnStyle = button.style;
  document.body.appendChild(button);
  button.innerHTML = text;
  button.onclick = onclick;
  Object.keys(cssObj).forEach((key) => {
    btnStyle[key] = cssObj[key];
  });
  return button;
}
function filter_link(link) {
  if (!!link.match(filter_regex)) {
    return true;
  }
  return false;
}

function get_links() {
  let urls = document.querySelectorAll("a");
  let results = [];
    urls.forEach(url => {
    let link_name = url.textContent.replace(/\t|\s+/g, "").trim();
    let link = url.href;
    if (!filter_results) {
      results.push({
        name: link_name,
        url: link
      });
    } else if (filter_link(link)) {
      results.push({
        name: link_name,
        url: link
      });
    }
  });
  // make_list(results);
  make_table(results);
}

(function () {
  "use strict";

  window.addEventListener("load", () => {
    add_button("Get Links", get_links, {
      position: "absolute",
      bottom: "7%",
      left: "4%",
      "z-index": 3,
    });
    add_button("Get Links", get_links, {
      position: "absolute",
      bottom: "7%",
      right: "4%",
      "z-index": 3,
    });
  });
})();