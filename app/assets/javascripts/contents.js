$(function () {

  $(document).on('turbolinks:load', function (e) {
    var dropdown_elems = document.querySelectorAll('.dropdown-trigger');
    var dropdown_instances = M.Dropdown.init(dropdown_elems, { coverTrigger: false, constrainWidth: false});

    M.Modal._count = 0;
    var modal_elems = document.querySelectorAll('.modal');
    var modal_instances = M.Modal.init(modal_elems);

    var tooltipped_elems = document.querySelectorAll('.tooltipped');
    var tooltipped_instances = M.Tooltip.init(tooltipped_elems);

    $(".flash-msg").delay(1500).fadeOut(1000);
    // var editor = new FroalaEditor('#post_text', { language: 'es'})
  });

  $(document).on("turbolinks:before-cache", function () {
    M.AutoInit();
  });

})


