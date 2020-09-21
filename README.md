# Assessment-Service

### Migration of Database
1. Create a new database with the name `assessment_service`
2. Update the fields `username` and `password` with your mysql username and password in the `ormconfig.json` file.
2. Make sure the node modules are installed by using `npm install`.
3. From the root of the project folder, run the command `./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run`

### Run the App
1. Run the app using command `npm start`
2. Visit `localhost:3000` in the browser

### GraphQL Mutations and Queries to use in the graphql playground
1. Create a single choice question:
```
mutation {
  createQuestion(data: {
    question:"Select your current job title",
    type: "single_choice",
    choiceOptions: ["Full Stack Engineer", "Backend Engineer", "Frontend Engineer"]
  }) {
    question
    type
    choiceOptions{
      choice
    }
  }
}
```

2. Create a multiple choice question:
```
mutation {
  createQuestion(data: {
    question:"Select your preferred programming languages",
    type: "multiple_choice",
    choiceOptions: ["C++", "Java", "Javascript", "C#", "Python", "PHP"]
  }) {
    question
    type
    choiceOptions{
      choice
    }
  }
}
```

3. Create a Yes or No type question:
```
mutation {
  createQuestion(data: {
    question:"Do you like Javascript?",
    type: "true_false",
    nestedQuestion: "What's the reason?",
    nestedQuestionTriggerFor:"false"
  }) {
    question
    type
    choiceOptions{
      choice
    }
  }
}
```

4. Get all the created questions
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

5. Create an assessment using ids from the previous question (4)
```
mutation {
  createAssessment(data:{
    name:"assessment",
    assessmentId: "assessment-1",
    questions: ["041cb748-a2fb-42e6-b942-96687e769610", "4e51bc6d-9b8b-4d4d-b6d1-30a9b27a348e",
    "bbf23afb-f0e6-4d1c-bfc5-65efa44e15a3"]
  }) {
    name
    assessmentId
    questions{
      id
      question
      nestedQuestion{
        question
        nestedQuestionTriggerFor
      }
      choiceOptions{
        choice
      }
    }
  }
}
```

6. Get details of an assessment
```
query {
 	getAssessmentDetails(assessmentId: "assessment-1") {
  	name
    questions{
      id
      question
      type
      choiceOptions{
        choice
      }
      nestedQuestion{
        question
        nestedQuestionTriggerFor
      }
    }
  } 
}
```

7. Create an assessment response
```
mutation {
  createAssessmentResponse(data: {
    assessorId:"user-1", 
    assessmentId:"assessment-1",
    questionResponses: [
      {
      questionId:"041cb748-a2fb-42e6-b942-96687e769610",
      answer: "Full Stack Engineer"
    }, 
      {
      questionId: "4e51bc6d-9b8b-4d4d-b6d1-30a9b27a348e",
      answer: "[\"C++\",\"Javascript\"]"
    }, {
      questionId: "bbf23afb-f0e6-4d1c-bfc5-65efa44e15a3",
      answer:"true"
    }]
  }) {
    assessorId
    assessmentId
  }
}
```

8. Get assessment response details
```
query {
  getAssessmentResponse(assessorId:"user-1", assessmentId:"assessment-1") {
    id
    assessorId
    assessmentId
    questionResponses {
      question {
        id
        question
        nestedQuestion {
          question
        }
        choiceOptions {
          choice
        }
      }
      answer
      nestedAnswer
    }
  }
}

```
