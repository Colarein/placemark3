export const seedData = {
    users: {
        _model: "User",
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "$2a$10$0agNAmjprqmZQX9FWb1BAeDUy1Mt4dWgotA9BNu4sToND4EAc9J7W"
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: "$2a$10$HPmgLPOYYJDWtqkMr7O/Wew39gCdGnPf5lIffaac6bsJDlo6qBI7y"
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: "$2a$10$CeqV6mQpGEJT7f6fdl1Jt.sN.jetrbMjPvSIRfsQQgyWX8Ubgbbee"
        }
    },
    placemarks: {
        _model: "Placemark",
        ucc: {
            name: "University College Cork",
            userid: "->users.bart"
        }
    },
    publicPlacemarks: {
        _model: "PublicPlacemark",
        london: {
            name: "London",
            userid: "->users.bart"
        }
    },
    reviews: {
        _model: "Review",
        review_1: {
            name: "Bring an Umbrella!!",
            description: "Rained the whole trip. Didn't see the Queen. The pints were crap",
            userid: "->users.bart",
            user: "Simpson, Bart",
            rating: "1",
            publicplacemarkid: "->publicPlacemarks.london"
        }
    },

    landmarks: {
        _model : "Landmark",
        landmark_1 : {
            name: "UCC Honan Chapel",
            description: "UCC",
            latitude: 51.8935,
            longitude: 8.4898,
            placemarkid: "->placemarks.ucc"
        },
        landmark_2 : {
            name: "The Glucksman Gallery",
            description: "UCC",
            latitude: 51.9135,
            longitude: 8.5298,
            placemarkid: "->placemarks.ucc"
        },
        landmark_3 : {
            name: "The George Boole Library",
            description: "UCC",
            latitude: 51.7085,
            longitude: 8.6018,
            placemarkid: "->placemarks.ucc"
        },

    }
};