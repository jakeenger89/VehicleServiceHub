# CarCar

Team:

* Jake Enger - Sales master
* Sarah - Services

## How to Run this App
1. clone Project Beta from GitLab
2. git clone "project"
3. docker volume create beta-data
4. docker-compose build
5. docker-compose up

## Diagram:
![Alt text](Sarah_and_Jake_Project_Beta_Diagram.png)

## API Documentation example for Service (appointments/technicians)
Example of JSON Body for Create Service Appointment:
{
	"reason": "flat tire",
	"vin": "5164651564",
	"customer": "Steve",
	"technician": 10,
	"date_time": "2023-09-25 06:00"
}
What to expect back from Create Service Appointment:
{
	"date_time": "2023-09-25 06:00",
	"reason": "flat tire",
	"status": "created",
	"vin": "5164651564",
	"customer": "Steve",
	"technician": {
		"first_name": "first",
		"last_name": "last",
		"employee_id": 5636,
		"id": 10
	}
}

Example of JSON Body for Create Technician:
{
	"employee_id": 5678,
	"first_name": "Sarah",
	"last_name": "Corkum"
}

What to expect back from Create Technician:
{
	"first_name": "Sarah",
	"last_name": "Corkum",
	"employee_id": 5678,
	"id": 14
}

## URLs and Ports
Service microservice:
- List service appointment:     GET     http://localhost:8080/api/appointments/
- Delete service appointment:   DELETE  http://localhost:8080/api/appointments/<int:pk>/
- Create service appointment:   POST    http://localhost:8080/api/appointments/
- Finish service appointment:   PUT     http://localhost:8080/api/appointments/<int:pk>/finish/
- Cancel service appointment:   PUT     http://localhost:8080/api/appointments/<ing:pk>/cancel/
- Delete technician:            DELETE  http://localhost:8080/api/technicians/<int:pk>/
- Create technician:            POST    http://localhost:8080/api/technicians/
- List technicians:             GET     http://localhost:8080/api/technicians/

## Service microservice

The service microservice has a Technician model, AutomobileVO model, and Appointment model. The AutomobileVO is a value object based on the inventory's Automobile model. The Automobile model and AutomobileVO model are in two different bounded contexts. The poller is pulling the automobile data from the inventory API and giving it to the AutomobileVO model. The Appointment model in the service microservice has a technician property. This technician data comes from the Technician model in the service microservice.

## API Documentation examples for Sale (sale, customer, and salesperson)
Create a sale POST: JSON request:
{
    "price": 10000,
    "automobile": "50",
    "salesperson": "D20",
    "customer": 1
}
Preview example:
{
	"salesperson": {
		"first_name": "Jake ",
		"last_name": "Enger",
		"employee_id": "D20"
	},
	"customer": {
		"first_name": "Lucky",
		"last_name": "Customer",
		"address": "23232 323pl se Seattle, WA",
		"phone_number": "564-434-5677"
	},
	"price": 10000
}
Create a Customer Post: JSON request:
{
    "first_name": "Jimmy",
    "last_name": "Neutron",
    "address": "123 Main St, City",
    "phone_number": "555-123-4567"
}
Preview example:
{
	"id": 5,
	"first_name": "Jimmy",
	"last_name": "Neutron"
}
Create a Salesperson Post: JSON request:
{
    "first_name": "Jim",
    "last_name": "bob",
    "employee_id": "4"
}
preview example:
{
	"first_name": "jim",
	"last_name": "bob",
	"employee_id": "4"
}


## URLs and Ports
Sales microservice:
- List salespeople	                GET	    http://localhost:8090/api/salespeople/
- Create a salesperson	            POST	http://localhost:8090/api/salespeople/
- Delete a specific salesperson	    DELETE	http://localhost:8090/api/salespeople/:id/
- List customers	                GET	    http://localhost:8090/api/customers/
- Create a customer	                POST	http://localhost:8090/api/customers/
- Delete a specific customer	    DELETE	http://localhost:8090/api/customers/:id/
- List sales	                    GET	    http://localhost:8090/api/sales/
- Create a sale	                    POST	http://localhost:8090/api/sales/
- Delete a sale	                    DELETE	http://localhost:8090/api/sales/:id

## Sales microservice

the sales microservice inclues four models, AutomobileVO, Salesperson, Customer, and Sale. each with respected model.char/text fields and foreignkeys. Sales gets information from Customer, Sale, the AutomobileVO is used in poller to check for vin numbers and we can correspond sales with a particular vehicle/automobile via their vin number.

## Value Objects
-AutomobileVO
