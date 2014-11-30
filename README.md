boucaine-api
============

Api for Pizza La Boucaine. Available at https://boucaine-api.herokuapp.com.


Developing
----------

1. `npm install .` and make sure you have an up to date version of node.
2. Install mongodb (use homebrew on a Mac).
3. Start mongodb server.
4. `node index.js` will start the api server.

Playing
-------

You can execute different queries on the API:

1. POST on /codes will create a code.
2. PUT or POST on /codes/*hash* will verify a given code with given *hash*.
