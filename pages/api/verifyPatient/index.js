import nextConnect from "next-connect";
import { post } from "../../../src/controllers/verifyPatient";

const route = nextConnect();

route.post(post);

export default route;
