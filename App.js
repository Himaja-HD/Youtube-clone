import React, { useEffect, useState } from 'react';

function App() {
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setUserToken(token);
      localStorage.setItem('auth_token', token);
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Google Login with JWT</h1>
      {userToken ? (
        <p>Token stored in localStorage ✅</p>
      ) : (
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      )}
    </div>
  );
}

export default App;
