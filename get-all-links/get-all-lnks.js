// ==UserScript==
// @name         Get All Links
// @name:zh-TW   获取网页中的全部链接
// @name:zh-HK   獲取網頁中的全部鏈接
// @name:zh-CN   獲取網頁中的全部鏈接
// @namespace    https://tdl3.com/
// @version      0.1.0
// @description  Get all links from a website, change @match to the website to which you want to get links.
// @description:zh-TW  获取网页中的全部链接，将 @match 改到你想获得链接的网站。
// @description:zh-HK  獲取網頁中的全部鏈接，將 @match 改到你想獲得鏈接的網站 。
// @description:zh-CN  獲取網頁中的全部鏈接，將 @match 改到你想獲得鏈接的網站 。
// @author       TDL3
// @match        https://heyeased.weebly.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

function make_table(links_and_names) {
  let table = "<table><thead><th>Names</th><th>Links</th></thead><tbody>";
  for (const [link, name] of Object.entries(links_and_names)) {
    table += `<tr><td> ${name} </td><td> ${link} </td></tr>`;
  }
  table += "</table>";
  window.open("").document.write(table);
}

function make_list(links) {
  let list = "";
  for (let link in links) {
    list += `<div>${links[link]}</div>`;
  }
  window.open("").document.write(list);
}

(function () {
  "use strict";
  let urls = document.querySelectorAll("a");
  let links_and_names = {};
  const name_regex = new RegExp(/png|jpg/g);
  let res = false;
  for (let i = 0; i < urls.length; i++) {
    let nametext = urls[i].textContent;
    // remove whilte spaces and tabs
    let cleantext = nametext.replace(/\t|\s+/g, "").trim();
    let cleanlink = urls[i].href;
    // uncomment this line to get all links
    //let res = !!cleanlink.match(name_regex);
    // remove white spaces and tabs
    if (res) {
      links_and_names[cleanlink] = cleantext;
    }
  }
  //make_list(Object.keys(links_and_names));
  make_table(links_and_names);
})();
