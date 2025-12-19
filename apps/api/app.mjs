import express from "express";

class App {
  constructor(){
    this.server = express()
  }
}

const app = new App().server;
export default app;