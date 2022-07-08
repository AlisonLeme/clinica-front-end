import nextConnect from "next-connect";
import { put } from "../../../src/controllers/consulta";

const route = nextConnect();

route.post(put);

export default route;
