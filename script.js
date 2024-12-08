// JavaScript to handle contact form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    alert(`Message Sent!\nEmail: ${email}\nMessage: ${message}`);
    // Reset form
    document.getElementById('contactForm').reset();
  });
  
  // Display alert when "Contact Me" button is clicked
  document.getElementById('contactBtn').addEventListener('click', function () {
    alert('Thank you for reaching out! Feel free to contact me using the form below.');
  });
  