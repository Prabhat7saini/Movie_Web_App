import {ReactNode} from 'react'
import { UserState } from '../utils/UserInterface';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
interface ProtectedRouteProps {
    children: ReactNode;
  }
const PrivateRoue = ({ children }: ProtectedRouteProps) => {
    const  currentUser = useSelector((state: UserState) => state.currentUser);
  
    if (!currentUser) {
        return (<Navigate to="/login" />);
      }
      return children;
  
}

export default PrivateRoue
