FROM mongo

COPY users.json /users.json
COPY categories.json /categories.json
COPY articles.json /articles.json
CMD mongoimport --host mongodb --port 27017 --db news --collection users --type json --file /users.json --jsonArray; mongoimport --host mongodb --port 27017 --db news --collection articles --type json --file /articles.json --jsonArray; mongoimport --host mongodb --port 27017 --db news --collection categories --type json --file /categories.json --jsonArray
