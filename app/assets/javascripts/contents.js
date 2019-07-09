$(function () {

  $(document).on('turbolinks:load', function (e) {
    var dropdown_elems = document.querySelectorAll('.dropdown-trigger');
    var dropdown_instances = M.Dropdown.init(dropdown_elems, { coverTrigger: false, constrainWidth: false});

    M.Modal._count = 0;
    var modal_elems = document.querySelectorAll('.modal');
    var modal_instances = M.Modal.init(modal_elems);
  });

  
})


