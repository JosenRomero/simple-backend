import { connect } from "mongoose";

const URI: string = "mongodb://localhost/notesDB";

export const connection = (async () => {

    try {
        
        await connect(URI);

        console.log("DB is connected")
        
    } catch (err) {
        console.error("Failed to connect to MongoDB", err)
    }

})();