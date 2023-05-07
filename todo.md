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
- поиск? https://www.algolia.com/pricing/ or better indexes
  Algolia требует тарифный план Blaze, на бесплатном не работает
  \*\*\* Your project must be on the Blaze plan to use this extension - не подходит
- model files hyphen case, pascal case only for TSX
- global loading spinner animation (decided to keep same animation with opacity, added search spinner though)

* settings save loading animation
* add react notifications
* add react dialog to confirm
* Add dish with portions count (calories per portion)
* add favorite dishes

* move loaders/actions to page component
* One component per file (exclusion - really small components < 3 lines)
* Move all fetch stuff to react router calls/think of only one method with spinnner support

* Read react docs -> Plan to massive refactor (visualize components tree on paper for each page, think on how to simplify)
* Rethink folder structure
* Consistent names:
  ---DishPage
  ---EditDishPage
  ---DeleteDishPage??
  ---DishIngredientsPage
  ---AddIngredientPage
* replace "renderSomething" functions with components
* folder for components
  ---history/HistoryPage
  ---history/components/FoodValueDiff.tsx, ...
* eatings LogDayPage <-> LogDaySummary. Page only loads data...

* customize bulma (box-padding: 1rem, font-size smaller)
  https://bulma.io/documentation/customize/variables/
  https://create-react-app.dev/docs/adding-a-sass-stylesheet/

* revise firestore model and usage

* Refactor: "createdAt -> updatedAt" for sorting
* Refactor: FoodValue -> NutritionFacts (rename in Dishes only, in days support 2 names)
* Улучшить поиск
  https://medium.com/@ken11zer01/firebase-firestore-text-search-and-pagination-91a0df8131ef
  https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search

* Переход с Firebase на pocketbase (или аналог)
  - Гибкий поиск (в Firebase текущим методом максимум 10 опций можно искать)
  - Нету квот
  * придется платить за хостинг
  * придется париться бекапом
    https://pocketbase.io/docs/ + https://fly.io/
