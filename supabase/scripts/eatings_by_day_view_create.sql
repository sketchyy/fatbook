create view "eatings_by_day"
  with (security_invoker=on)
  as
select
  eatings."userId" as "userId",
  day,
  sum(proteins) as proteins,
  sum(fats) as fats,
  sum(carbs) as carbs,
  sum(calories) as calories
from
  eatings
group by
  day,
  eatings."userId";
