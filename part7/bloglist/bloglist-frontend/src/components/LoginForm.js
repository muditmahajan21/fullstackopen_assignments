import React from "react";

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      Username:
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      Password:
      <input
        id="password"
        type="text"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button id="login-buton" type="submit">
      login
    </button>
  </form>
);

export default LoginForm;
