-- Add version column
-- This feature will allow the versioning and updating of previous versioned movies
-- To add extra columns to the table, you will need to update the movie records
-- To update the records, either you update them all in a migration, causing

alter table movies ADD version integer NOT NULL DEFAULT 1;