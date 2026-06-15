import axios from "axios";

export const TestService = {
    async fetchHelloWorld() {
        try {
          const { data } = await axios.get("http://localhost:8000/", {
            headers: {
              Accept: "application/json",
            },
          });
    
          return data;
        }
        catch(error) {
          return error;
        }
    }
}