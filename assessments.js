

lastcategory = "";
categoryindex = 0;
categorylabels = [];


function getstarted(item){
    parentdiv = item.parentElement;
    parentdiv.style.display = 'none';
    parentdiv.nextElementSibling.style.display = 'block';

}

function showPrevious(){
    parentdiv = this.parentElement;
    parentdiv.style.display = 'none';
    parentdiv.previousSibling.style.display = 'block'; 
}

function switchdivs(){
    passed = validate(this);
    if(passed){
        parentdiv = this.parentElement;
        parentdiv.style.display = 'none';
        parentdiv.nextSibling.style.display = 'block';
    }
}

function validate(item){
    //this will tell us if they've answered everything
    passed = true;
    parentdiv = item.parentElement;
    inputs = parentdiv.getElementsByTagName('input')
    
    //Make sure we're only checking radio buttons
    inputArray = [];
    for(var i=0; i < inputs.length; i++){
        if(inputs[i].type == 'radio'){
            inputArray.push(inputs[i]);
        }
    }
    
    
    inputs = inputArray;
    
    groupname = "";
    for(var i=0;i<inputs.length;i++){
        //for each one, we need the parent
        //If we're on the first one, we use a mod
        if( i % 5 == 0){
            groupname = inputs[i].name;
            if(groupIsChecked(groupname)==false){
                passed = false;
                //This means it's not valid
                inputs[i].parentElement.parentElement.className = "danger";
            }else{
                inputs[i].parentElement.parentElement.className = "";
            }
        }   
    }
    return passed;
}

function groupIsChecked(elementName){
    grouptocheck = document.getElementsByName(elementName);
    for(x=0;x<grouptocheck.length;x++){
        if(grouptocheck[x].checked == true) return true;
    }
    return false;

}

function checkChildOption(){
    //Eventually, this should let you click a cell and have the option get selected
    this.childNodes[0].checked = true;
    return false;
}

function finalbutton(){
    if(validate(this)){
        sumvalues();
    }
    
}

function returnFalse(){
    return false;
}

function submitAndGotoNext(){
    passed = validate(this);
    if(passed){
        //Submit it
        myForm = document.getElementById("assessment-form");
        ajaxPost(myForm, returnFalse);
        
        //Now go to the next page
        parentdiv = this.parentElement;
        parentdiv.style.display = 'none';
        parentdiv.nextSibling.style.display = 'block';
    }
}

function sumvalues(){
    //First let's submit all the data
    myForm = document.getElementById("assessment-form");
    
    ajaxPost(myForm, returnFalse);
    
    total=0;
    categorytotals = [];
    choices = document.getElementsByClassName('radio');
    for(i=0;i<choices.length;i++){
        if(choices[i].checked){
            total+= parseInt(choices[i].value);
            //choicecategory = arrayContainsLabel(categorylabels, choices[i].dataset.category);
            for(a=0;a<categorylabels.length;a++){
                if(categorylabels[a].label == choices[i].dataset.category){
                    categorylabels[a].total += parseInt(choices[i].value);
                }
            }
            //categorylabels[choicecategory].total = categorylabels[choicecategory].total + parseInt(choices[i].value);
 
        }
    }

    scorediv = document.createElement('div');
    //scorediv.innerHTML = "Total: " + total;
    document.getElementById('sumarea').appendChild(scorediv);

    //Hide all the quiz stuff
    document.getElementById("quizarea").style.display = "none";
    
    categorylist = document.createElement('table');
    categorylist.className = 'table table-bordered table-striped text-center';
    scorediv.appendChild(categorylist);


    for(i=0;i<categorylabels.length;i++){
        totalitem = categorylist.insertRow(-1);
        imgcell = totalitem.insertCell(-1);
        imgcell.innerHTML = "<img src='img/"+categorylabels[i].label+".png' width='200px' class='img-thumbnail'><br><h4>"+categorylabels[i].label;+"</h4>";
        imgcell.style.width = '200px';
        totalitem.insertCell(-1).innerHTML = '<h1>'+categorylabels[i].total + '/' + categorylabels[i].totalpossible +'</h1>';
        //We should have a description in there too
        for(d=0;d<categorydescriptions.length;d++){
            if(categorydescriptions[d].label==categorylabels[i].label){
                descriptioncell = totalitem.insertCell(-1);
                descriptioncell.innerHTML = "<p>" + categorydescriptions[d].description + "</p>";
            }
        }
    }
}

