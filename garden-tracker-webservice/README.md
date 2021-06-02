# GardenData garden tracker webservice
    This webservice accepts growing data which the user inputs. It also allows the user to retrieve their data using many different search filters. This data would be particularly useful to display as chart data.


## Technologies used
    Core technologies:
        - Node js
        - express js
    Unit testing:
        - chai

## How to run the project?
    To run the project download the project using git or as a zip file.  
    Then run the following commands:
        - npm install
        - cd Controller
        - node index

## Garden tracker webservice API endpoints:
    - /sowingForm             |   POST HTTP Body { username, plantType, date, quantity, token  }
    - /getSowingData          |   GET HTTP Body { username, token }
    - /getSowingDataByDate    |   GET HTTP Body { username, date, token }
    - /getSowingDataByType    |   GET HTTP Body { username, plantType, token }
    - /getSowingDataByDT      |   POST HTTP Body { plantType, date, username, token  }
    - /plantingForm           |   POST HTTP Body { username, plantType, date, quantity, token  }
    - /getPlantingData        |   GET HTTP Body { username, token  }
    - /getPlantingDataByDate  |   GET HTTP Body { username, date, token  }
    - /getPlantingDataByType  |   GET HTTP Body { username, plantType, token  }
    - /getPlantingDataByDT    |   GET HTTP Body { username, plantType, date, token  }
    - /harvestingForm         |   POST HTTP Body { username, plantType, date, quantity, token  }
    - /getHarvestData         |   GET HTTP Body { username, token  }
    - /getHarvestDataByDate   |   GET HTTP Body { username, date, token  }
    - /getHarvestDataByType   |   GET HTTP Body { username, plantType, token  }
    - /getHarvestDataByDT     |   GET HTTP Body { username, plantType, date, token  }