

export const baseUrlPavallion = "https://root.parinaypavallion.com";

export const configModalPavallion = `${baseUrlPavallion}/api/`;

const apis = {
  register: `${configModalPavallion}register`,
  login: `${configModalPavallion}login`,
  services_list: `${configModalPavallion}services`,
  slider_list: `${configModalPavallion}sliders`,
  properties_counts: `${configModalPavallion}properties-count`,
  featured_venue: `${configModalPavallion}featured-venues`,
  availability_venues: `${configModalPavallion}venues`,
  event_types: `${configModalPavallion}event-types`,
  check_availability: `${configModalPavallion}check-availability?property_id=`,
  halls_list: `${configModalPavallion}halls`,
  lawns_list: `${configModalPavallion}lawns`,
  rooms_list: `${configModalPavallion}rooms`,
  gallery_list: `${configModalPavallion}gallery-list`,
  contact_info: `${configModalPavallion}contact-info`,
  send_message: `${configModalPavallion}contact-message`,
  booking_create: `${configModalPavallion}checkout`, // yaha tk huaa hai
  my_bookings: `${configModalPavallion}booking/my-bookings`,
  privacy_policy: `${configModalPavallion}privacy-policy-html`,
  term_policy: `${configModalPavallion}terms-conditions-html`,
  cancel_policy: `${configModalPavallion}cancellation-policy-html`,
  my_cart: `${configModalPavallion}my-cart`,
  addRemoveCart: `${configModalPavallion}add-remove-cart`,
  getPropertiesById: `${configModalPavallion}properties/`,
  // https://root.parinaypavallion.com/api/privacy-policy-html
};

export default apis;
