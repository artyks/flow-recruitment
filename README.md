# Polymorphic data design & handling unstructured datasets

## Description

The general idea of the application is to allow potential customers to use offer aggregation and make purchases for deals from various product vendors. (e.g. systems like "Ceneo", "Rankomat" etc.)

We will take vehicle insurance offers, and car deals as our example product categories.

## Installation <a name="installation"/>

Project requires [Node.js](https://nodejs.org/) 18.16.0 to run. If you have nvm package installed, then:

```sh
nvm use
```

Install dependencies:

```sh
npm install
```

Generate prisma types:

```sh
npm run prisma:generate
```

Serve apps:

```sh
npm run start
```

OR:

> Smth wrong with Docker setup, app works unstable... So please go with an option above.

Run docker compose:

```sh
docker compose up
```

Don't forget to create '.local.env' file at the root directory. Check out its example in './local-env.txt'.

## Note

1. Author forgot to implement api endpoint for actually completing the form. So they always stay uncompleted.

## Mindflow

### Day 1

1. Analysis and understanding requirements

Author started from analysis by reading the task requirements "ten" times in a row and understanding user story.

The next step is to visualise (schematically) the application presentation layer -- possible website pages/views, author noted the following ones:

- a home page for selecting product category with a list of "saved for later" links.
- a view with a form (either search or purchase). In the real app, most likely those would be different views, cause they are from different boundary contexts (in practice, they would have different designs), but the requirements of the task allow and encourage author to utilise polymorphism, thus he has decided to stay within one view for all the types of forms.
- a view with products per each product category

2. Analysis of user flows and features

- It's just so important that author decided to highlite it by separating from the 1st point
- Here author thinks about user flows from the technical perspective
- Possible questions to ask yourself: is it realistic to develop? what are possible difficulties? which tools to use? Any ideas on how to provide a better UX? (for instance, do we need 'auto save' feature when user edits answers) Which architecture to use? etc.

3. Based on analysis of user flows, define domain entities and some of their connections

- author starts from finding aggregate roots: Form, ProductCategory, User
- then goes roots' children: Form -> Question(s), Form -> Response(s) -> Answer(s)
- in the end we have smth like: Form, FormQuestion, FormResponse, FormResponseAnswer, User, ProductCategory

> FormResponse model is needed to handle both uncompleted and completed states of form response. Otherwise, we could omit it and link answers with questions directly.

> somewhere between points 3-4, author was thinking about using document-oriented database (MongoDB), but even though it looks like a perfect use case for this kind of dbs, author has strong opinion on no-SQL databases. They should be used targetedly for dealing with performance issues as a read model with denormalised data. When the project is new, we cannot foresee everything, thus author would always bet on flexibility first, but not perfomance. What's more, in the task project, there shouldn't be any problems with perfomance (we have just a few forms and no list with them).

4. Elaborate interfaces of domain entities

- here author thinks on user flows and possible features.
- For instance, form's questions have order. There are different ways to implement order in SQL databases. When the implementation is important..? Right, during form editing.. (which is out of task boundaries of course) How do forms are imported/created/edited? Most likely, in the future, there would be some sort of UI for creating/updating forms. And form editor usually requires drag-n-drop functionality. Which means that author (for this case) can use prevQuestionId field on FormQuestion model. Though it's out of task requirements.
- another important feature is form persistence. What if form was updated after user saved his response? To avoid collisions, we need a version field on Form model.
- also, there is a 'save for later' feature. Which means that form response can have different states: smth like draft/published. How many states do we have? Only 2. And probably it would be a maximum (there could be some workflows like 'review' or smth custom, but that's definitely not the case :) Then we can simply use isCompleted flag.
- answers have values and those values could have different schema. To handle that we can use JSON data type or fields with different data types like valueString, valueNumber, valueYN. Authour prefers JSON though, it's more flexible and limitations like possible issues with indexing are not important here.

> Important note. Since Prisma doesn't support JSON data type on SQLite (author decided to use it as the simplest solution), author will use JSON.stringify() method and save answers' values as a string data type. Which will definetely cause some inconviniece with typing it, but we have what we have. :)

- for handling questions' conditional visibility, author decided to implement some sort of policy based ACL. Simply saying, we can create another table with visibility rules. Thus, we can define a model FormQuestionsVisibilityRule. Drawback of the simplest implementation of this table is that we can defined rules with AND condition (like RULE_A AND RULE_B AND ...), but not with OR. Author decided not to dive deep into the issue, cause task requirements don't suppose more than 1 rule, which means this implementation satisfies them.

- question inputs (answer values) often have constraints (like min/maxCharacters or maxFileSize). These constraints could vary among deffirent types of inputs (like text input and assets input). A good approach would be to use a JSON data type for this field, because there could be a looot of different constraints. Typescript will later handle it type depending on type of input, and we will not need to index them (for sure). What's more, questions could be reqired and optional, author could add those fields, but those features are out of the scope, so author will omit them, as well as implementation of form validation. :)

### Day 2

The plan for Day 2 is the following:

- to setup project monorepo
- setup prisma module
- define prisma schemes (domain entities)
- desing API endpoints based on user flow analysis (simple REST should be enough, but maybe some sort of RPC style of its commands could be applied)
- decide on backend application architecture (what layers will be used, the simplest solution would be controllers with services, probably models; as a repository we have prisma client; maybe CQRS could be applied or event driven architecture; etc.)
- implement API as much as possible :)

