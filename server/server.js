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

const notion = new Client({auth: notionSecret});

(async () => {
    const response = await notion.databases.retrieve({ database_id: notionDatabaseId });
})();

(async  () => {
    const response = await notion.pages.create({
        parent: {
            database_id: notionDatabaseId,
        },
        properties: {
            'name': {
                type: 'title',
                title: [
                    {
                        type: 'text',
                        text: {
                            content: 'Nimuthu',
                        },
                    },
                ],
            },
            'id' : {
                type: 'rich_text',
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: 'C004',
                        },
                    }
                ],
            },
            'address': {
                type: 'rich_text',
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: 'Dankotuwa',
                        },
                    }
                ],
            },
        }
    });
    console.log(response);
})();

(async () => {
    const response = await notion.databases.query({
        database_id: notionDatabaseId,
        "filter": {
            "property": "id",
            "rich_text": {
                "contains": 'C002'
            }
        }
    });
    console.log(response.results[0].properties.name.title[0].plain_text)
    console.log(response.results[0].properties.id.rich_text[0].plain_text)
    console.log(response.results[0].properties.address.rich_text[0].plain_text)
    return response.results[0].id;
})();







