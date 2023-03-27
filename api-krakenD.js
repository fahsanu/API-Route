const express = require('express');
const app = express();
require('dotenv').config();

const { MongoClient } = require("mongodb");
const db = process.env.DATABASE_URL;
const client = new MongoClient("mongodb://admin01:4rFvbgt%256yhn@10.4.150.45:27017/admin?authSource=admin&readPreference=primary&directConnection=true&ssl=false");
const database_env = process.env.DATABASE;
const col_env = process.env.COL;

app.use(express.json())

app.post('/testnaja', (req, res) => {
    // console.log(req.body)
    res.status(200).json({ result: req.body })
})

app.get('/testtest', (req, res) => {
    try {
        const friendL = req.body.friend_list
        console.log(friendL)
        return res.status(200).json({ result: req.body, date: Date.now() })
    } catch (err) {
        return res.json({ status: true, message: err })
    }
})

async function get_my_friend(friend) {
    // console.log(friend)
    const database = client.db(database_env);
    const col = database.collection(col_env);  

    const query = { id_nfc_card: friend.id_friend_nfc_card, id_profile: friend.id_friend_profile }
    const options = { projection: { _id: 0 } }
    const output = await col.findOne(query, options)
    // console.log(output)
    return output
}

app.get('/get_friend', async (req, res) => {
    // console.log(req.params)
    // console.log(req.body)
    const friendL = req.body.friend_list
    // console.log(friendL)
    const dict = {}
    for (let i=0; i<friendL.length; i++){
        //console.log(friendL[i].id_friend_nfc_card)
        try {
            const _out = await get_my_friend(friendL[i])
            // console.log(_out)
            if (_out !== null) dict[friendL[i].id_friend] = _out
        } catch (err) {
            return res.json({ status: false, message: err });
        } 
     } console.log(dict) 
    return res.status(200).json(dict);
})

// res.status(200).json({ result : req.body , date : Date.now() })

app.listen(3000, () => console.log('::> Server is running.. on port 3000'));

