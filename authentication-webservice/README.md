# GardenData authentication webservice
This webservice handles the authentication and registration of users. Once the user has successfully passed the authentication process they will receive a Json Web Token (JWT) which will allow them to access API endpoints from other webservices associated with the GardenData project.

## Technologies used
    Core technologies:
        - Node js
        - express js
    Unit testing:
        - chai

### Database migration
    To migrate db run the following commands:
    - cd migration
    - node migration.js

## How to run the project?
    To run the project download the project using git or as a zip file.  
    Then run the following commands:
        - npm install
        - node index

## Authentication webservice API endpoints:
    - /register
    - /login
    - /auth