DROP TABLE IF EXISTS "todos";T

CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"text" TEXT,
	"isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todos"
  ("text", "isComplete")
  VALUES 
  ('Build a CRUD app', 'N'),
  ('Make my app look nice', 'N');
