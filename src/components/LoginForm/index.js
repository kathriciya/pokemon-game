import { useState } from 'react';
import Input from '../Input';
import s from './style.module.css';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ email, password, auth });
    setEmail('');
    setPassword('');
  };

  const handleChoice = () => {
    setAuth(!auth);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Input
        label="Password"
        name="password"
        value={password}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <div className={s.flex}>
        <button>{auth ? 'Sing In' : 'Sing up'}</button>
        <span className={s.question} onClick={handleChoice}>
          {auth ? 'Register?' : 'Login?'}
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
