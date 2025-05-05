type AlertMessageTypes = 'warning' | 'danger';

export interface AlertMessageProps {
  title: string;
  description?: string;
  type: AlertMessageTypes;
  className?: string;
}