function createButton(params){
    newbutton = document.createElement('button');
    newbutton.setAttribute('type', 'button');
    if(params.className) newbutton.className = params.className;
    if(params.innerHTML) newbutton.innerHTML = params.innerHTML;
    if(params.onClick) newbutton.onclick = params.onClick;
    
    return newbutton;
    
    
}

function createAssessment(assessment){
    pagediv = document.getElementById("assessmentcanvas");
    for(p=0;p<assessment.pages.length;p++){
        //Each of these elements is a page
        newpage = createPage(assessment.pages[p]);
        newpage.style.display = "none";
        pagediv.appendChild(newpage);
    }
    pagediv.appendChild(createFinalPage());
}

function createFinalPage(){
    newpage = document.createElement('div');
    newpage.id = "finalpage";
    newpage.className = 'jumbotron text-centered';
    pageLabel = document.createElement('h3');
    pageLabel.innerHTML = "One last thing: can you let us know your e-mail address?";
    newpage.appendChild(pageLabel);
    
    pagelabel2 = document.createElement('h5');
    pagelabel2.innerHTML = "This assessment will give you a basic score, but we're also sending out customized reports to everyone who takes it.  We won't share your e-mail with anyone outside our firm, or even add you to our mailing list (although if you're interested, you can sign up for it at the bottom of the page).";
    newpage.appendChild(pagelabel2);


    emailField = document.createElement("input");
    emailField.type = "email";
    emailField.name = "email";
    emailField.id = "email";
    emailField.className = 'form-control'
    emailField.checked = true;
    emailField.placeholder = "yourname@yourdomain.com";
    newpage.appendChild(emailField);
    
    emailwarning = 

    newpage.appendChild(document.createElement('br'));
    
    
    newpage.style.display = "none";
    totalbutton = createButton({className: "btn btn-success", innerHTML: "Show Me My Score", onClick: ClickFinalWithValidation})
    newpage.appendChild(totalbutton);
    return newpage;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function ClickFinalWithValidation(){
    emailfield = document.getElementById("email");
    isemail = validateEmail(emailfield.value);
    if(isemail){
        sumvalues();
    }else{
        document.getElementById('finalpage').className += " has-error";
        //alert("Give us a real email!");
    }
}


function createPage(page){
    //This creates a new page
    newpage = document.createElement('div');
    heading = document.createElement('h2');
    heading.innerHTML = page.label;
    newpage.appendChild(heading);
    //Now cylce through the questions
    for(q=0;q<page.questions.length;q++){
        //This creates each question
        newpage.appendChild(createQuestion(page.questions[q]));
    }
    //The page needs a button at the end
    
    if(!page.noNewPage){
        newpage.appendChild(createButton({className: 'btn btn-primary', innerHTML: 'Next Page', onClick: switchdivs}))
        
    }
    return newpage;
}

function createQuestion(question){
    switch(question.type){
        case "text":
            return createTextQuestion(question);
        case "grid":
            return createGridQuestion(question);      
        case "text-area":
            return createTextAreaQuestion(question);
        case "checkbox":
            return createCheckboxQuestion(question);
        case "button":
            return createButtonQuestion(question);
    }
    errorElement = document.createElement('p');
    errorElement.innerHTML = "This is not a valid question:" & JSON.stringify(question);
    //return "Unindentified question type";
    return errorElement;
}

function createButtonQuestion(question){
    newbutton = document.createElement('button');
    newbutton.setAttribute('type', 'button');
    newbutton.className = 'btn';
    if(question.className) newbutton.className += ' '  + question.className;
    newbutton.innerHTML = question.label;
    switch(question.action){
        case "submit":
            newbutton.onclick = sumvalues;
            break;
        case "nextpage":
            newbutton.onclick = switchdivs;
        case "nextandsubmit":
            newbutton.onclick = submitAndGotoNext;
    }    
    return newbutton;
    
    
}

function createTextQuestion(question){
    //Return the layout for a text question
    textQuestion = document.createElement('p');
    textQuestion.innerHTML = question.label;
    return textQuestion;
}

function createTextAreaQuestion(question){
    //return the layout for a text-area
    textAreaLabel = document.createElement('label');
    textAreaLabel.innerHTML = question.label;
    
    
    textAreaQuestion = document.createElement('textarea');
    textAreaQuestion.name = question.category;
    textAreaQuestion.rows = 3;
    textAreaQuestion.className = "form-control";
    
    textAreaLabel.appendChild(textAreaQuestion);
    
    
    return textAreaLabel;
}

function createCheckboxQuestion(question){
    checkboxDiv = document.createElement('div');
    checkboxDiv.className = "checkbox";
    
    checkboxLabel = document.createElement('label');
    checkboxDiv.appendChild(checkboxLabel);
    
    checkboxQuestion = document.createElement('input');
    checkboxQuestion.type = 'checkbox';
    checkboxQuestion.className = "checkbox";
    checkboxQuestion.name = question.category;
    if(question.checked) {
        checkboxQuestion.checked = true;
    };
    
    checkboxLabel.appendChild(checkboxQuestion);
    checkboxLabel.innerHTML += question.label;
    
    return checkboxDiv;
}

function createGridQuestion(question){
    gridTable = document.createElement('table');
    gridTable.className = 'table table-striped table-hover';
    //Now add the first row
    headerRow = gridTable.createTHead();
    headerCell = document.createElement('th');

    headerRow.appendChild(headerCell);
    for(c=0;c<question.choices.length;c++){
        headerCell = document.createElement('th');
        headerCell.innerHTML = question.choices[c];
        headerCell.className = 'text-center';
        headerRow.appendChild(headerCell);
    }
    if(arrayContains(categorylabels, question.category)==false){
        categorylabels.push({label: question.category, total: 0, totalpossible: ((question.choices.length-1) * question.labels.length)});
    }
    for(l=0;l<question.labels.length;l++){
        questionRow = gridTable.insertRow(-1);
        questionRow.insertCell(-1).innerHTML = question.labels[l];
        for(c=0;c<question.choices.length;c++){
            inputCell = questionRow.insertCell(-1);
            inputCell.className = 'text-center';
//            inputCell.onclick = checkChildOption;
            inputCell.innerHTML = '<input type="radio" class="radio radio-inline" data-category='+question.category+' name="'+question.category+l+'" value="'+c+'">';    
                            
            
                        
        }
    }
    return gridTable;
}

function arrayContains(array, checkFor){
    for(a=0;a<array.length;a++){
        if(array[a]==checkFor){
            return a;
        }
    }
    return false;
}

function arrayContainsLabel(array, checkFor){
    for(a=0;a<array.length;a++){
        if(array[a].label==checkFor){
            return a;
        }
        return false;
    }
}


window.onload = function(){
    createAssessment(assessment);

}

function ajaxPost (form, callback) {
    var url = form.action,
        xhr = new XMLHttpRequest();
   
    //This is a bit tricky, [].fn.call(form.elements, ...) allows us to call .fn
    //on the form's elements, even though it's not an array. Effectively
    //Filtering all of the fields on the form
    var params = [].filter.call(form.elements, function(el) {
        //Allow only elements that don't have the 'checked' property
        //Or those who have it, and it's checked for them.
        return typeof(el.checked) === 'undefined' || el.checked;
        //Practically, filter out checkboxes/radios which aren't checekd.
    });
    
    
    params = params.filter(function(el) { return !!el.name; }); //Nameless elements die.
    params = params.map(function(el) {
        //Map each field into a name=value string, make sure to properly escape!
        return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
    });
    params = params.join('&'); //Then join all the strings by &

    xhr.open("POST", url);
    // Changed from application/x-form-urlencoded to application/x-form-urlencoded
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //.bind ensures that this inside of the function is the XHR object.
    xhr.onload = callback.bind(xhr); 
    //All preperations are clear, send the request!
    xhr.send(params);
}