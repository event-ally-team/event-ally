const logoutFormHandler = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/signIn');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logoutFormHandler);
