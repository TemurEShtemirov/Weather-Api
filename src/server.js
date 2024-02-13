import express from "express";
import 'dotenv/config'

async function bootstrap() {
  const app = express();
  const port = process.env.PORT || 4963;

  app.listen(port,()=>{
    console.log('Ok');
  });
}


bootstrap()