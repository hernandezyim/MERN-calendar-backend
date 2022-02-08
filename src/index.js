import app from "./app.js";

const port = app.get("port");

app.listen(port, () => console.log(`SERVER STARTING IN PORT ${port}`));
