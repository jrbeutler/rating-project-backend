# Migration `20210406201748-user-roles`

This migration has been generated by Eli Sokeland at 4/6/2021, 4:17:48 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
Begin;
CREATE TYPE "rating-project"."Role_new" AS ENUM ('ADMIN', 'APPRENTICE', 'FTE');
ALTER TABLE "rating-project"."User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
Commit
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210406195821-active-status..20210406201748-user-roles
--- datamodel.dml
+++ datamodel.dml
@@ -7,9 +7,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
   id                             String   @id @default(cuid())
@@ -46,6 +46,7 @@
 }
 enum Role {
   ADMIN
-  USER
+  APPRENTICE
+  FTE
 }
```


