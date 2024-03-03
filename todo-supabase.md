1) Fix key of dishIngredient (FK parentDish, dish)
   
3) Add ability to add ingredients on new form

4) Rethink how to simplify 
   - Colocate css/html/utils

5) architecture
   - dishesService - all the logic, used by UI
   - dishesStorage - DB, used by dishesService
   - plain models (not objects), object methods done as dishesService



Data:

1) dishes
   - id
   - name
   - ...nutritionFacts

2) ingredients
   - id
   - ingredientDish: dishes //ingredient?
   - parentDish: dishes // dish?
   
3) eatings
    - userId // index
    - day // index
    - meal: Breakf, Lunch, ... // index
    - dishId
    - portion
    - ...nutritionFacts
    - createdAt

4) logDays
   - userId
   - ...nutritionFacts
   - 
