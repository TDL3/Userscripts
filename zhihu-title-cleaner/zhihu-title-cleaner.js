// ==UserScript==
// @name         Zhihu Title Cleaner
// @name:zh-TW   知乎标题清理
// @name:zh-HK   知乎標題清理
// @name:zh-CN   知乎標題清理
// @namespace    https://tdl3.com/
// @version      0.1.0
// @description  Remove unnecessary notifacations from title.
// @description:zh-TW  去除知乎标题中的私信和消息提醒。
// @description:zh-HK  去除知乎標題中的私信和消息提醒。
// @description:zh-CN  去除知乎標題中的私信和消息提醒。
// @author       TDL3
// @match        https://*.zhihu.com/*
// @grant        none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';
    let title = document.title;
    let node = document.querySelector('title');
    let observer = new MutationObserver(() => {
        if (document.title != title) {
            document.title = title;
        }
    });
    observer.observe(node, { childList: true });
})();