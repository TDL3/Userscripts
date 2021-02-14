// ==UserScript==
// @name         Get All Links
// @name:zh-TW   获取网页中的全部链接
// @name:zh-HK   獲取網頁中的全部鏈接
// @name:zh-CN   獲取網頁中的全部鏈接
// @namespace    https://tdl3.com/
// @version      0.2.0
// @description  Get all links from a website, change @match to the website to which you want to get links.
// @description:zh-TW  获取网页中的全部链接，将 @match 改到你想获得链接的网站。
// @description:zh-HK  獲取網頁中的全部鏈接，將 @match 改到你想獲得鏈接的網站 。
// @description:zh-CN  獲取網頁中的全部鏈接，將 @match 改到你想獲得鏈接的網站 。
// @author       TDL3
// @match        https://heyeased.weebly.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

const filter_results = true;
const filter_regex = new RegExp(/png|jpg/g);

function make_table(links_and_names) {
  let table = "<table><thead><th>Names</th><th>Links</th></thead><tbody>";
  for (const [link, name] of Object.entries(links_and_names)) {
    table += `<tr><td> ${name} </td><td> ${link} </td></tr>`;
  }
  table += "</table>";
  window.open("").document.write(table);
}

function make_list(links_and_names) {
  let list = "";
  Object.keys(links_and_names).forEach(link => {
    list += `<div>${link}</div>`;
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
  let links_and_names = {};
  for (let i = 0; i < urls.length; i++) {
    let nametext = urls[i].textContent;
    // remove spaces and tabs.
    let cleantext = nametext.replace(/\t|\s+/g, "").trim();
    let cleanlink = urls[i].href;
    if (!filter_results) {
      links_and_names[cleanlink] = cleantext;
    } else if (filter_link(cleanlink)) {
      links_and_names[cleanlink] = cleantext;
    }
  }
  // make_list(links_and_names);
  make_table(links_and_names);
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
