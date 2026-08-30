export const site = {
  name: "AA Embroidery Work",
  tagline: "Design · Stitch · Finish",
  phone: "9626202662",
  whatsapp: "919626202662",
  email: "aaembroideryjob@gmail.com",
  location: "7A, Kennady St, MG Nagar, Tharamani, Chennai, Greater Chennai, Tamil Nadu 600113",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=7A%2C%20Kennady%20St%2C%20MG%20Nagar%2C%20Tharamani%2C%20Chennai%2C%20Tamil%20Nadu%20600113"
};

export function whatsappUrl(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const googleBusiness = "https://www.google.com/maps/place/AA+Embroidery+works/data=!4m2!3m1!1s0x0:0xec70333c7d18f663?sa=X&ved=1t:2428&ictx=111";
