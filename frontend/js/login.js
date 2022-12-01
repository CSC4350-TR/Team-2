const handleSubmission = async () => {
  if (password.length <= 0) {
    // Let the user know they need to move at lease one tile:
    alert("You need to move at least one image tile!?")
    // Refresh the page:
    return window.location.href = '../html/login.html';
  }
  let user_email = document.getElementById('email').value
  if (user_email == '') {
    // Let the user know they need to input an email:
    alert("You need to provide your email!?")
    // Refresh the page:
    return window.location.href = '../html/login.html';
  }
  // Create an object for the credentials:
  let dataToSend = {
    password: password,
    email: user_email
  }
  // Post the credentials to the backend:
  let response = await fetch('https://Scrambler-Password-Backend.egrep6021ad.repl.co/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(dataToSend)
  });
  // Parse the server response:
  let result = await response.json();
  // If the server response is True, authenticate the user:
  if (result) {
    window.location.href = '../html/authenticated.html';
    return false;
  }
  // Otherwise, refresh the page because credentials were invalid:
  else {
    alert("Incorrect email / password combination!")
    window.location.href = '../html/login.html';
  }
}

