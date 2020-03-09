$(document).on("click", "#myTabs li", function() {
  var tab_div_id = $(this)
    .find("a")
    .attr("href");

  $("#myTabs li").removeClass("active");

  $(this).addClass("active");

  var data_count = $(tab_div_id).html().length;

  var loader = '<div class="tab-content-loader">Loading pleaseee</div>';

  $("#tab-content-id-pane")
    .find(".tab-content-loader")
    .remove();

  if (data_count < 50) {
    $("#tab-content-id-pane .tab-pane").hide();
    $("#tab-content-id-pane").append(loader);

    var url = "https://jsonplaceholder.typicode.com/posts";

    $.ajax({
      type: "GET",
      crossOrigin: true,
      crossDomain: true,
      url: url,
      dataType: "json",
      async: false,
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      success: function(data) {
        //  console.log(data);

        var body_data = "";
        data.map((val, key) => {
          body_data += createTr(val);
        });

        doneMap(tab_div_id, body_data);
      }
    });
  }
});

function doneMap(tab_div_id, body_data) {
  var table =
    "<table class='table'> <thead><tr> <td>Title</td><td>Topics</td></tr></thead> <tbody>" +
    body_data +
    "</tobody></table>";

  $(tab_div_id).html(table);
  $("#tab-content-id-pane")
    .find(".tab-content-loader")
    .remove();
  $(tab_div_id).show();
}

function createTr(data) {
  var row = "<tr> <td>" + data.title + " </td><td>" + data.body + "</td> </tr>";

  return row;
}
