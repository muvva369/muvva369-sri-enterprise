
##This is the Node JS backend Project where the user stories are
Business Knowledge:
A vendor will have several pieces of apparel in his stock. Every apparel will have a unique code.
Each piece of Apparel can come in multiple sizes. So the vendor will update the quality of stock
he holds and the price he is willing to sell for a given apparel code and size. Customer orders will
have several apparel codes and sizes.
● As a vendor, I can update the stock quality and price of one apparel code and size.
● As a vendor, I can simultaneously update the stock quality and price of several apparel
codes and sizes.
● As a user, I should be able to check If I can fulfill the requirement of a customer order.
● As a user, I should be able to know the lowest cost at which I can get the order fulfilled.
Technical Design:
● Store all the data in a local JSON file.
● You should not lose data if the server restarts.
● Use typescript.



## Instructions for how to setup the code.

npm install -g typescript //typescript
npm install -g ts-node  //to run typescript files without generating .js files
npm install -g nodemon  //to keep the server up and running

● Download the code to the desired folder
● Navigate to the folder in cmd
● Run npm install to install node modules
● Run npm start to run the project
● Run npm test to run the test cases

