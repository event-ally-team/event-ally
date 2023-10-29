document.addEventListener('DOMContentLoaded', function () {
  const logoutFormHandler = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };

  $('#logout').on('click', function () {
    $.get('/logOut', function () {
      window.location.href = '/login';
    });
  });

  document.querySelector('#logout').addEventListener('click', logout);
});
