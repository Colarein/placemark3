export const seedData = {
    users: {
        _model: "User",
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa"
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK"
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: "$2a$10$uqnPlgyVjBEOtcgMhn/WRO3FwW4T9gX36tTB4RqpGeB/LkCR3YQuO"
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
            name: "Caroline Conway",
            description: "Didn't see the queen, was not impressed",
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