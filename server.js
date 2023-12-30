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

app.get('/users', (req, res) => {
    const {page, limit} = req.query;
    const pageNum = parseInt(page);
    const limitNum =parseInt(limit)
    const start = (pageNum - 1) * limitNum;
    const end = pageNum * limitNum;
    const data = users.slice(start, end);
    const result = {data};
    if (end < users.length)
        result.next = {
            limit: limitNum,
            page: pageNum + 1,
        };
    if (start > 0)
        result.previous = {
            limit: limitNum,
            page: pageNum - 1,
        };

    res.json(result);
})

app.listen(3000);