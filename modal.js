$(document).ready(function() {
  var target = document.location.hash.replace('#', '');
  if (target.length && target === 'apply-form') {
    $('#applyModal').modal('show');
  }
});
