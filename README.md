# PlacemarkV2 is a site adapted from PlacemarkV1.
# Our inputs and out puts are sanitized using Joi Schemas and RegEx.
# The passwords of current users and new users are salted and hashed using BCrypt
# We also have JWT in use in the Authentication process
# If we choose to do so we can also validate our credentials by logging in via git hub without having to make our own account on  Placemark. Git hub is well known and trusted.
# Our development process has been tagged in GitHub.
# Not only does it have Private Placemarks viewable by the user who added them but it also have public Placemarks vieable to all logged in users.
# We have Reviews on these Public Placemarks and on these reviews you can give a rating out of 5 for if you would recommend the placemarks for others.
# We have unit tests from our previous PlacemarkV1, but now we have added additional unit tests on our Public Placemarks and also on our Reviews.
# 
 
# PlacemarkV1 is a site where a user can store all the placemarks and it's landmarks that the have visited across the world.
# The placemark site uses accounts a sign up and login function which uses cookie authentication and has user settings.
# It has functions to add features such as Name, Description and location (lat and lng) and it has some nice colourful images.
# It has a basic API and some relatively extensive Unit tests.
# It was built originally from mem, then it was upgraded to json and finally it is on Mongo.
# It has been deployed to the Glitch database and also works locally.
# It has been developed with tagged releases where development took place on branches where features were developed and then were committed to main.
