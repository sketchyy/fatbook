import { v4 as uuidv4 } from "uuid";

const uuidService = {
  get() {
    return uuidv4();
  },
};

// TODO: same as dateService
export default uuidService;
