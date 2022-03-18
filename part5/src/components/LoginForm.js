import React from 'react'

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange}) => 
    <form onSubmit={handleLogin}>
        <div>
          Username: 
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
        Password: 
          <input
            type="text"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
    </form>
    
export default LoginForm