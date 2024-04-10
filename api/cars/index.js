module.exports = async function (context, req) {
    console.log(req);
    // Import cars data
    const cars = require('./cars.json');

    // Enable CORS
    context.res = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    };

    // Extract request method and path
    const { method, path } = req;

    // Route requests based on method and path
    switch (method) {
        case 'GET':
            if (path === '/cars') {
                context.res.body = cars;
            } else if (path.startsWith('/cars/')) {
                const id = path.substring(6);
                const car = cars.find(car => car.id === id);
                context.res.body = car || "Car not found";
            }
            break;
        case 'POST':
            if (path === '/cars') {
                const newCar = req.body;
                cars.push(newCar);
                context.res.body = newCar;
            }
            break;
        case 'PUT':
            if (path.startsWith('/cars/')) {
                const id = path.substring(6);
                const index = cars.findIndex(car => car.id === id);
                if (index !== -1) {
                    const updatedCar = req.body;
                    cars[index] = updatedCar;
                    context.res.body = updatedCar;
                } else {
                    context.res.status = 404;
                    context.res.body = "Car not found";
                }
            }
            break;
        case 'DELETE':
            if (path.startsWith('/cars/')) {
                const id = path.substring(6);
                const index = cars.findIndex(car => car.id === id);
                if (index !== -1) {
                    cars.splice(index, 1);
                    context.res.body = { message: `Car with id ${id} deleted` };
                } else {
                    context.res.status = 404;
                    context.res.body = "Car not found";
                }
            }
            break;
        default:
            context.res.status = 405;
            context.res.body = "Method not allowed";
            break;
    }
    console.log("hello");
};