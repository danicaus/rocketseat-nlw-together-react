import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}