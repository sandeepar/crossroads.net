$buoop = {}
$buoop.ol = window.onload
window.onload = ->
  try
    $buoop.ol()  if $buoop.ol
  e = document.createElement("script")
  e.setAttribute "type", "text/javascript"
  e.setAttribute "src", "//browser-update.org/update.js"
  document.body.appendChild e
  return
