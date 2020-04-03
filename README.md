# Harvest Report CLI  
CLI tool that allows you to retrieve time entries for a specific project.  

## How to install
Install the tool by running `npm i -g harre`  
After the installation, run ``harre --init`` to add your Harvest API credentials.  

## How to use  
Find entries for certain project by running ``harre <Project id>``.  The output will be in CSV format.  
You may add `<From date>` and `<To date>`, thus filtering the output between two dates. Otherwise the output will be entries from one week ago to current date.  

Flags:
   * -g: Returns all projects
   * -f <Project name>: Finds a project where the name contains search word
   * --init: Enter users credentials
   * --help: Prints out help
   * -j: Return output as Json   
   
## Examples  
Finds entries for the project for the project id 123456, between 1.3.2020 and the current day.  
`harre <Project id> <From date>`  
`harre 123456 20200301`  
Returns output as CSV.  

Find project where the name contains search word.  
`harre -f <Project id> -j`  
`harre -f name -j`  
Returns Json object that contains project information.

