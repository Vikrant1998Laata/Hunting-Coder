import * as fs from 'fs';

// We  just not want to read the directory name but we also want read directory data also
export default async function handler(req, res) {
  console.log(req.query.count)
let data = await fs.promises.readdir("blogdata")
data = data.slice(0, parseInt(req.query.count))
let myfile;
let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    console.log(item);
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    // console.log(myfile)
    allBlogs.push(JSON.parse(myfile)); // We are parsing myfile because it is a string
  }
   res.status(200).json(allBlogs) // Parsing the string data into object
   
  }