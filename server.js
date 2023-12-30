const express = require('express');
const app = express();

const users = [
    {name:"User 1", id: 1},
    {name:"User 2", id: 2},
    {name:"User 3", id: 3},
    {name:"User 4", id: 4},
    {name:"User 5", id: 5},
    {name:"User 6", id: 6},
    {name:"User 7", id: 7},
    {name:"User 8", id: 8},
    {name:"User 9", id: 9},
    {name:"User 10", id: 10},
    {name:"User 11", id: 11},
    {name:"User 12", id: 12},
    {name:"User 13", id: 13},
    {name:"User 14", id: 14},
    {name:"User 15", id: 15},
    {name:"User 16", id: 16},
    {name:"User 17", id: 17}
]

const posts = [
    {name:"Post 1", id: 1},
    {name:"Post 2", id: 2},
    {name:"Post 3", id: 3},
    {name:"Post 4", id: 4},
    {name:"Post 5", id: 5},
    {name:"Post 6", id: 6},
    {name:"Post 7", id: 7},
    {name:"Post 8", id: 8},
    {name:"Post 9", id: 9},
    {name:"Post 10", id: 10},
    {name:"Post 11", id: 11},
    {name:"Post 12", id: 12},
    {name:"Post 13", id: 13}
]

const paginatedResults = model => {
    return (req, res, next) => {
        const {page, limit} = req.query;
        const pageNum = parseInt(page);
        const limitNum =parseInt(limit)
        const start = (pageNum - 1) * limitNum;
        const end = pageNum * limitNum;
        const data = model.slice(start, end);
        const result = {data};
        if (end < model.length)
            result.next = {
                limit: limitNum,
                page: pageNum + 1,
            };
        if (start > 0)
            result.previous = {
                limit: limitNum,
                page: pageNum - 1,
            };
        res.paginatedResult = result;
        next();
    }
}

app.get('/users', paginatedResults (users), (req, res) => {
    res.json(res.paginatedResult);
});

app.get('/posts', paginatedResults (posts), (req, res) => {
    res.json(res.paginatedResult);
});

app.listen(3000);