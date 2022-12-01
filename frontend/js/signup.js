const handleSubmission = async () => {
  if (password.length <= 0) return alert("You need to move at least one tile!?")
  let user_email = document.getElementById('email').value
  if (user_email == '') return alert("You need to provide your email!?")
  
  let dataToSend = {
    password: password,
    email: user_email
  }
  let response = await fetch('https://Scrambler-Password-Backend.egrep6021ad.repl.co/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(dataToSend)
  });

  let result = await response.json();
  if (result) {
    window.location.href = '../html/authenticated.html';
    return false;
  }
  else {
    alert("That email is already taken!")
    window.location.href = '../html/signup.html';
    return false;
  }
}