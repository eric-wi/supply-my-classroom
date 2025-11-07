# Database Migrations Documentation

This directory contains the migration files for managing the database schema related to teacher registrations. 

## Migration Files

Migration files are used to apply changes to the database schema over time. Each migration file should contain a specific change, such as creating a new table, adding a column, or modifying existing data structures.

## Naming Convention

Migration files should be named in the following format:

```
YYYYMMDDHHMMSS_description.js
```

Where:
- `YYYYMMDDHHMMSS` is the timestamp of when the migration was created.
- `description` is a brief description of the migration's purpose.

## Running Migrations

To run the migrations, use the following command:

```
npm run migrate
```

Ensure that your database connection is properly configured in the environment variables before running migrations.

## Rollback Migrations

If you need to revert a migration, you can use the following command:

```
npm run rollback
```

This will undo the last migration that was applied.

## Best Practices

- Always back up your database before running migrations.
- Test migrations in a development environment before applying them to production.
- Keep migration files organized and well-documented for future reference.