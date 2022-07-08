import nextConnect from "next-connect";
import { post } from "../../../src/controllers/paciente";

const route = nextConnect();

route.post(post);

export default route;
