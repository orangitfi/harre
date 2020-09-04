# Harvest Report CLI  
CLI tool that allows you to retrieve time entries for a specific project.  

## How to get access token  
Generate a new personal access token from ``https://id.getharvest.com/developers``  


## How to install
Install the tool by running `npm i -g harre`.  
After the installation, run ``harre --init`` to add your Harvest API credentials.  As user agent, you can put ``harre`  

## How to use.  
Find entries for certain project by running ``harre <Project id>`` or ``harre <Project name>``.  The output will be in a CSV format.  
You may add `<From date>` and `<To date>`, thus filtering the output between two dates. Otherwise the output will be entries from one week ago to the current date.    

You can also use months to search all entries for that given month:  
 `harre <Project name> 12`  
 This will return decembers entries for the project.

Flags:
   * -g: Returns all projects
   * -f <Project name>: Finds a project where the name contains given search word
   * -h <Project name>: Returns the sum of recorded hours for the given project.
   * -j: Return output as Json   
   * -l: Returns last weeks entries 
   * --min: Returns minimal CSV with the following columns: Date, Notes, Hours and Employee number  
   * --init: Enter users credentials
   * --help: Prints out help
   
## Examples.  
Find the projects information with only the name:
`harre -f <Project name>`
If there are multiple, you need to select one of them.

Finds entries for the project with the id 123456, between 1.3.2020 and the current date:  
`harre <Project id> <From date>`  
`harre 123456 20200301`  
Returns found entries in a CSV format.  

Get all entries for a project between current day and seven days ago:  
`harre <Project name>`  
e.g. 07.02.2020 - 15.02.2020

Get all last weeks entries for certain project:
`harre <Project id> -l`
Return last weeks entries in a CSV format.

Find project where the name contains given search word.  
`harre -f <Project id> -j`  
`harre -f name -j`  
Returns a Json object that contains project information.  

## Contribution. 
Create a merge request for any modifications to the source code.  
To publish the new version to NPM registery, you have to be in the owner group. Please contanct `Uberballo` to be added to the group.  
To publish, make sure you have the newest working version, then run `npm publish`.  

### Tests
some of the test require working API key, if you don't have the required credentials, try to avoid developing them.  
Run them by using `npm test`  