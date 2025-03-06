type AlertMessageTypes = 'warning' | 'danger';

export interface AlertMessageProps {
  text: string;
  type: AlertMessageTypes;
}
