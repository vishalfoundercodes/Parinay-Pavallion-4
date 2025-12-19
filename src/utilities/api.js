

export const baseUrlPavallion = "https://Parinaypavallionadmin.codescarts.com";

export const configModalPavallion = `${baseUrlPavallion}/api/`;

const apis = {
  login: `${configModalPavallion}auth/login`,
  services_list: `${configModalPavallion}services/list`,
  slider_list: `${configModalPavallion}slider/list`,
  properties_counts: `${configModalPavallion}properties/counts`,
  featured_venue: `${configModalPavallion}services/featured_venue_list`,
};

export default apis;
