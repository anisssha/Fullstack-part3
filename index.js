const express = require("express");
const cors = require('cors');
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
    {
        id: 5,
        name: "Charles Vyunik",
        number: "69-23-4567890",
    },
];

let currentDate = new Date();


morgan.token("data", (req) => JSON.stringify(req.body));
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :data")
);






const getAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};

app.get("/", (req, res) => {
    res.send("<h1> Hey! FullStackOpen❤️❤️ </h1>");
});

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for 2 people</p> <p> ${currentDate}</p>`)

});


app.get("/api/persons", (req, res) => {
    res.json(persons);
});



app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((p) => p.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((person) => person.id !== id);

    res.sendStatus(204);
});
app.post("/api/persons", (req, res) => {
    const generateId = () => {
        return Math.floor(Math.random() * 1000);
    };

    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number is missing",
        });
    }

    if (persons.find((p) => p.name === body.name))
        return res.status(400).json({
            error: "name already exits",
        });

    const newPerson = req.body;
    newPerson.id = generateId();

    persons = persons.concat(newPerson);
    res.json(newPerson);
});

const PORT = 3001;

app.listen(PORT, () =>
    console.log(`listening on port http://localhost:${PORT}`)
);