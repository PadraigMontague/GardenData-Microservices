# GardenData load-balancer webservice
    This webservice handles all the incoming webservice traffic and assigns the http request to a server which is available to reliably handle the request. It is the responsibility of the developer to ensure the server instances array is updated to the correct locations of their own servers. This webservice also logs every request it receives to keep track of which API endpoint is receiving the most traffic. Currently the default number of connections each server are allowed to accept is 1024. Once the number of connections has exceeded 1024 then the load balancer will search for another server instance.

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

## Load-balancer webservice API endpoints:
    - /request