console.log("Welcome to Notes app this is app.js");


let addBtn = document.getElementById("addBtn");


// let notesObj=[];

addBtn.addEventListener("click",(e)=>{
    // let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let addTxtarea = document.getElementById("addTxtarea");
    let notes = localStorage.getItem("notes");

    if(notes==null)
    {
        notesObj=[];
       
    }
    else{
       
        notesObj= JSON.parse(notes);
        
    }

    let myObj = {
        title:addTitle.value,
        text:addTxtarea.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxtarea.value= "";
    addTitle.value= "";
    console.log(notesObj);
    showNotes();
    
})

let showNotes = ()=>{
    let notes = localStorage.getItem("notes");

    if(notes==null)
    {
        notesObj=[];
    }
    else{
       
        notesObj= JSON.parse(notes);
        
    }
    let html ="";
    notesObj.forEach(function(element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text"> ${element.text}</p>
                            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        </div>
                    </div>`;
      });

      let notesElm =document.getElementById("notes");

      if(notesObj.length!=0)
      {
        notesElm.innerHTML= html;
      }else{
        notesElm.innerHTML=`Nothing to show here "Add a note" section above to add notes `;
      }
}

showNotes();

function deleteNote(index)
{
    // console.log("I am deleteing ", index);

    let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  showNotes();
}

// searching functionality
let search = document.getElementById("searchTxt");

search.addEventListener("input",()=>{

    inputVal= search.value;
    // console.log(inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    console.log(noteCards);
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})


