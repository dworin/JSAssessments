# JSAssessments
Create assessments and surveys straight in javascript - no database needed.

Sometimes you want to make a survey quickly, but you don't

This tool takes a JSON file and turns it into an assessment. To do that, include both the assessments.js and a file with a variable called 'assessment' to your html file.

An 'assessment' is an array of pages

each page can have a 'label' (string) and an array of question objects

each question has a type, category, and labels.  Currently supports the following types:

type: text
label: the text you want to display (use for messages)

type: grid
category: a string that will identify the answers for the grid in your report (shorter is better)
lables: an array of question labels (each label is a string and represents one question)
choices: a list of strings that represent the answer choices (i.e. agree/disagree).  This can be a variable, so multiple questions can have the same answer choices

There are probably some undocumented features in there...

You can see the clientsurvey.js for an example
