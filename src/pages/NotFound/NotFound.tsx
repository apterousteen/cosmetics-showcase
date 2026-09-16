import { useLocation } from 'wouter';
import { StatusMessage } from '../../components/StatusMessage/StatusMessage';
import { texts } from '../../constants/texts';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

/** Экран несуществующего адреса. */
export function NotFound() {
  const [, navigate] = useLocation();

  useDocumentTitle(texts.notFoundTitle);

  return <StatusMessage {...texts.notFound} action={{ label: texts.toShowcase, onClick: () => navigate('/') }} />;
}
