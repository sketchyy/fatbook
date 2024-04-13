-- Delete eatings older than 1 year
select cron.schedule (
    'delete-eatings', -- name of the cron job
    '0 1 1 * *', -- At 01:00 on 1st day of each month
--     '*/5 * * * *', -- every 5th minute (test)
    $$ delete from eatings where day < current_date - interval '1' year $$
);

-- Update cron job
select cron.alter_job(
  job_id := (select jobid from cron.job where jobname = 'delete-eatings'),
  schedule := '0 1 1 * *'
);
