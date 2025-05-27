 let entriesArray = JSON.parse(localStorage.getItem('journalEntries')) || [];
let editIndex = null;

 function saveEntries() {
      localStorage.setItem('journalEntries', JSON.stringify(entriesArray));
    }




function renderEntries() {
 
 const contents = document . getElementById('entries');
 contents . innerHTML =  ' ';

 entriesArray . forEach( (entry, index ) => {

  const div = document . createElement ('div')

div.className = 'entry';
        div.innerHTML = `

         <h2>${entry.title}</h2>
          <div class="date">${entry.date}</div>
          <p>${entry.content}</p>

           <button onclick="editEntry(${index})" style="background:#4f46e5;color:black;padding:5px 10px;border:none;border-radius:5px;margin-right:10px;">Edit</button>

          <button onclick="deleteEntry(${index})" style="background:#333333;color:white;padding:5px 10px;border:none;border-radius:5px;margin-top:10px;">Delete</button>
        `;
         
    
 

         contents .prepend(div);

})

}


 function submitEntry() {
  const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();


       if (!title || !content) return;
  
   const entry = {
        title,
        content,
        date: new Date() .toLocaleString()
      };


if (editIndex !== null) {
      entriesArray[editIndex] = { ...entry };
      editIndex = null;
      document.querySelector('.entry-form button').textContent = 'Add Entry';
    } else {
        entriesArray.unshift(entry);
    }



          saveEntries()
         renderEntries();

        titleInput.value = '';
    contentInput.value = '';
     }

   
function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    entriesArray.splice(index, 1);
    saveEntries();
    renderEntries();
  }
}

function editEntry(index) {
    const entry = entriesArray[index];
    document.getElementById('title').value = entry.title;
    document.getElementById('content').value = entry.content;
    editIndex = index;
    document.querySelector('.entry-form button').textContent = 'Update Entry';
  }

  renderEntries();
