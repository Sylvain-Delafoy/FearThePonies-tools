$("document").ready(function() {
  function act() {
    let decoded = "";
    const message = $("#message")
      .val()
      .toLowerCase();
    const source = $("#alphabetsource")
      .val()
      .toLowerCase()
      .split("\n");
    const dest = $("#alphabetdestination")
      .val()
      .toLowerCase()
      .split("\n");
    for (var i = 0, keyidx=0; i < message.length; i++) {
      console.log(dest[i % dest.length], dest);
      const idx = message.charAt(i);
      if (source[i % source.length].includes(idx)) {
        decoded +=
          dest[keyidx % dest.length][source[keyidx % source.length].indexOf(idx)];
          keyidx++;
      } else {
        decoded += idx;
      }
    }
    $("#result").text(decoded);
  }
  $("#alphabetsource").change(act);
  $("#alphabetdestination").change(act);
  $("#message").change(act);
});
