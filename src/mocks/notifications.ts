export interface Notification {
  id: string;
  icon: string;
  description: string;
  timestamp: string;
  type: 'member' | 'certificate' | 'group' | 'seedbed' | 'report';
  read: boolean;
}

// Función para obtener notificaciones desde localStorage
export const getNotifications = (): Notification[] => {
  const stored = localStorage.getItem('notifications');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error cargando notificaciones:', e);
      return [];
    }
  }
  return [];
};

// Función para agregar una nueva notificación
export const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
  const notifications = getNotifications();
  const newNotification: Notification = {
    ...notification,
    id: Date.now().toString(),
    read: false
  };
  notifications.unshift(newNotification);
  
  // Mantener solo las últimas 50 notificaciones
  if (notifications.length > 50) {
    notifications.pop();
  }
  
  localStorage.setItem('notifications', JSON.stringify(notifications));
  return newNotification;
};

// Función para marcar una notificación como leída
export const markNotificationAsRead = (id: string) => {
  const notifications = getNotifications();
  const updated = notifications.map(n => 
    n.id === id ? { ...n, read: true } : n
  );
  localStorage.setItem('notifications', JSON.stringify(updated));
};

// Función para obtener el conteo de notificaciones no leídas
export const getUnreadCount = (): number => {
  const notifications = getNotifications();
  return notifications.filter(n => !n.read).length;
};

// Funciones helper para crear notificaciones específicas
export const createCertificateNotification = (certificateName: string) => {
  return addNotification({
    icon: 'ri-award-line',
    description: `Certificado emitido: ${certificateName}`,
    timestamp: new Date().toLocaleString('es-CO'),
    type: 'certificate'
  });
};

export const createSeedbedNotification = (seedbedName: string, action: string) => {
  return addNotification({
    icon: 'ri-team-fill',
    description: `Semillero ${action}: ${seedbedName}`,
    timestamp: new Date().toLocaleString('es-CO'),
    type: 'seedbed'
  });
};

export const createGroupNotification = (groupName: string, action: string) => {
  return addNotification({
    icon: 'ri-team-fill',
    description: `Grupo ${action}: ${groupName}`,
    timestamp: new Date().toLocaleString('es-CO'),
    type: 'group'
  });
};

export const createMemberNotification = (memberName: string, action: string) => {
  return addNotification({
    icon: 'ri-user-add-line',
    description: `Integrante ${action}: ${memberName}`,
    timestamp: new Date().toLocaleString('es-CO'),
    type: 'member'
  });
};

export const createStatusChangeNotification = (itemName: string, itemType: string, newStatus: string) => {
  return addNotification({
    icon: itemType === 'group' ? 'ri-team-fill' : 'ri-team-fill',
    description: `Estado cambiado en ${itemType}: ${itemName} ahora es ${newStatus}`,
    timestamp: new Date().toLocaleString('es-CO'),
    type: itemType === 'group' ? 'group' : 'seedbed'
  });
};
