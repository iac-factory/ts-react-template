import "./index.scss";

import { Client } from "./library";

import { Application } from "./application";

Client.serve("Application", Application);

export * from "./library";