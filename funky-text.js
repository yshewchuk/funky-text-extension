String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

(function () {
  var inner = document.body.innerHTML;
  var inTag = false;
  var inComment = false;

  if (document.body.tagName.toLowerCase() !== 'script' && document.body.tagName.toLowerCase() !== 'style' && inner && inner.length) {
    for (var i = 0; i < inner.length; i++) {
      if (!inComment && inner.slice(i, i + 4) === '<!--') {
        inComment = true;
      } else if (inComment && inner.slice(i, i + 3) == '-->') {
        inComment = false;
      } else if (!inTag && inner[i] === '<') {
        inTag = true;
      } else if (inTag && inner[i] === '>') {
        inTag = false;
      } else if (!inComment && !inTag && Math.random() > 0.5) {
        inner = inner.replaceAt(i, inner[i].repeat(1).toLowerCase());
      } else if (!inComment && !inTag) {
        inner = inner.replaceAt(i, inner[i].repeat(1).toUpperCase());
      }
    }
    document.body.innerHTML = inner;
  }
})();
