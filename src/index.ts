import { main } from "./main";
import { local } from "./config/app-config";

main(local).catch(console.error);
