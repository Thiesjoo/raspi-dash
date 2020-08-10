# Sink service

## TEMP Sensor types
- GPS Store where user has been
- Store bandwidth used. Wifi and 4g
- 


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
- Calculate hourly average's (Or add all value's together)
- Calculate max and min of this day (If specified in device registry)

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
            {"val": "50,3", "time":1535530412 }
            // List of maximum 1440 samples. (24*60)
        ]
    }
```