!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),a=null;function d(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));e.style.backgroundColor=t}n.disabled=!0,t.addEventListener("click",(function(){t.disabled=!0,n.disabled=!1,d(),a=setInterval((function(){d()}),1e3)})),n.addEventListener("click",(function(){t.disabled=!1,n.disabled=!0,clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.4b28478b.js.map