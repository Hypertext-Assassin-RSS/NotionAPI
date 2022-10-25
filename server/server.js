const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
const port = 4000;

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

app.use(cors());
app.use(express.json());

app.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}`);
});



const { Client } = require("@notionhq/client");
const { json } = require("express");

if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

const notion = new Client({ auth: notionSecret });

app.get('/',(req,res)=> {
   res.send('This works')
})

app.get('/user',(req,res)=> {
    //console.log(req.query.id)
    //res.send('resived')
    (async () => {
  const response = await notion.databases.query({
    database_id: notionDatabaseId,
    filter: {
      property: "id",
      rich_text: {
        contains: req.query.id,
      },
    },
  });
  const name  = response.results[0].properties.name.title[0].plain_text
  const address = response.results[0].properties.address.rich_text[0].plain_text
  const id = response.results[0].properties.id.rich_text[0].plain_text

  res.json({'name':name,'address':address,'id':id})

//   console.log(response.results[0].properties.name.title[0].plain_text);
//   console.log(response.results[0].properties.address.rich_text[0].plain_text);
//   console.log(response.results[0].properties.id.rich_text[0].plain_text);
})();
})




app.post('/user',(req,res)=> {
    //console.log(req)
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
                            content: req.body.name,
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
                            content: req.body.id,
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
                            content: req.body.address,
                        },
                    }
                ],
            },
        }
    });
    console.log(response);
})();
    res.json({message:'User '+req.body.id+' Saved!'})
})


