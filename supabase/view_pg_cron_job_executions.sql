-- https://supabase.com/docs/guides/database/extensions/pg_cron#viewing-previously-ran-jobs
select
  *
from cron.job_run_details
order by start_time desc
limit 10;
