const swaggerAutogen = require("swagger-autogen");

const outputfile = "./swagger.json";  //ไฟล์ที่จะ output ออก
const read = ["./index.js"];  //อ่านจากไฟล์ไหนที่จะ autogen

const secureityDifinations = {
  basic: {
    type: "basic",
  },
  apiKey: {
    type: "apiKey",
    name: "authorization",
    in: "header",
  },
};

const doc = {
  info: {
    title: "MY API",
    version: "1.0.0",
  },
  secureityDifinations: secureityDifinations,
};

swaggerAutogen(outputfile, read, doc);