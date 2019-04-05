$(window).on('scroll', function() {
  $('.section').each(function() {
    if ($(window).scrollTop() >= $(this).offset().top) {
      var id = $(this).attr('id');
      $('nav a').removeClass('active');
      $(`nav a[href="#${id}"]`).addClass('active');
    }
  });
});

let name = '';
let mobile = '';
let email = '';
let address = '';
let pincode = '';
let applyFor = '';
let distLevel = '';
let expInvestment = '';
let comment = '';
console.log('inside ready');
console.log($('.apply-form-button'));
$('.apply-form-button').click(function(e) {
  e.preventDefault();
  let serialApply = $('.apply-form').serializeArray();
  if (
    serialApply[0].value &&
    serialApply[1].value &&
    serialApply[2].value &&
    serialApply[3].value &&
    serialApply[4].value &&
    serialApply[5].value &&
    serialApply[6].value &&
    serialApply[7].value &&
    serialApply[8].value
  ) {
    console.log($('.apply-form').serializeArray());
    $('.apply-form')
      .serializeArray()
      .forEach(obj => {
        switch (obj.name) {
          case 'name':
            name = obj.value;
            break;
          case 'mobile':
            mobile = obj.value;
            break;
          case 'email':
            email = obj.value;
            break;
          case 'address':
            address = obj.value;
            break;
          case 'pincode':
            pincode = obj.value;
            break;
          case 'apply-for':
            applyFor = obj.value;
            break;
          case 'distributor-level':
            distLevel = obj.value;
            break;
          case 'expected-investment':
            expInvestment = obj.value;
            break;
          case 'comment':
            comment = obj.value;
        }
      });
    const body = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #ddd;
    }
    </style>
    </head>
    <body>
    <h2>Application Request</h2>
      <table>
      <tr>
      <td><b>Name:</b> </td>
      <td>${name}</td>
      </tr><tr>
      <td><b>Number:</b> </td>
      <td>${mobile}</td>
      </tr><tr>
      <td><b>Email:</b> </td>
      <td>${email}</td>
      </tr><tr>
      <td><b>Address:</b> </td>
      <td>${address}</td>
      </tr><tr>
      <td><b>Pincode:</b> </td>
      <td>${pincode}</td>
      </tr><tr>
      <td><b>Apply For:</b> </td>
      <td>${applyFor}</td>
      </tr><tr>
      <td><b>Distributor Level:</b> </td>
      <td>${distLevel}</td>
      </tr><tr>
      <td><b>Expected Investment:</b> </td>
      <td>${expInvestment}</td>
      </tr></table>
      <p><b>Comments:</b><br /> ${comment}</p>
      </body></html>`;

    const bodyEncoded = new URLSearchParams();
    bodyEncoded.append('from_email', email);
    bodyEncoded.append('to_email', 'mail@opintasolutions.com');
    bodyEncoded.append('subject', 'application');
    bodyEncoded.append('content', body);

    $.ajax({
      url:
        'https://wt-4896982400a54bf82243b9417c45f1ea-0.sandbox.auth0-extend.com/sendgrid_Patanjali',
      type: 'POST',
      data: `${bodyEncoded}`,
      contentType: 'application/x-www-form-urlencoded',
      success: res =>
        res.statusCode === 202
          ? alert('Application Sent, Thank You')
          : alert('Something went wrong ! Please try again'),
      error: err => console.log(err),
    });
  } else {
    alert('Please fill out the entire application form ?');
  }
});

let contactName = '';
let contactEmail = '';
let contactMssg = '';
$('.contact-form-button').click(function(e) {
  e.preventDefault();
  let serialArray = $('#contact-form').serializeArray();
  if (serialArray[0].value && serialArray[1].value && serialArray[2].value) {
    $('#contact-form')
      .serializeArray()
      .forEach(obj => {
        switch (obj.name) {
          case 'name':
            contactName = obj.value;
            break;
          case 'email':
            contactEmail = obj.value;
            break;
          case 'mssg':
            contactMssg = obj.value;
            break;
        }
      });

    const contactBody = `<h2>Message</h2><b>Name: ${contactName}</b><br /><b>Email: ${contactEmail}</b><br /><p>${contactMssg}</p>`;

    const contactbodyEncoded = new URLSearchParams();
    contactbodyEncoded.append('from_email', contactEmail);
    contactbodyEncoded.append('to_email', 'mail@opintasolutions.com');
    contactbodyEncoded.append('subject', 'message');
    contactbodyEncoded.append('content', contactBody);

    $.ajax({
      url:
        'https://wt-4896982400a54bf82243b9417c45f1ea-0.sandbox.auth0-extend.com/sendgrid_Patanjali',
      type: 'POST',
      data: `${contactbodyEncoded}`,
      contentType: 'application/x-www-form-urlencoded',
      success: res =>
        res.statusCode === 202
          ? alert('Message Sent, Thank You')
          : alert('Something went wrong ! Please try again'),
      error: err => console.log(err),
    });
  } else {
    alert('Please fill the complete form ?');
  }
});
