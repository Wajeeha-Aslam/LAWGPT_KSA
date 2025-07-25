const express = require('express');
const app = express();
const path = require('path');
// const judgegptRoutes = require('./routes/judgegpt');



// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home', { username: 'GHAZI' });
});



// Routes
app.get('/legal-chat', (req, res) => {
  res.render('legal-chat', {
    topic: '',
    question: '',
    reference: '',
    sharia: '',
    output: ''
  });
});






app.post('/legal-chat', (req, res) => {
  const { topic, question } = req.body;


  
  const reference = 'Article 77, Saudi Labor Law';
  const sharia = topic.includes('Shariah') ? 'Hanbali opinion on employee protection' : 'N/A';
  const output = `Under ${reference}, termination is permitted with compensation...`;

  res.render('legal-chat', {
    topic,
    question,
    reference,
    sharia,
    output
  });
});





app.get('/legal-tools', (req, res) => {
  res.render('legal-tools', {
    fatwa: {},
    caseSearch: {},
    decree: {}
  });
});













// 🔹 Fatwa Inquiry
app.post('/legal-tools/fatwa', (req, res) => {
  const { question, topic, madhhab, date, authority } = req.body;
  res.render('legal-tools', {
    fatwa: { question, topic, madhhab, date, authority },
    caseSearch: {},
    decree: {}
  });
});


// 🔹 Case Search
app.post('/legal-tools/case-search', (req, res) => {
  const { caseNumber, type, year, courtLevel, outcome } = req.body;
  console.log("Case Search:", req.body);
  res.send(`Case Search:<br>Case #: ${caseNumber}<br>Type: ${type}<br>Year: ${year}<br>Court Level: ${courtLevel}<br>Outcome: ${outcome}`);
});

// 🔹 Royal Decree Search
app.post('/legal-tools/royal-decree', (req, res) => {
  const { decreeNumber, decreeDate, ministry, lawArea, summary } = req.body;
  console.log("Royal Decree:", req.body);
  res.send(`Royal Decree:<br>Decree #: ${decreeNumber}<br>Date: ${decreeDate}<br>Ministry: ${ministry}<br>Law Area: ${lawArea}<br>Summary: ${summary}`);
});




app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
