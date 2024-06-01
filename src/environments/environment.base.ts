export const BASE_IP = 'api/v1';

export const environment = {
  version: '1.0.0',
  BASE_URL: '/',

  AUTHENTICATE: BASE_IP + '/Users/login/',
  REGISTER: BASE_IP + '/Users/register/',

  /* HOTELS */
  HOTEL_LIST: BASE_IP + '/Hotel/get',
  HOTEL_ADD: BASE_IP + '/Hotel/create',
  HOTEL_EDIT: BASE_IP + '/Hotel/update',

  /* USERS */
  USERS_LIST: BASE_IP + '/Users',
  USERS_ADD: BASE_IP + '/Users/register',

  /* TYPES */
  TYPES_ALL: BASE_IP + '/Types/',

  /* ROOMS */
  ROOMS_GET: BASE_IP + '/Rooms/Get',
  ROOMS_ADD: BASE_IP + '/Rooms/Create',
  ROOMS_EDIT: BASE_IP + '/Rooms/Update',
  ROOMS_DELETE: BASE_IP + '/Rooms/Delete',

  /* RESERVATIONS */
  RESERVATIONS_ADD: BASE_IP + '/Reservation/create',
};