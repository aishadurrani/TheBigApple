  (function() {
  var questions = [{
    question: "What is the tallest brick building in NYC?",
    choices: ["Empire State Building", "Flatiron", "Chrysler Building", "Citigroup Tower", "One World Trade Center"],
    correctAnswer: 2
  }, {
    question: "Which is NOT a Borough of NYC?",
    choices: ["Queens", "Manhattan", "Brooklyn", "Staten Island", "Harlem"],
    correctAnswer: 4
  }, {
    question: "What is the largest park in NYC?",
    choices: ["Pelham Bay Park", "Central Park", "Prospect Park", "Bryant Park", "Flushing Meadows Park"],
    correctAnswer: 0
  }, {
    question: "Which movie was NOT filmed in NYC?",
    choices: ["I Am Legend", "The Dark Knight Rises", "Home Alone 2", "Star Wars", "The Big Short"],
    correctAnswer: 3
  }, {
    question: "NYC is also known as The Big?",
    choices: ["Peach", "Dragon", "Bully", "Unicorn", "Apple"],
    correctAnswer: 4
  }, {
    question: "What stadium located in Flushing, Queens, is home to the New York Mets?",
    choices: ["Yankee Stadium", "Ebbets Field", "Polo Grounds", "Citi Field", "New York Public Library"],
    correctAnswer: 3
  }, {
    question: "What train station in Manhattan, built in 1913, often has art exhibits in a wing called Vanderbilt Hall?",
    choices: ["Penn Station", "Harlem Station", "Grand Central Station", "World Trade Center PATH Station", "Canal Street Subway Station"],
    correctAnswer: 2
  }, {
    question: "What building was called the eighth world wonder when it was built in 1931?",
    choices: ["Viacom Building", "Worldwide Plaza", "TimeWarner Building", "Chrysler Building", "Empire State Building"],
    correctAnswer: 4
  }, {
    question: "New York City is home to the country's largest zoo, which features more than 4,000 animals. What is the name of the zoo?",
    choices: ["Central Park Zoo", "Bronx Zoo", "Prospect Park Zoo", "The Buffalo Zoo", "Queens Zoo"],
    correctAnswer: 1
  }, {
    question: "What famous statue was shipped from France in 350 pieces and assembled in New York?",
    choices: ["Statue of Liberty", "Civic Fame", "Eiffel Tower", "Brooklyn Bridge", "Statue of Atlas"],
    correctAnswer: 0
  }];

  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  // Timer for quiz
  function quizTimer() {
        if (parseInt(sec) >0) {

            document.getElementById("showtime").innerHTML = "Time Remaining :"+min+" Minutes ," + sec+" Seconds";
            sec = parseInt(sec) - 1;                
            tim = setTimeout("quizTimer()", 1000);
        }
        else {

            if (parseInt(min)==0 && parseInt(sec)==0){
                document.getElementById("showtime").innerHTML = "Time Remaining :"+min+" Minutes ," + sec+" Seconds";
                 alert("Time Up");
                 document.questionForm.minute.value=0;
                 document.questionForm.second.value=0;
                 document.questionForm.submit();

             }

            if (parseInt(sec) == 0) {               
                document.getElementById("showtime").innerHTML = "Time Remaining :"+min+" Minutes ," + sec+" Seconds";                   
                min = parseInt(min) - 1;
                sec=120;
                tim = setTimeout("quizTimer()", 1000);
            }

        }
    }



  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();