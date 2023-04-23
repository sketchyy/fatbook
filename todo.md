--- Only Render (no logic) ---

- add router and navigation between pages
- add dishes page > dishes list > dishes filter > dish > food-value
- add DishForm > click on dish name (with id) > New btn. Load stub dish
- add Simple Ingridients page
- add Eatings page
- add EatingForm (New/Edit)
- add "actions" menu ((x) Delete)
- navbar menu navigation
- Delete -> Are you sure? - dialog

* --- Client-side logic ---
*
*
*

* --- server-side logic ---

- Auth + login page, protect every route, redirect back to old page
- Load list of dishes
- Implement dish delete
- Open dish form with existing dish
- Implement dish search
- Implement add dish
- Implement dish ingredients
- Implement models: Dish, DishPortion
- Implement food value recalculation when ingredient added
- implement add eating with `meal: 'breakfast'`...
- implement load of eatings (only for today)
- implement delete eating
- implement load of eatings for another day
- fix round issue (1 decimal)

- Add several eatings at once
- Add several eatings at once - serving size input
- Add several eatings at once - submitting changes
- Add several eatings at once - back button
- accordion animation + styles
- accordion customize header elementin header add icon + checkmark
- accordion in header only name, in content also food value (recalculate?)
- Edit input weight for dish ingr and eatings
- Add several eatings at once - cleanup code, refactor
- add < and > for quick date navigation
- accordion for meal card
- move "today" to top
- render calories always

* --- Tests ---
*
*
*
*
*
* --- refactoring ---

- search improvement: start from 3 characters, debounce, better search index
- user in mobile menu + logout btn align
- render user avatar
- add page - report charts (last 7 days)
- report for custom date range
- React Date picker for main page
- Delete "Save" button, save each meal/ingredient on "Add"
- Render foodvalue per 100g.
- focus input on accordion open
- same style for all pages - Title, Back nav
- style error page
- fix dish addition (set name, go to ingredients, name erased)
- fix accordion animation
- replace CRA with VITE + typescript,
- add eslint
- Merge to master, create tag for angular (legacy-angular)
- create tag for (legacy-react-cra-js)
- bug - change days, close accordion
- add ability to edit dish serving grams in input
- clear search button -> focus input
- login page improve
- date (today, yesterday, ...) fix
- modify portion size -> enter click
- settings page (daily kcal, proteins, fats threshold)
  -- Save - router action + loading animation + toast
  -- History page - get dailyGoals, render on charts, render in summary
- move all files to typescript
- vite TS paths

* Read react docs -> Plan to massive refactor (visualize components tree on paper for each page, think on how to simplify)
* Rethink folder structure
* move loaders/actions to page component
* Consistent names:
  ---DishPage
  ---EditDishPage
  ---DeleteDishPage??
  ---DishIngredientsPage
  ---AddIngredientPage
* folder for components
  ---history/HistoryPage
  ---history/components/FoodValueDiff.tsx, ...
* eatings LogDayPage <-> LogDaySummary. Page only loads data...

* One component per file (exclusion - really small components < 3 lines)
* replace "renderSomething" functions with components
* model files hyphen case, pascal case only for TSX

* Add dish with portions count (calories per portion)

* add favorite dishes

* поиск? https://www.algolia.com/pricing/ or better indexes

* add react dialog to confirm
* add react notifications
* Move all fetch stuff to react router calls/think of only one method with spinnner support
* global loading spinner animation
* settings save loading animation

* customize bulma (box-padding: 1rem, font-size smaller)
  https://bulma.io/documentation/customize/variables/
  https://create-react-app.dev/docs/adding-a-sass-stylesheet/

* Refactor: "createdAt -> updatedAt" for sorting
* Refactor: FoodValue -> NutritionFacts (rename in Dishes only, in days support 2 names)

* https://pocketbase.io/docs/ + https://fly.io/
