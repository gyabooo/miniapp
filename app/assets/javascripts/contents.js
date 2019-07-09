$(function () {

  $(document).on('turbolinks:load', function (e) {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, { coverTrigger: false, constrainWidth: false});
  });

})


