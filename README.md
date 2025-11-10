#### To Do:

### Admin Page: 

## Admin dashboard:
- [ ] Move Create form here
- [ ] Add navigation to Edit forms 
- [ ] Delete functionality 
- [ ] Filter admin 

## Create Form
- [x] Re-work cuisine and type, move away from enum to join tables 
  - [x] backend functionality to fetch the main_ingredients and cuisines 
- [x] Replace dropdowns with buttons for multple choice 
- [x] Re-work inserts into db 
- [x] look into as unkown on insert db query
- [x] Persist filters in Redux
- [x] Preview section output validation
- [x] Simplify ingredients and instruction input - copy paste friendly
- [x] Form validation, ensure non-empty fields are not left empty for required inputs

## Edit Form 
- [ ] Edit, remove & Add for metadata
- [ ] Edit, Remove & Add features for ingredients 
- [ ] Edit, Remove & Add features for instructions 
- [ ] Delete entire recipe 

## Profile page
- [ ] Update email adress
- [ ] Change password
- [ ] Modify list of favorite recipes
 
## Filters
- [ ] Edit existing filter text
- [ ] Add new filters
- [ ] Remove filters
 - [ ] Cascade into join table

## Search function
- [ ] search function should include matches on recipe titles, descriptions, and from the ingredient lists

## Auth: 
- [x] Move auth from AdminLayout to backend

### Main Page: 
- [x] List all recipes 
- [x] Add the filters as dropdowns 
- [x] Details view 
  - [ ] Add recipe to favorites
  - [ ] Link to edit recipe for admins 


### Weekly lists: 
- [ ] Generate lists based on full randomisation 
 - [ ] Pick number of days  
 - [ ] Change number of people
 - [ ] Add filter options here too 
 
### Grocery list: 
- [ ] Re-use previous list project, add here 
 - [ ] Localstorage persist grocery list
 - [ ] Add new items to list 
 - [ ] share lists - how?

 ### MISC:
 - [ ] Language options
  - [ ] Translate web elements between ENG/SWE
  - [ ] Translate recipes between ENG/SWE
  - [ ] Clean up horizontal menu classnames in NavMenu - follow Filters.tsx