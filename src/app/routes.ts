const routes: any[] = [
  /* Rutas Super Admin */
  {
    name: 'Inicio',
    link: '/super/home',
    iconType: 'FontAwesome',
    icon: 'fa-solid fa-house-user',
    onlySuperAdmin: true,
  },
  {
    name: 'Hoteles',
    link: '/super/hotellist',
    iconType: 'FontAwesome',
    icon: 'fa-solid fa-hotel',
    onlySuperAdmin: true,
  },
  {
    name: 'Usuarios',
    link: '/super/userlist',
    iconType: 'FontAwesome',
    icon: 'fa-solid fa-users',
    onlySuperAdmin: true,
  },

  /* Rutas Administrador */
  {
    name: 'Inicio',
    link: '/hotel/home',
    iconType: 'FontAwesome',
    icon: 'fa-solid fa-house-user',
    onlyAdministrador: true,
  },

  {
    name: 'Usuarios',
    link: '/hotel/users',
    iconType: 'FontAwesome',
    icon: 'fa-solid fa-house-user',
    onlyAdministrador: true,
  },

  {
    name: 'Administracion de Habitaciones',
    iconType: 'FontAwesome',
    icon: 'fa-solid fa-hotel',
    onlyAdministrador: true,
    subItems: [
      {
        name: 'Habitaciones',
        link: '/hotel/rooms',
      },
      {
        name: 'Tipos de Habitaciones',
        link: '/hotel/types',
      },
    ],
  },

  /* Rutas Empleado */
  {
    name: 'Inicio',
    link: '/hotel/home',
    iconType: 'FontAwesome',
    icon: 'fa-solid fa-house-user',
    onlyEmpleado: true,
  },

  /* Rutas Cliente */
  {
    name: 'Inicio',
    link: '/client/home',
    iconType: 'FontAwesome',
    icon: 'fa-solid fa-house-user',
    onlyClient: true,
  },
  {
    name: 'Reservaciones',
    iconType: 'FontAwesome',
    icon: 'fa-solid fa-magnifying-glass-location',
    onlyClient: true,
    subItems: [
      {
        name: 'Mis Reservaciones',
        link: '/client/listreservation',
      },
      {
        name: 'Hacer Reservacion',
        link: '/client/makereservation',
      },
    ],
  },
];

export { routes };
