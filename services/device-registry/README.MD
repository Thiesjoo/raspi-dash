# Device Registry Service

## Usage

All responses will have the form

```json
{
    "data": "Mixed type holding the content of the response",
    "message": "Description of what happened"
}
```

Subsequent response definitions will only detail the expected value of the `data field`

## Types

* Sensor
* Switch



### List all devices

**Definition**

`GET /registry/devices`

**Response**

- `200 OK` on success

```json
[
    {
        "id": "floor-lamp",
        "label": "Floor Lamp",
        "type": {"type": "sensor", "unit": "C"}, //Can also contain: min/max, 
        "gateway": "192.1.68.0.2"
    },
]
```

### Registering a new device

**Definition**

`POST /devices`

**Arguments**

- `"id":string` a globally unique identifier for this device
- `"label":string` a friendly name for this device
- `"type":object` the type of the device as understood by the client
- `"gateway":string` the IP address of the device's controller

If a device with the given identifier already exists, an error will be thrown

**Response**

- `201 Created` on success

```json
    {
        "id": "floor-lamp",
        "label": "Floor Lamp",
        "type": {"type": "sensor", "unit": "C"},
        "gateway": "192.1.68.0.2"
    }
```


### Updating a device

**Definition**

`POST /devices`

**Arguments**

- `"id":string` a globally unique identifier for this device
- `"label":string` a friendly name for this device
- `"type":object` the type of the device as understood by the client
- `"gateway":string` the IP address of the device's controller

**Response**

- `200 OK` on success

```json
    {
        "id": "floor-lamp",
        "label": "Floor Lamp",
        "type": {"type": "sensor", "unit": "C"},
        "gateway": "192.1.68.0.2"
    }
```



## Lookup device details

`GET /registry/devices/<identifier>`

**Response**

- `404 Not Found` if the device does not exist
- `200 OK` on success

```json
{
    "identifier": "floor-lamp",
    "name": "Floor Lamp",
    "device_type": "switch",
    "controller_gateway": "192.1.68.0.2"
}
```

## Delete a device

**Definition**

`DELETE /registry/devices/<identifier>`

**Response**

- `404 Not Found` if the device does not exist
- `204 No Content` on success