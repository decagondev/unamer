const express = require('express');
const { exec } = require('child_process');
const CORS = require('cors');

const app = express();
app.use(CORS());

const PORT = process.env.PORT || 3000;

app.get('/uname', (req, res) => {
    exec('uname -a', (error, stdout, stderr) => {
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
