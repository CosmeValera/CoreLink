export const URL = 'http://localhost:3013/webclient'

export const MESSAGES = {
  EVENTS_ACKNOWLEDGED: 'COMMAND:EVENTS:ACKNOWLEDGED',
  EVENTS_UPDATE: 'EVENTS:UPDATE',
  EVENTS_START: 'EVENTS:START',
  EVENTS_FETCH: 'EVENTS:FETCH',
  EVENT_CREATE: 'EVENT:CREATE',
  EVENT_NEW: 'EVENT:NEW',
  EVENT_UPDATE: 'EVENT:UPDATE',
  HANDSHAKE: 'HANDSAKE',
}

export const SESSION = {
  username: 'Unknown user',
  role: 'Guest',
  domain: 'FLEET',
  privileges: [
    'CL_ACK',
    'CL_EDIT_EVENT',
    'CL_APPLY_FILTER',
    'CL_NOTES',
    'CL_CONFIGURE_COLUMNS',
    'CL_CONFIGURE_AUTO_ACK',
    'CL_CONFIGURE_SOUNDS',
    'CL_EVENTS',
    'CL_ALERTS',
    'CL_CONFIGURE_SATELLITES',
  ],
}

export const SOCKET_OPTS = { transports: ['websocket'], forceNew: true }
