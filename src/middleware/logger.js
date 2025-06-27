const log = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    level,
    message,
    timestamp,
    data
  };
  
  const existingLogs = JSON.parse(localStorage.getItem('appLogs') || '[]');
  existingLogs.push(logEntry);
  localStorage.setItem('appLogs', JSON.stringify(existingLogs));
};

export const logger = {
  info: (message, data) => log('INFO', message, data),
  error: (message, data) => log('ERROR', message, data),
  warn: (message, data) => log('WARN', message, data)
};