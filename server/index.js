const app = require('./app/index');

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
