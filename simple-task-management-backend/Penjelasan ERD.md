**Penjelasan**:



* users (menyimpan data user)
* tasks (menyimpan data tugas)



1. users.id adalah Primary Key (PK).
2. tasks.assignee\_id adalah Foreign Key (FK) yang menunjuk ke users.id.
3. Relasi 1-to-many: satu user bisa mengerjakan banyak task, tapi satu task hanya bisa punya satu assignee.
