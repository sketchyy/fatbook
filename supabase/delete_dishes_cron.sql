-- Delete dished flagged for deletion
-- and not referenced neither by eatings nor ingredients tables.
select cron.schedule (
    'delete-dishes', -- name of the cron job
    '0 0 1 * *', -- At 00:00 on 1st day of each month
--     '*/5 * * * *', -- every 5th minute (test)
    $$ delete from dishes
        where
        deleted = true and
        not exists (select 1 from eatings where dishes.id = eatings."dishId") and
        not exists (select 1 from ingredients where dishes.id = ingredients."dishId") $$
);

-- Update cron job
select cron.alter_job(
  job_id := (select jobid from cron.job where jobname = 'delete-dishes'),
  schedule := '0 1 1 * *'
);
