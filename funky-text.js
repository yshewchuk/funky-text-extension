chrome.storage.sync.get(['funkyMatchPattern'], function(result) {
  //disable for now
  return;

  if(result.funkyMatchPattern === undefined || new RegExp(result.funkyMatchPattern).test(window.location.href)) {
    String.prototype.replaceAt=function(index, replacement) {
       return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
    };

    function toRandomCase(str) {
        var result = str;
       for (var i = 0; i < str.length; i++) {
         if (Math.random() > 0.5) {
           result = result.replaceAt(i, str[i].repeat(1).toLowerCase());
         } else {
           result = result.replaceAt(i, str[i].repeat(1).toUpperCase());
         }
       }
        return result;
    }

    (function () {
        var all = document.getElementsByTagName("*");
       for (var i=0; i < all.length; i++) {
            if (all[i].tagName.toLowerCase() !== 'script'
                && all[i].tagName.toLowerCase() !== 'style'
                && all[i].textContent.length > 0
                && all[i].innerHTML.startsWith(all[i].textContent)) {

               all[i].innerHTML = toRandomCase(all[i].textContent) + all[i].innerHTML.slice(all[i].textContent.length);
           }
        }
    })();
  }
});
