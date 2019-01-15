chrome.storage.sync.get(['funkyMatchPattern'], function(result) {
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
    };

    function updateDom(el) {
        var current, iterator = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: function(node) { return (node.parentElement.nodeName == "SCRIPT" || node.parentElement.nodeName == "STYLE") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } }, false);
        while (current=iterator.nextNode()) {
            current.nodeValue = toRandomCase(current.textContent);
        }
    };
    
    updateDom(document);
    
    function mutationCallback(mutationsList, observer) {
        for(var mutation of mutationsList) {
            for (var added of mutation.addedNodes) {
                updateDom(added);
            }
        }
    };

    var observer = new MutationObserver(mutationCallback);
    observer.observe(document, { childList: true, subtree: true });
  }
});
