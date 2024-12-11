# School Management API

This is a simple School Management API built using Node.js and Express. The API allows you to add schools and list schools sorted by distance from a given latitude and longitude.

## Endpoints

### Add a School

- **URL:** `/api/addSchool`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body Parameters:**
    - `name` (string): The name of the school.
    - `address` (string): The address of the school.
    - `latitude` (number): The latitude of the school's location.
    - `longitude` (number): The longitude of the school's location.

- **Example Request:**
    ```json
    {
        "name": "ABC School",
        "address": "123 Main St",
        "latitude": 40.7128,
        "longitude": -74.0060
    }
    ```

- **Responses:**
    - **Success:** `200 OK`
        ```json
        {
            "status": "SUCCESS",
            "message": "School was added!"
        }
        ```
    - **Error:** `400 Bad Request`
        ```json
        {
            "status": "ERROR",
            "message": "All the fields are required!"
        }
        ```

### List Schools

- **URL:** `/api/listSchools`
- **Method:** `GET`
- **Query Parameters:**
    - [latitude](http://_vscodecontentref_/0) (number): The latitude of the reference location.
    - [longitude](http://_vscodecontentref_/1) (number): The longitude of the reference location.

- **Example Request:**
    ```http
    GET /api/listSchools?latitude=40.7128&longitude=-74.0060
    ```

- **Responses:**
    - **Success:** `200 OK`
        ```json
        {
            "status": "SUCCESS",
            "message": "Sorted Schools: ",
            "data": {
                "length": 2,
                "schools": [
                    {
                        "id": 1,
                        "name": "ABC School",
                        "address": "123 Main St",
                        "latitude": 40.7128,
                        "longitude": -74.0060,
                        "distance": 0
                    },
                    {
                        "id": 2,
                        "name": "XYZ School",
                        "address": "456 Elm St",
                        "latitude": 40.7306,
                        "longitude": -73.9352,
                        "distance": 5.5
                    }
                ]
            }
        }
        ```
    - **Error:** `400 Bad Request`
        ```json
        {
            "status": "ERROR",
            "message": "Latitude and longitude must be valid numbers"
        }
        ```

## Database

The database should have a table named `schools` with the following structure:

```sql
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);