# Assessment-Service

### Migration of Database
1. Create a new database with the name `assessment_service`
2. Make sure the node modules are installed.
3. From the root of the project folder, run the command `./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run`

### Run the App
1. Run the app using command `npm start`
2. Visit `localhost:3000` in the browser

### GraphQL Mutations and Queries to use in the graphql playground
1. Create a single or multiple choice question:
```
mutation {
  createQuestion(data: {
    question:"Select your preferred programming language!",
    type: "single_choice",
    choiceOptions: ["C#", "Javascript", "Python", "C++"]
  }) {
    question
    type
    choiceOptions{
      choice
    }
  }
}
```

2. Create a Yes or No type question:
```
mutation {
  createQuestion(data: {
    question:"Is C++ your favourite language?",
    type: "true_false",
    nestedQuestion: "Give reason why."
  }) {
    question
    type
    choiceOptions{
      choice
    }
  }
}
```

3. Get all the created questions
```
query {
  getQuestions {
    id
    question
    nestedQuestion {
      question
    }
    choiceOptions{
      id
      choice
    }
  }
}
```

4. Create an assessment using ids from the previous question (3)
```
mutation {
  createAssessment(data:{
    name:"assessment",
    assessmentId: "assessment-2",
    questions: ["4d9e097a-d77b-4d29-a8e9-ff019247c4c7", "b77e9e82-ba66-428c-9d8d-c2e96481c6d7"]
  }) {
    name
    assessmentId
    questions{
      id
      question
      nestedQuestion{
        question
      }
      choiceOptions{
        choice
      }
    }
  }
}
```

5. Get details of an assessment
```
query {
 	getAssessmentDetails(assessmentId: "assessment-1") {
  	name
    questions{
      question
      choiceOptions{
        choice
      }
      nestedQuestion{
        question
      }
    }
  } 
}
```
