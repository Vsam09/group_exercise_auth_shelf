const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let query = `
    SELECT * FROM "item"
    WHERE "user_id" = $1
  `;
  pool.query(query, [req.user.id])
      .then(result => {
        console.log('GET data', result.rows)
        res.send(result.rows)
      }).catch(error => {
        console.log('GET route error', error)
        res.sendStatus(500)
      })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  let query = `
    INSERT INTO item ( description, image_url, user_id )
    VALUES ( $1, $2, $3 );
  `;
  pool.query(query, [ req.body.description, req.body.image_url, req.user.id])
      .then(result => {
        res.sendStatus(201)
      }).catch(error => {
        console.log('POST route error', error)
        res.sendStatus(500)
      })
});




/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
  let id = req.params.id;
  let query = `
    DELETE FROM item
    WHERE id = $1
  `;

  pool.query(query, [id])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('DELETE route error', error)
      res.sendStatus(500);
    })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
  let id = [req.params.id];
  let query =`
    UPDATE "item"
    SET "description"= $1, "image_url" = $2
    WHERE "id" =$3
  `;
  pool.query(query, [ req.body.description, req.body.image_url, id ])
  .then(result => {
    res.sendStatus(201)
  }).catch(error => {
    console.log('PUT route error', error)
    res.sendStatus(500)
  })
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
