import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { publicPlacemarkController } from "./controllers/public-placemark-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/loginoauth", config: accountsController.loginoauth },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index }, // this is what shows the placemarks
  { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },
  { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlacemark },

  { method: "GET", path: "/public", config: publicPlacemarkController.index },
  { method: "POST", path: "/public/addpublicplacemark", config: publicPlacemarkController.addPublicPlacemark },
  // { method: "GET", path: "/public/{id}", config: publicPlacemarkController.index }, this doesnt work
  { method: "GET", path: "/public/deletepublicplacemark/{id}", config: publicPlacemarkController.deletePublicPlacemark },

    // { method: "GET", path: "/review", config: publicPlacemarkController.index },
  { method: "GET", path: "/review/{id}", config: publicPlacemarkController.showReviews },
  { method: "POST", path: "/review/{id}/addreview", config: publicPlacemarkController.addReview },
  { method: "GET", path: "/review/{id}/deletereview/{reviewid}", config: publicPlacemarkController.deleteReview },

  { method: "GET", path: "/placemark/{id}", config: placemarkController.index }, // this is what shows the landmarks
  { method: "POST", path: "/placemark/{id}/addlandmark", config: placemarkController.addLandmark },
  { method: "GET", path: "/placemark/{id}/deletelandmark/{landmarkid}", config: placemarkController.deleteLandmark },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
