import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const JwtAuth = Joi.object()
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    })
    .label("JwtAuth");

export const UserCredentialsSpec = Joi.object()
  .keys({
      email: Joi.string().email().example("homer@simpson.com").required().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
      password: Joi.string().example("SoftwareSecurity@2022").regex(/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").max(35).regex(/^[A-Z][a-z]{2,}$/),
  lastName: Joi.string().example("Simpson").max(35).regex(/^[A-Z][a-z]{2,}$/),
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
export const ReviewSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("Mary Shelley"),
        description: Joi.string().required().example("It was grand"),
        rating: Joi.string().required().example("1").max(1).regex(/^[0-5]$/),
        user: Joi.string().required().example("Mary Shelley"),
        publicplacemarkid: IdSpec,
    })
    .label("Review");

export const ReviewSpecPlus = ReviewSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("ReviewPlus");

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");
export const PublicPlacemarkSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("public"),
        userid: IdSpec,
        reviews: ReviewArraySpec,
        // rating: Joi.string().required().example("1").max(1).regex(/^[0-5]$/),
    })
    .label("PublicPlacemark");

export const PublicPlacemarkSpecPlus = PublicPlacemarkSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("PublicPlacemarkPlus");

export const PublicPlacemarkArraySpec = Joi.array().items(PublicPlacemarkSpecPlus).label("PublicPlacemarkArray");
