$(function() {
  // Close alert box when clicked on 'x'.
  $(".alert-close").on("click", function() {
    $(this).parent().hide();
  });

  // Delete a company.
  $("#deleteCompanyButton").click(function(e) {
    e.preventDefault();

    if (confirm("Are you sure you want to delete?")) {
      $("#deleteCompanyForm").submit();
    } else {
      return false;
    }
  });

  // Delete a pickup value.
  $("#deletePickupValueButton").click(function(e) {
    e.preventDefault();

    if (confirm("Are you sure you want to delete?")) {
      $("#deletePickupValueForm").submit();
    } else {
      return false;
    }
  });
});