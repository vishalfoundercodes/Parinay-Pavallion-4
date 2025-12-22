

export const baseUrlPavallion = "https://Parinaypavallionadmin.codescarts.com";

export const configModalPavallion = `${baseUrlPavallion}/api/`;

const apis = {
  register: `${configModalPavallion}auth/register`,
  login: `${configModalPavallion}auth/login`,
  services_list: `${configModalPavallion}services/list`,
  slider_list: `${configModalPavallion}slider/list`,
  properties_counts: `${configModalPavallion}properties/counts`,
  featured_venue: `${configModalPavallion}services/featured_venue_list`,
  availability_venues: `${configModalPavallion}availability/venues`,
  event_types: `${configModalPavallion}availability/event-types`,
  check_availability: `${configModalPavallion}availability/check?property_id=`,
  halls_list: `${configModalPavallion}halls/list`,
  lawns_list: `${configModalPavallion}lawns/lawns_list`,
  rooms_list: `${configModalPavallion}rooms/list`,
  gallery_list: `${configModalPavallion}gallery/list`,
  contact_info: `${configModalPavallion}contact/info`,
  send_message: `${configModalPavallion}contact/send-message`,
  booking_create: `${configModalPavallion}booking/create`,
  my_bookings: `${configModalPavallion}/booking/my-bookings`,
};

export default apis;
