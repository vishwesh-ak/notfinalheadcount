// controllers/employeeController.js
const nano = require('nano')(process.env.DATABASE_URL);
const db = nano.use(process.env.DATABASE_NAME);

const addEmployee = (req, res) => {
  const employeeData = req.body;

  db.insert(employeeData, (err, body) => {
    if (err) {
      console.error('Error inserting document:', err);
      res.status(500).json({ message: 'Error inserting document' });
    } else {
      console.log('Document inserted:', body);
      res.status(200).json({ message: 'Document inserted successfully' });
    }
  });
};

const updateEmployees = (req, res) => {
  const { employees } = req.body;
  const updatePromises = employees.map((emp) => {
    return new Promise((resolve, reject) => {
      db.insert(emp, emp._id, (err, body) => {
        if (err) {
          console.error(`Error updating documenttttttt ${emp._id}:`, err);
          reject(err);
        } else {
          console.log(`Document ${emp._id} updated:`, body);
          resolve(body);
        }
      });
    });
  });

  Promise.all(updatePromises)
    .then(() => {
      res.status(200).json({ message: 'Employees updated successfully' });
    })
    .catch((error) => {
      console.error('Error updating employees:', error);
      res.status(500).json({ message: 'Error updating employeeeeeeeeeeees' });
    });
};

const getEmployees = (req, res) => {
  db.list({ include_docs: true }, (err, body) => {
    if (err) {
      console.error('Error fetching documents:', err);
      res.status(500).json({ message: 'Error fetching documents' });
    } else {
      const employees = body.rows.map((row) => row.doc);
      for(var i=0;i<employees.length;i++){
        if(employees[i].views && employees[i].language)
        {
            employees.pop(i)
            break;
        }
    }
      res.status(200).json(employees);
    }
  });
};

module.exports = {
  addEmployee,
  updateEmployees,
  getEmployees,
};
