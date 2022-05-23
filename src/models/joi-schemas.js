import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const LandmarkSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("ucc"),
    description: Joi.string().required().example("Beach"),
    latitude: Joi.string().required().example("52.785"),
    longitude: Joi.string().required().example("7.55"),
    placemarkid: IdSpec,
  })
  .label("Landmark");

export const LandmarkSpecPlus = LandmarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LandmarkPlus");

export const LandmarkArraySpec = Joi.array().items(LandmarkSpecPlus).label("LandmarkArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("cork"),
    userid: IdSpec,
    landmarks: LandmarkArraySpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");
