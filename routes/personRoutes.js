const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/person', async (req, res) => {
    try {
        const person = new Person(req.body);  
        await person.save();
        console.log("saved");
        res.status(201).send({ message: "Person created successfully", data: person });
       
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "internal server error" });
    }
});

router.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).send({ message: "Data fetched successfully", data: data });
        
    } catch (error) {
        res.status(500).send({ error: "internal server error" });
    }
});

router.get('/person/:work', async (req, res) => {
    try {
    
        const data = await Person.find({ work: req.params.work });
        res.status(200).send({ message: "Data fetched successfully", data: data });
        console.log("data fetched");
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "internal server error" });
    }       
});

router.put('/person/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!person) {
            return res.status(404).send({ error: "Person not found", message: "Person not found" });
            console.log("Person not found");
        }
        res.status(200).send({ message: "Person updated successfully", data: person });
        console.log("data updated");
    } catch (error) {
        res.status(500).send({ error: "internal server error" });
    }
});

router.delete('/person/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) {
            console.log("Person not found");
            return res.status(404).send({ error: "Person not found", message: "Person not found"});
        }
        res.status(200).send({ message: "Person deleted successfully" , data: person });
        console.log("data deleted");
    } catch (error) {
        res.status(500).send({ error: "internal server error" });
    }   
});




module.exports = router;