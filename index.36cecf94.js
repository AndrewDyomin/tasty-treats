!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,n){r[e]=n},n.parcelRequired7c6=i),i.register("Vzp7G",(function(n,t){var r=i("bpxeT"),c=i("2TvXO"),o=i("dIxxU"),a=document.querySelector(".popular-recipes-list"),s="https://tasty-treats-backend.p.goit.global/api/recipes/popular";function l(){return(l=e(r)(e(c).mark((function n(){var t,r;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.default.get(s);case 3:t=e.sent,r=p(t.data),a&&(a.innerHTML=r),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),n,null,[[0,8]])})))).apply(this,arguments)}function p(e){return e.map((function(e){var n=e.preview,t=e.title,r=e.description,i=e._id,c=r.length>80?r.substring(0,77)+"...":r;return'<li class="recip-item" id="'.concat(i,'">\n          <img class="recip-img" src="').concat(n,'" alt="').concat(t,'" width="64"/>\n          <div class="recip-content">\n            <h3 class="recip-heading">').concat(t,'</h3>\n            <p class="recip-short-descr">').concat(c,"</p>\n          </div>\n        </li>")})).join("")}!function(){l.apply(this,arguments)}()})),i("Vzp7G")}();
//# sourceMappingURL=index.36cecf94.js.map