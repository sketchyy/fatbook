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

* move "today" to top
* smaller font for calories and titles
* render calories always

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

* add page - report charts (last 7 days)
* report for custom days (select FROM / TO, show totals for each day)
* fix accoerdion animation
* поиск? https://www.algolia.com/pricing/
* global loading spinner animation
* rename "createdAt -> updatedAt" for sorting
* style error page
* back button to navbar? title to navbar? (dont render title "FatBook" in mobile - waste of space)
* same style for all pages - Title, Back nav
* customize bulma (box-padding: 1rem, )
  https://bulma.io/documentation/customize/variables/
  https://create-react-app.dev/docs/adding-a-sass-stylesheet/
*
*
*
*
*
