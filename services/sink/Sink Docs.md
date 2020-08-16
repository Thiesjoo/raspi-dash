# Sink service



## Types

* Sensor
    - Data must be provided like this:
    ```json
    {
        "time": 1597522021969,
        "value": <numerical value of data>, 
    }
    ``` 
    - Next time

## Time data precision
*For most sensors*

- 1 hour: keep full precision (Max 1/min)
- Daily: Keep full precision (Max 1/min)
- Weekly: Keep hourly average
- Monthly keep hourly average

## How it's stored
Every sensor gets it's own mongodb collection

Once a day has passed: 
- *Check if an archive is there*
- Gather all data from this day,
- Gather device data from dev-reg
- Get method of aggregating the data

- Make a new archive object with data

```json
    {
        "type": "archive_day",  //New object daily, but can also create archive_month
        "timeStart": "<start time>",
        "timeEnd": "<start time> + 3600", // An hour of data,
        "precision": "3600", // seconds
        "samples": [ 
            {"val": "50,2", "time": 1535530412}
            //List of 24 samples
        ]
    }


    {
        "type": "realtime",
        "timeStart": "<start time>",
        "timeEnd": "<start time> + 3600", // An hour of data,
        "precision": "60",
        "samples": [
            {"value": "50,3", "time":1535530412 }
            // List of maximum 1440 samples. (24*60)
        ]
    }
```


## How to ingest data
You connect to the socket at the same port the api is hosted.
