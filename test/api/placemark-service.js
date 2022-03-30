import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },
  async createPlacemark(placemark) {
    const res = await axios.post(`${this.placemarkUrl}/api/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const response = await axios.delete(`${this.placemarkUrl}/api/placemarks`);
    return response.data;
  },

  async deletePlacemark(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/placemarks/${id}`);
    return response;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async getAllLandmarks() {
    const res = await axios.get(`${this.placemarkUrl}/api/landmarks`);
    return res.data;
  },

  async createLandmark(id, landmark) {
    const res = await axios.post(`${this.placemarkUrl}/api/placemarks/${id}/landmarls`, landmark);
    return res.data;
  },

  async deleteAllLandmarks() {
    const res = await axios.delete(`${this.placemarkUrl}/api/landmarks`);
    return res.data;
  },

  async getLandmark(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/landmarks/${id}`);
    return res.data;
  },

  async deleteLandmark(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/landmarks/${id}`);
    return res.data;
  },
};
