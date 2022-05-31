export const seedData = {
    users: {
        _model: "User",
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "secret"
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: "secret"
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: "secret"
        }
    },
    placemarks: {
        _model: "Placemark",
        ucc: {
            name: "UCC Favourites",
            userid: "->users.bart"
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