const fs = require("fs");

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      // read the file
      const path = `./content/${req.body.trade}`;
      fs.readFile(`./content/${req.body.trade}/${req.body.subject}.json`,"utf8",(err, data) => {
          if (err) {

            console.log(`Error reading file from disk: ${err}`);
            
            fs.access(path, (error) => {
              // To check if the given directory
              // already exists or not
              if (error) {
                // If current directory does not exist
                // then create it
                fs.mkdir(path, (error) => {
                  if (error) {
                    console.log(error);
                  } else {
                    //make file along with folder and save the data from client
                    var writeStream = fs.createWriteStream(`${path}/${req.body.subject}.json`);
                    writeStream.write(`[${JSON.stringify(req.body.que)}]`);
                    writeStream.end();

                    console.log(
                      "New Directory and file created successfully also data is saved !!"
                    );

                    res.json({ok:"saved"});
                    return res.end();
                  }
                });
              } else {
                //folder already exists so we checks the existence of file
                fs.access(`./content/${req.body.trade}/${req.body.subject}.json`,(err) => {
                    if (err) {
                      //if file does not exist then we will create a file and save the data
                      console.log("The file does not exist.");

                      var writeStream = fs.createWriteStream(`${path}/${req.body.subject}.json`);
                      writeStream.write(`[${JSON.stringify(req.body.que)}]`);
                      writeStream.end();

                      console.log("Given Directory already exists !!");

                      res.json({ok:"saved"});
                      return res.end();

                    } else {
                      //if file exists but server is unable to store the data then we gir error message to client
                      console.log("The file exists.");

                      res.json({error:"error occured"})
                      return res.end()

                    }
                  }
                );
              }
            });
          } else {
            try {
              // parse JSON string to JSON object
            // console.log(data);
            
            const databases = JSON.parse(data);

            // add a new record
            databases.push({...req.body.que,id:req.body.id,author:req.body.author});

            // write new data back to the file
            fs.writeFile(`./content/${req.body.trade}/${req.body.subject}.json`,JSON.stringify(databases, null, 4),(err) => {
                if (err) {
                  console.log(`Error writing file: ${err}`);
                }
                res.json({ok:"saved"});
                return res.end();
              }
            );
            } catch (error) {
              res.json({error:"error occured at server"})
              return res.end()
            }
          }
        }
      );
    } catch (error) {
      res.json({error:"error occured"});
      return res.end();
    }
  }

};
