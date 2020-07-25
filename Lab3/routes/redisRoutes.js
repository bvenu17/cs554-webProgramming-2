const express = require('express');
const router = express.Router();
const data = require('../data/getData');
const redis = require('redis');
const client = redis.createClient();
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/history', async (req, res) => {
  try {
    const allHistory = await client.lrangeAsync('ret', 0, 19);
    if (allHistory.length >0) {
      for (let i = 0; i < allHistory.length; i++) {
        allHistory[i] = JSON.parse(allHistory[i]);
      }
      res.json(allHistory);
    } else {
      res.status(404).json({error:'No id has been inserted to cache'});
    }
  } catch (e) {
    res.status(404).json({ error: 'not found' });

  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cacheData = await client.hgetallAsync(id);
    if (!cacheData) {
      const peopleData = await data.getById(id);
      await client.hmsetAsync(id, peopleData);


      const findNewCacheVal = await client.hgetallAsync(id);
      findNewCacheVal.id = parseInt(findNewCacheVal.id);

      await client.lpush('ret', JSON.stringify(findNewCacheVal));

      res.json(findNewCacheVal);

    }
    else {
      cacheData.id = parseInt(cacheData.id);
      await client.lpush('ret', JSON.stringify(cacheData));
      res.json(cacheData);
    }
  } catch (e) {
    res.status(404).json({ error: 'id not found' });
  }
});

module.exports = router;