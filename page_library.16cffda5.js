var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in a){var r=a[e];delete a[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},e.parcelRequired7c6=r),r("OBL1B"),(d=r("krGWQ")).refs.libraryListButtons.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;const t=d.refs.libraryListButtons.querySelector(".is-active");t&&t.classList.remove("is-active");e.target.classList.add("is-active")}));var n=r("bhaiH");r("a3DhO");var o=r("7g6iB"),s=r("9SnYn");r("fQ3Fn");n=r("bhaiH");function c(e){const{title:t,poster_path:a,release_date:r,genre_ids:o,id:s,vote_average:c}=e,d=c.toFixed(1);let l=r;l=l?r.slice(0,4):"No information";let i,m=`https://image.tmdb.org/t/p/w500/${a}`;return null===a&&(m="https://www.bworldonline.com/wp-content/uploads/2022/04/cinema02_14-01.jpg"),i=0===o.length?"No information":(0,n.createStringOfGenresForCard)(o),`\n    <li class="card__container" data-id="${s}">\n    <a class="link card-film-link" href="#" aria-label="${t}">\n    <img class="card__poster" data-id="${s}" src="${m}" height="574"  width="395"/>\n    <div class="description-wrapper">\n    <b class="card__film-name">${t}</b>\n    <p class="card__description">${i}<span class="film-year">${l}</span><span class="card__description-rating">${d}</span>\n    </p>\n    </div>\n    </a>\n    </li>`}var d=r("krGWQ");const l=new(0,r("2nhTy").Pagination);function i(e){d.refs.modalFilmBtnClose.removeEventListener("click",m),d.refs.modalBackdrop.removeEventListener("click",L),document.removeEventListener("keydown",p),d.refs.modalFilmBtnClose.addEventListener("click",u),d.refs.modalBackdrop.addEventListener("click",k),document.addEventListener("keydown",v);const t=s.default.load(o.WATCHED_KEY);t?(l.lastQuery=o.WATCHED_KEY,f(t),g(t)):console.log("wached storage is empty")}function m(){const e=s.default.load(o.QUEUE_KEY);l.calculateTotalPages(e.length),l.page>l.totalPages&&l.decrementPage(),g(e),l.renderMarkup()}function u(){const e=s.default.load(o.WATCHED_KEY);l.calculateTotalPages(e.length),l.page>l.totalPages&&l.decrementPage(),g(e),l.renderMarkup()}function f(e){l.resetPage(),l.calculateFilmsOnPage(),l.calculateTotalPages(e.length),l.renderMarkup()}function g(e){d.refs.filmListRef.innerHTML="";let t=(l.page-1)*l.filmsOnPage,a=t+l.filmsOnPage;const r=e.slice(t,a);s.default.remove(o.FILMS),s.default.save(o.FILMS,r),d.refs.filmListRef.innerHTML=r.map(c).join(""),l.renderMarkup()}function v(e){"Escape"===e.code&&u()}function k(e){e.target===d.refs.modalBackdrop&&u()}function p(e){"Escape"===e.code&&m()}function L(e){e.target===d.refs.modalBackdrop&&m()}d.refs.watchedBtn.addEventListener("click",(e=>i(e))),d.refs.queueBtn.addEventListener("click",(e=>function(e){d.refs.modalFilmBtnClose.removeEventListener("click",u),d.refs.modalBackdrop.removeEventListener("click",k),document.removeEventListener("keydown",v),d.refs.modalFilmBtnClose.addEventListener("click",m),d.refs.modalBackdrop.addEventListener("click",L),document.addEventListener("keydown",p);const t=s.default.load(o.QUEUE_KEY);t?(l.lastQuery=o.QUEUE_KEY,f(t),g(t)):console.log("wached storage is empty")}())),d.refs.pagination.addEventListener("click",(function(e){if("UL"===e.target.nodeName)return;"btn__next"===e.target.className&&l.incrementPage();"btn__prev"===e.target.className&&l.decrementPage();if("dots"===e.target.className)return;"num"===e.target.className&&(l.page=Number(e.target.textContent));g(s.default.load(l.lastQuery))})),r("fQE3M"),r("7bYU0");var y=r("25RCP");r("6Y62z");var h=r("fdJ8Z"),E=r("amyG6"),S=r("jdAHv");r("lvn3g");var _=r("iQIUW");const q=(0,y.initializeApp)(h.firebaseConfig),b=(0,E.getAuth)(q);(0,E.onAuthStateChanged)(b,(e=>{e?S.refs.heroLibrary.classList.remove("hidden-tab"):S.refs.userLibrary.addEventListener("click",_.Notify.failure("Sorry, Your are not allowed to perform this action."))}));d=r("krGWQ");var w=r("a3vHV");function B(){try{"dark"===localStorage.getItem("theme")?(document.querySelector("body").classList.add("dark"),document.querySelector(".hero").classList.add("dark"),document.querySelector(".themetoggle").classList.add("dark"),document.querySelector(".material-icons").classList.add("dark"),document.querySelector("header").classList.add("dark"),document.querySelector(".modal-dark").classList.add("dark"),document.querySelector(".day-nigth-btn-box").classList.add("dark"),document.querySelector(".container-footer").classList.add("dark"),document.querySelector(".card__container").classList.add("dark"),document.querySelector(".modal-film ").classList.add("dark"),document.querySelector(".card-list").classList.add("dark"),document.querySelector(".pagination__list").classList.add("dark")):(document.querySelector("body").classList.remove("dark"),document.querySelector(".hero").classList.remove("dark"),document.querySelector(".themetoggle").classList.remove("dark"),document.querySelector(".material-icons").classList.remove("dark"),document.querySelector("header").classList.remove("dark"),document.querySelector(".modal-dark").classList.remove("dark"),document.querySelector(".day-nigth-btn-box").classList.remove("dark"),document.querySelector(".container-footer").classList.remove("dark"),document.querySelector(".card__container").classList.remove("dark"),document.querySelector(".modal-film ").classList.remove("dark"),document.querySelector(".card-list").classList.remove("dark"),document.querySelector(".pagination__list").classList.remove("dark"))}catch(e){}}r("kDD30"),r("kDD30"),document.querySelector(".themetoggle").addEventListener("click",(e=>{e.preventDefault(),"dark"===localStorage.getItem("theme")?localStorage.removeItem("theme"):localStorage.setItem("theme","dark"),B()})),B(),(0,n.saveGenres)(),d.refs.pagination.removeEventListener("click",w.onChangePageClick),i();
//# sourceMappingURL=page_library.16cffda5.js.map
