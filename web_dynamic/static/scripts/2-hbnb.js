$(document).ready(function () {
  const amenityIds = {};
  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      amenityIds[this.dataset.id] = this.dataset.name;
    } else {
      delete amenityIds[this.dataset.id];
    }
    $('.amenities h4').text(Object.values(amenityIds).sort().join(', '));
    $('.amenities h4').css({
      width: '100%',
      height: '100%',
      'white-space': 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'margin-left': '15%',
      'margin-top': '0',
      'padding-top': '10px',
      'padding-bottom': '5px',
      'margin-bottom': '20px',
      'font-weight': '400',
      'font-size': '14px'
    });
  });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
