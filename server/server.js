const  express = require('express')
require('dotenv').config()


const app = express();
const port = 4000;

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

app.listen(port, (req,res) => {
    console.log(`Example app listening on port ${port}`)
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const { Client } = require('@notionhq/client');

if (!notionDatabaseId || !notionSecret) {
    throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

const notion = new Client({
    auth: notionSecret,
});

(async () => {
    const response = await notion.databases.retrieve({ database_id: notionDatabaseId });
    console.log(response);
})();




