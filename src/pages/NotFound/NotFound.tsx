import { useLocation } from 'wouter';
import { StatusMessage } from '../../components/StatusMessage/StatusMessage';
import { texts } from '../../constants/texts';

/** Экран несуществующего адреса. */
export function NotFound() {
  const [, navigate] = useLocation();

  return (
    <StatusMessage
      {...texts.notFound}
      action={{ label: texts.toShowcase, onClick: () => navigate('/') }}
    />
  );
}
