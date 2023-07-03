const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
  ];
  
  // Function to display students in the table
  function displayStudents(filteredStudents = students) {
    const table = document.getElementById('studentTable');
    table.innerHTML = ''; // Clear previous table content
  
    // Create table header
    const headerRow = document.createElement('tr');
    for (const prop in students[0]) {
      const th = document.createElement('th');
      th.textContent = prop;
      headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
  
    // Create table rows for each student
    filteredStudents.forEach((student) => {
        const row = document.createElement('tr');
        for (const prop in student) {
          const td = document.createElement('td');
          td.textContent = student[prop];
          row.appendChild(td);
        }
    
        // Create Edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
          fillForm(student);
          document.getElementById('addButton').textContent = 'Edit Student';
          document.getElementById('addButton').setAttribute('onclick', `updateStudent(${student.ID})`);
        });
        const editCell = document.createElement('td');
        editCell.appendChild(editButton);
        row.appendChild(editCell);
    
        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
          deleteStudent(student.ID);
        });
        const deleteCell = document.createElement('td');
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
    
        table.appendChild(row);
      });
    }
  // Function to add a new student
  function addStudent() {
    const name = document.getElementById('nameInput').value;
    const age = document.getElementById('ageInput').value;
    const grade = document.getElementById('gradeInput').value;
    const degree = document.getElementById('degreeInput').value;
    const email = document.getElementById('emailInput').value;
  
    const newStudent = {
      ID: students.length + 1,
      name,
      age,
      grade,
      degree,
      email
    };
  
    students.push(newStudent);
    displayStudents();
  
    // Clear form inputs
    document.getElementById('nameInput').value = '';
    document.getElementById('ageInput').value = '';
    document.getElementById('gradeInput').value = '';
    document.getElementById('degreeInput').value = '';
    document.getElementById('emailInput').value = '';
  }
  
  // Function to fill the form with student data for editing
  function fillForm(student) {
    document.getElementById('nameInput').value = student.name;
    document.getElementById('ageInput').value = student.age;
    document.getElementById('gradeInput').value = student.grade;
    document.getElementById('degreeInput').value = student.degree;
    document.getElementById('emailInput').value = student.email;
  }
  
  // Function to update a student's data
  function updateStudent(studentID) {
    const updatedStudent = {
      ID: studentID,
      name: document.getElementById('nameInput').value,
      age: document.getElementById('ageInput').value,
      grade: document.getElementById('gradeInput').value,
      degree: document.getElementById('degreeInput').value,
      email: document.getElementById('emailInput').value
    };
  
    const index = students.findIndex(student => student.ID === studentID);
    students[index] = updatedStudent;
    displayStudents();
  
    // Clear form inputs
    document.getElementById('nameInput').value = '';
    document.getElementById('ageInput').value = '';
    document.getElementById('gradeInput').value = '';
    document.getElementById('degreeInput').value = '';
    document.getElementById('emailInput').value = '';
  
    // Reset form button to add mode
    document.getElementById('addButton').textContent = 'Add Student';
    document.getElementById('addButton').setAttribute('onclick', 'addStudent()');
  }
  
  // Function to delete a student
  function deleteStudent(studentID) {
    const index = students.findIndex(student => student.ID === studentID);
    students.splice(index, 1);
    displayStudents();
  }
  
  // Function to search for students by name, email, or degree
  function searchStudents() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchInput) ||
      student.email.toLowerCase().includes(searchInput) ||
      student.degree.toLowerCase().includes(searchInput)
    );
  
    displayStudents(filteredStudents);
  }
  
  // Initial display of students
  displayStudents();
  