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
  
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({}),
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          $('section.places').append('<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + data[i].max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + data[i].number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data[i].number_bathrooms + ' Bathroom</div></div><div class="description">' + data[i].description + '</div></article>');
        }
      }
    });
  
    $('button').click(function () {
      $('article').remove();
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: JSON.stringify({ amenities: Object.keys(amenityIds) }),
        contentType: 'application/json',
        success: function (data) {
          for (let i = 0; i < data.length; i++) {
            $('section.places').append('<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + data[i].max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + data[i].number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data[i].number_bathrooms + ' Bathroom</div></div><div class="description">' + data[i].description + '</div></article>');
          }
        }
      });
    });
  });