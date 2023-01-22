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

* Add several eatings at once - cleanup code, refactor:
  // PortionsForm ??
  shared/components/dish-portions-form/DishPortionsForm
  shared/components/dish-portions-form/DishPortionsFormList
  shared/components/dish-portions-form/DishPortionsFormListItem
  shared/components/dish-portions-form/DishPortionsFormListTitle

* add < and > for quick date navigation

* --- Tests ---
*
*
*
*
*
* --- refactoring ---
* global loading spinner animation
* search improvement: start from 3 characters, debounce, better search index
* user in mobile menu + logout btn align
* rename "createdAt -> updatedAt" for sorting
* style error page
* render user avatar
* add page - report charts
* report for custom days (select FROM / TO, show totals for each day)
* back button to navbar? title to navbar? (dont render title "FatBook" in mobile - waste of space)
* same style for all pages - Title, Back nav
* customize bulma (box-padding: 1rem, )
  https://bulma.io/documentation/customize/variables/
  https://create-react-app.dev/docs/adding-a-sass-stylesheet/
* https://www.algolia.com/pricing/
*
*
*
*
*