> Idea: while we can explicitly set version of Form (blueprint), the current database design allows us to omit it, because we have Form id, and if the FormResponse's formId doesn't match with currently setted (used) Form id, we can simply ignore FormResponse and ask user to fill the form again. While form versioning could be more valuable if we had a UI where user could edit form blueprint and rollback to the previous version. But that's a different story.

#### Results:

- [x] configure monorepo
- [x] configure api app
- [x] setup prisma
- [x] define prisma schemes
- [x] design api endpoints
- [x] api architecture
- [x] develop dtos
- [x] develop api services, except FormResponsesService :)

### Day 3

The plan for Day 3 is the following:

- complete api services (FormResponsesService)
- develop api controllers
- create prisma seed
- configure frontend app
- implement frontend as much as possible :)

#### Results:

- [x] complete api services
- [x] develop api controllers
- [x] create prisma seed
- [ ] configure frontend app
- [ ] implement frontend as much as possible :(

  This time was less lucky, author had an issue with prisma transactions, they didn't want to work with SQLite due to the connection amount limit (just 1). Thus author moved to Postgres. What's more, there was a hidden bug with prisma transaction client injection (needed for transaction to work among different services) -- transaction injection helper used 'prismaService' property, while author used 'prisma' property in services, which had caused transactions to fail. To avoid this in the future, would be better to create class to extend from, smth like 'ServiceWithExtendedTransaction' (but author has no time for that).

  Another issue was with seeding prisma, which required moving services to libs. As Nx authors recommend, 80% of code goes to libs, and 20% to apps. Though a git history was a bit lost, glad it's not a big problem this time :)

### Day 4

The plan for Day 4 is the following:

- add choice options to question schema [fix]
- inject default user onto request
- configure frontend app
- implement frontend api layer
- develop frontend templates (html/css)
- implement frontend logic
- test if it works :)
- pack the project into container

#### Results:

- [x] add choice options to question schema [fix - author forgot about them]
- [x] inject default user onto request
- [x] configure frontend app
- [x] implement frontend api layer
- [x] develop frontend templates (html/css)
- [x] implement frontend logic
- [x] test if it works :)
- [ ] pack the project into container

### Day 5

The plan for Day 5 is the following:

- pack the project into container
- fix some bugs
- update form fixtures
- update Readme with instruction

#### Results:

- [x] pack the project into container
- [x] fix some bugs
- [x] update form fixtures
- [x] update Readme with instruction
