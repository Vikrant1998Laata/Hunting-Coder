import * as fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
    //   console.log(req.body)
    // Basically we are saying that we can save all the new filedata 
    let data = await fs.promises.readdir('contactdata');
      fs.promises.writeFile(`contactdata/${data.length+1}.json`, JSON.stringify(req.body))
      res.status(200).json(req)
    } else {
        res.status(200).json(["The new codding style"])
    }
  }