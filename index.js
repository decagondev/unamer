const express = require('express');
const { exec } = require('child_process');
const CORS = require('cors');

const app = express();
app.use(CORS());

const PORT = process.env.PORT || 3000;

function hashStringToKey(input) {
    const HASH_KEY_OFFSET = 0x811c9dc5;
    const HASH_KEY_PRIME = 0x01000193;
    const stringToHash = input.trim();
    let hash = HASH_KEY_OFFSET;        
    for (let i = 0; i < stringToHash.length; i++) {
        hash ^= stringToHash.charCodeAt(i);
        hash *= HASH_KEY_PRIME;
    }        
    const h = hash >>> 0;
    return h.toString(16);
}  

app.get('/hasher/:key', (req, res) => {
    const { key } = req.params;
    const hashedKey = hashStringToKey(key);
    res.status(200).send(hashedKey);
})


app.get('/uname', (req, res) => {
    exec('ls /proc', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).send(stdout);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
