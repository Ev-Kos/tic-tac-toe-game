import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router';

import { useAppSelector } from '../../services/store';
import { form } from '../../services/slices/formSlice';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { firstPlayer, secondPlayer, isBot } = useAppSelector(form);
  const navigate = useNavigate();

  useEffect(() => {
    const isFirstPlayerFilled = firstPlayer.trim() !== '';
    const isSecondPlayerFilled = secondPlayer.trim() !== '';
    const isBotGame = isBot;

    const hasAccess =
      (isFirstPlayerFilled && isSecondPlayerFilled) || (isFirstPlayerFilled && isBotGame);

    if (!hasAccess) {
      navigate('/', { replace: true });
    }
  }, [firstPlayer, secondPlayer, isBot, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
