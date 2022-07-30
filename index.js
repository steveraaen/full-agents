require('dotenv').config()
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
const mysql = require('mysql')
// const cors = reequire('cors')
const connection = require('./scrapers/dbConnect.js');
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'client/dist/index.html')));

app.get('/api/playeragents', function(req, res) {
  connection.query(`select playerName, agent from meta`, [parseFloat(req.query.num[0]), parseFloat(req.query.num[1])], function (error, results, fields) {              
    res.json(results)
    if (error) throw error;
   });
 });

app.get('/api/pitchsum', function(req, res) {
  connection.query(`SELECT meta.agent, COUNT(latestPitching.playerId) AS pitchers, FORMAT(AVG(meta.k_ann_val),0) as ann_val, FORMAT(AVG(k_yrs),1) as yrs, SUM(latestPitching.IP) AS ip, FORMAT(AVG(latestPitching.IP / latestPitching.R),3) AS era, SUM(latestPitching.W) AS w, SUM(latestPitching.SV) as sv
                    FROM latestPitching
                    INNER JOIN meta
                    ON latestPitching.playerId = meta.playerId
                    WHERE latestPitching.playerId = meta.playerId
                    AND meta.agent <> "Not Available"
                    GROUP BY meta.agent
                    having COUNT(meta.playerId) > ?  AND COUNT(meta.playerId) < ?
                    ORDER BY COUNT(meta.playerId) DESC`, [parseFloat(req.query.num[0]), parseFloat(req.query.num[1])], function (error, results, fields) {              
    res.json(results)
    if (error) throw error;
   });
 });
app.get('/api/batsum', function(req, res) {
  // console.log(req.query)
  connection.query(`select meta.agent, COUNT(meta.playerId) as batters, FORMAT(AVG(meta.k_ann_val),0) as ann_val, FORMAT(AVG(k_yrs),1) as yrs,
                    FORMAT(AVG(latestBatting.BA),3) AS avg,
                    SUM(latestBatting.AB) as ab,
                    SUM(latestBatting.TB) as tb,
                    FORMAT(AVG(latestBatting.OPS),3) AS ops
                    from meta 
                    INNER JOIN latestBatting
                    ON meta.playerId = latestBatting.playerId
                    WHERE meta.agent <> "Not Available"                    
                    GROUP BY meta.agent 
                    having COUNT(meta.playerId) > ? AND COUNT(meta.playerId) < ?
                    ORDER BY COUNT(meta.playerId) DESC`, [parseFloat(req.query.num[0]), parseFloat(req.query.num[1])], function (error, results, fields) {
    res.json(results)
    if (error) throw error;
   });
 });
app.get('/api/batdetail', function(req, res) {
  console.log(req.query)
  connection.query(`select meta.playerName,meta.k_ann_val, meta.k_yrs,latestBatting.tm, latestBatting.AB, latestBatting.BA, latestBatting.TB, latestBatting.OPS 
                    from meta 
                    INNER JOIN latestBatting
                    ON meta.playerId = latestBatting.playerId
                    where agent = ?
                    order by latestBatting.OPS DESC`, [req.query.batAgnt], function (error, results, fields) {
    res.json(results)
    console.log(results)
    if (error) throw error;
   });
 });
app.get('/api/pitchdetail', function(req, res) {
  connection.query(`select meta.playerName,meta.k_ann_val, meta.k_yrs, latestPitching.tm, latestPitching.IP, FORMAT((latestPitching.IP / latestPitching.R),3) as era, latestPitching.W, latestPitching.SV
                    from meta 
                    INNER JOIN latestPitching
                    ON meta.playerId = latestPitching.playerId
                    where agent = ?
                    order by (latestPitching.IP / latestPitching.R) DESC`, [req.query.pitchAgnt], function (error, results, fields) {
    res.json(results)
    if (error) throw error;
   });
 });
app.get('/api/allmeta', function(req, res) {
  connection.query(`select * from meta`, function (error, results, fields) {
    res.json(results)
    if (error) throw error;
   });
 });

app.get('/api/allSummary', function(req, res) {
  connection.query(`drop view if exists temp_pitch;
      create view temp_pitch as
      SELECT meta.agent, COUNT(latestPitching.playerId) AS pitchers, FORMAT(AVG(meta.k_ann_val),0) as p_ann_val, FORMAT(AVG(meta.k_yrs),1) as p_yrs
      from meta
      left join latestPitching on latestPitching.playerId = meta.playerId 
      where latestPitching.playerId = meta.playerId
      group by meta.agent;
      drop view if exists temp_bat;
      create view temp_bat as
      select meta.agent, COUNT(latestBatting.playerId) AS batters, FORMAT(AVG(meta.k_ann_val),0) as b_ann_val, FORMAT(AVG(meta.k_yrs),1) as b_yrs
      from meta left join latestBatting on latestBatting.playerId = meta.playerId
      where latestBatting.playerId = meta.playerId
      group by meta.agent;

      select *, pitchers + batters as allPlayers from temp_pitch
      inner join temp_bat
      on temp_pitch.agent = temp_bat.agent
      having allPlayers > ? and allPlayers < ?`, [parseFloat(req.query.num[0]), parseFloat(req.query.num[1])], function (error, results, fields) {
    res.json(results)
    if (error) throw error;
   });
 });
const port = process.env.PORT || 5001;
app.listen(port);
console.log(`Listening on ${port}`);






