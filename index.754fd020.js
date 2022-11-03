!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequired7c6=a),a("6J3A5");var o=a("8MBJY"),s=a("a2hTj"),i=function(){"use strict";function t(r){var n=r.selector;e(o)(this,t),this.refs=this.getRefs(n)}return e(s)(t,[{key:"getRefs",value:function(e){var t={};return t.backdrop=document.querySelector(e),t.spinner=t.backdrop.querySelector(".spinner-grow"),t}},{key:"enable",value:function(){this.refs.backdrop.classList.add("is-hidden")}},{key:"disable",value:function(){this.refs.backdrop.classList.remove("is-hidden")}}]),t}(),c=a("FJC5b"),u=a("4Vhfo"),l=a("bpxeT"),d=a("2TvXO"),f=a("8RVSI"),p=a("h6c0i"),m=a("h0FqT"),g=(u=a("4Vhfo"),a("h0Lhl")),h=a("d9uG3"),v=a("4Nugj"),y=new(0,f.QueryHandler),L=new i({selector:'[data-action="load-spinner"]'});function k(){return(k=e(l)(e(d).mark((function t(r){var n,a,o,s,i,c,l,f,k;return e(d).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),n=r.target,a=n.elements.searchQuery,o=a.value.trim().toLowerCase()){e.next=6;break}return p.Notify.failure("Enter the name of the movie!"),e.abrupt("return");case 6:return L.disable(),y.query=o,e.prev=8,e.next=11,y.fetchQueryResultsForMovieSearch();case 11:if(s=e.sent,i=s.results,c=s.total_results,l=s.page,f=s.total_pages,i.length){e.next=19;break}return y.query=g.default.load(h.LAST_REQUEST),e.abrupt("return",p.Notify.failure("Search result not successful. Enter the correct movie name."));case 19:if(g.default.save(h.LAST_REQUEST,o),u.pagination.removeMarkup(),f>1&&(u.pagination.totalPages=f,u.pagination.page=l,u.pagination.fetch=function(e){return y.fetchQueryResultsForMovieSearch(e)},u.pagination.renderMarkup()),i.length){e.next=26;break}return p.Notify.failure("Search result not successful. Enter the correct movie name."),L.enable(),e.abrupt("return");case 26:p.Notify.success("Hooray! We found ".concat(c," movie!")),g.default.remove(h.FILMS),g.default.save(h.FILMS,i),k=i.map(m.createCardMarkup).join(""),v.refs.filmListRef.innerHTML=k,e.next=36;break;case 33:e.prev=33,e.t0=e.catch(8),console.log(e.t0);case 36:return e.prev=36,L.enable(),e.finish(36);case 39:case"end":return e.stop()}}),t,null,[[8,33,36,39]])})))).apply(this,arguments)}v.refs.searchForm.addEventListener("submit",(function(e){return k.apply(this,arguments)})),p.Notify.init({timeout:1500,position:"center-top",backOverlay:!1,borderRadius:"25px"});l=a("bpxeT"),d=a("2TvXO"),p=a("h6c0i"),v=a("4Nugj"),m=a("h0FqT"),g=a("h0Lhl"),h=a("d9uG3"),f=a("8RVSI"),u=a("4Vhfo");var S=new(0,f.QueryHandler),b=window.SpeechRecognition||window.webkitSpeechRecognition;if(b){console.log("Your Browser supports speech Recognition");var q=new b;q.continuous=!0,q.lang="en-US";var _=document.querySelector(".search-btn__mic"),x=_.firstElementChild;_.addEventListener("click",(function(){console.log("yes"),x.classList.contains("mic-stop")?q.start():q.stop()})),q.addEventListener("start",(function(){x.classList.remove("mic-stop"),x.classList.add("mic-rec"),v.refs.info.classList.add("search-form__info--hover"),v.refs.searchFormInput.focus(),console.log("Voice activated, SPEAK")})),q.addEventListener("end",(function(){x.classList.remove("mic-rec"),x.classList.add("mic-stop"),v.refs.info.classList.remove("search-form__info--hover"),v.refs.searchFormInput.focus(),console.log("Speech recognition service disconnected")})),q.addEventListener("result",(function(e){var t=v.refs.searchFormInput,r=e.resultIndex,n=e.results[r][0].transcript;t.value?"search"===n.toLowerCase().trim()?(!function(){w.apply(this,arguments)}(),q.stop()):"reset"===n.toLowerCase().trim()?t.value="":t.value=n:t.value=n})),v.refs.info.textContent='Voice Commands: "reset", "search"'}else console.log("Your Browser does not support speech Recognition"),v.refs.info.textContent="Your Browser does not support Speech Recognition";function w(){return(w=e(l)(e(d).mark((function t(){var r,n,a,o,s,i,c;return e(d).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=v.refs.searchFormInput.value.trim().toLowerCase(),S.query=r,e.prev=2,e.next=5,S.fetchQueryResultsForMovieSearch();case 5:if(n=e.sent,a=n.results,o=n.total_results,s=n.page,i=n.total_pages,a.length){e.next=13;break}return S.query=g.default.load(h.LAST_REQUEST),e.abrupt("return",p.Notify.failure("Search result not successful. Enter the correct movie name."));case 13:if(g.default.save(h.LAST_REQUEST,r),u.pagination.removeMarkup(),i>1&&(u.pagination.totalPages=i,u.pagination.page=s,u.pagination.fetch=function(e){return S.fetchQueryResultsForMovieSearch(e)},u.pagination.renderMarkup()),a.length){e.next=19;break}return p.Notify.failure("Search result not successful. Enter the correct movie name."),e.abrupt("return");case 19:p.Notify.success("Hooray! We found ".concat(o," movie!")),g.default.remove(h.FILMS),g.default.save(h.FILMS,a),c=a.map(m.createCardMarkup).join(""),v.refs.filmListRef.innerHTML=c,e.next=29;break;case 26:e.prev=26,e.t0=e.catch(2),console.log(e.t0);case 29:case"end":return e.stop()}}),t,null,[[2,26]])})))).apply(this,arguments)}function M(){try{"dark"===localStorage.getItem("theme")?(document.querySelector("body").classList.add("dark"),document.querySelector(".hero").classList.add("dark"),document.querySelector(".themetoggle").classList.add("dark"),document.querySelector(".material-icons").classList.add("dark"),document.querySelector("header").classList.add("dark"),document.querySelector(".modal-dark").classList.add("dark"),document.querySelector(".day-nigth-btn-box").classList.add("dark"),document.querySelector(".container-footer").classList.add("dark"),document.querySelector(".card__container").classList.add("dark"),document.querySelector(".modal-film ").classList.add("dark"),document.querySelector(".card-list").classList.add("dark"),document.querySelector(".pagination__list").classList.add("dark")):(document.querySelector("body").classList.remove("dark"),document.querySelector(".hero").classList.remove("dark"),document.querySelector(".themetoggle").classList.remove("dark"),document.querySelector(".material-icons").classList.remove("dark"),document.querySelector("header").classList.remove("dark"),document.querySelector(".modal-dark").classList.remove("dark"),document.querySelector(".day-nigth-btn-box").classList.remove("dark"),document.querySelector(".container-footer").classList.remove("dark"),document.querySelector(".card__container").classList.remove("dark"),document.querySelector(".modal-film ").classList.remove("dark"),document.querySelector(".card-list").classList.remove("dark"),document.querySelector(".pagination__list").classList.remove("dark"))}catch(e){}}a("2e8uc"),a("73ES2"),a("cbjz0"),a("cbjz0"),a("aZhHc"),document.querySelector(".themetoggle").addEventListener("click",(function(e){e.preventDefault(),"dark"===localStorage.getItem("theme")?localStorage.removeItem("theme"):localStorage.setItem("theme","dark"),M()})),M();l=a("bpxeT"),d=a("2TvXO");var E=a("dIxxU");f=a("8RVSI"),g=a("h0Lhl"),h=a("d9uG3"),m=a("h0FqT"),v=a("4Nugj"),v=a("4Nugj"),u=a("4Vhfo"),p=a("h6c0i");a("73ES2");var I="https://api.themoviedb.org/3/";v.filterItem.genreForm.addEventListener("input",(function(e){return F.apply(this,arguments)})),v.filterItem.yearForm.addEventListener("input",(function(e){return R.apply(this,arguments)})),v.filterItem.resetButton.addEventListener("click",(function(e){e.preventDefault(),u.pagination.resetPage(),v.filterItem.genreForm.options.selectedIndex=0,v.filterItem.yearForm.options.selectedIndex=0,T.genre="",T.year="",T.page=1,v.refs.filmListRef.innerHTML="",(0,u.renderMarkupTrending)()})),v.refs.pagination.removeEventListener("click",u.onChangePageClick),v.refs.pagination.addEventListener("click",(function(e){if("UL"===e.target.nodeName)return;"btn__next"===e.target.className&&u.pagination.incrementPage();"btn__prev"===e.target.className&&u.pagination.decrementPage();if("dots"===e.target.className)return;"num"===e.target.className&&(u.pagination.page=Number(e.target.textContent));u.pagination.fetch(u.pagination.page).then((function(e){var t=e.results;console.log(t),console.log(u.pagination.fetch);var r=t.map(m.createCardMarkup).join("");g.default.save(h.FILMS,t),v.refs.filmListRef.innerHTML=r})).catch((function(e){return console.log(e)})),u.pagination.renderMarkup()}));var T={year:"",genre:"",query:"",discover:"trending",page:""};function F(){return(F=e(l)(e(d).mark((function t(r){return e(d).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),console.log(r),r.target.value===T.genre&&T.genre||u.pagination.resetPage(),!r){e.next=7;break}return T.genre=r.target.value,e.next=7,N(T.genre,T.year,u.pagination.page).then((function(e){if(0!==e.results.length){v.refs.filmListRef.innerHTML="";var t=e.results.map(m.createCardMarkup).join("");v.refs.filmListRef.innerHTML=t}else p.Notify.failure("Nothing was found for your request")})).catch((function(e){return console.log(e)}));case 7:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function R(){return(R=e(l)(e(d).mark((function t(r){return e(d).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),r.target.value===T.year&&T.year||u.pagination.resetPage(),!r){e.next=6;break}return T.year=Number(r.target.value),e.next=6,N(T.genre,T.year,u.pagination.page).then((function(e){if(0!==e.results.length){v.refs.filmListRef.innerHTML="";var t=e.results.map(m.createCardMarkup).join("");v.refs.filmListRef.innerHTML=t}else p.Notify.failure("Nothing was found for your request")})).catch((function(e){return console.log(e)}));case 6:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function N(){return C.apply(this,arguments)}function C(){return C=e(l)(e(d).mark((function t(){var r,n,a,o,s,i,c,l,p,m,h=arguments;return e(d).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=h.length>0&&void 0!==h[0]?h[0]:"",n=h.length>1&&void 0!==h[1]?h[1]:"",a=h.length>2&&void 0!==h[2]?h[2]:"",o=h.length>3&&void 0!==h[3]?h[3]:"",T.year="start"!==v.filterItem.yearForm.value||""!==n?"&primary_release_year=".concat(v.filterItem.yearForm.value):"",T.genre=""!==r&&"start"!==v.filterItem.genreForm.value?"&with_genres=".concat(v.filterItem.genreForm.value):"",T.query="&query=".concat(o),""===o&&(T.queryFetch=""),""!==o&&""===r&&(T.discover="search"),""===o&&""!==r&&(T.discover="discover"),""===o&&""!==n&&(T.discover="discover"),s="".concat(I).concat(T.discover,"/movie?api_key=").concat(f.MOVIEDB_KEY,"&sort_by=popularity.desc").concat(T.genre).concat(T.year,"&include_adult=false&page=").concat(a),e.next=11,E.default.get(s);case 11:return i=e.sent,c=i.data,l=c.total_pages,p=c.page,m=c.results,g.default.save("films",m),g.default.save("totalItems",l),g.default.save("itemsPerPage",m.length),l>1&&(u.pagination.totalPages=l,u.pagination.page=p,u.pagination.fetch=function(e){return N(T.genre,T.year,e)},u.pagination.renderMarkup()),e.abrupt("return",i.data);case 18:case"end":return e.stop()}}),t)}))),C.apply(this,arguments)}!function(){for(var e=[],t=(new Date).getFullYear();t>=1950;t-=1)e.push("<option class = 'filter__form-years' value=\"".concat(t,'">').concat(t,"</option>"));var r=e.join("");v.filterItem.yearForm.insertAdjacentHTML("beforeend",r)}(),(0,c.saveGenres)().then((function(){return(0,u.renderMarkupTrending)()})).catch((function(e){return console.log(e)})),new i({selector:'[data-action="load-spinner"]'}).enable()}();
//# sourceMappingURL=index.754fd020.js.map
