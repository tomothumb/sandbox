# Javascript Note

### forEachはIE１１サポート外

```
# NOT WORK
document
  .querySelectorAll(".foobar")
  .forEach(function(element, idx) {
    ...
});

# WORK
  var tmp_nodelist = document.querySelectorAll(".foobar");
  var tmp_node = Array.prototype.slice.call(tmp_nodelist,0);
  tmp_node.forEach(function(element, idx) {
      ...
  });
```