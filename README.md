# Polymorphic data design & handling unstructured datasets

## Description

The general idea of the application is to allow potential customers to use offer aggregation and make purchases for deals from various product vendors. (e.g. systems like "Ceneo", "Rankomat" etc.)

We will take vehicle insurance offers, and car deals as our example product categories.

## Mindflow 

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

> somewhere between points 3-4, author was thinking about using document-oriented database (MongoDB), but even though it looks like a perfect use case for this kind of dbs, author has strong opinion on no-SQL databases. They should be used targetedly for dealing with performance issues as a read model with denormalised data. When the project is new, we cannot foresee everything, thus author would always bet on flexibility first, but perfomance. What's more, in the task project, there shouldn't be any problems with perfomance (we have just a few forms and no list with them).

4. Elaborate interfaces of domain entities
- here author thinks on user flows and possible features. 
- For instance, form's questions have order. There are different ways to implement order in SQL databases. When the implementation is important..? Right, during form editing.. (which is out of task boundaries of course) How do forms are imported/created/edited? Most likely, in the future, there would be some sort of UI for creating/updating forms. And form editor usually requires drag-n-drop functionality. Which means that author (for this case) can use prevQuestionId field on FormQuestion model.
- another important feature is form persistence. What if form was updated after user saved his response? To avoid collisions, we need a version field on Form model. 
- also, there is 'save for later' feature. Which means that form response can have different states: smth like draft/published. How many states do we have? Only 2. And probably it would be a maximum (there could be some workflows like 'review' or smth custom, but that's definitely not the case :) Then we can simply use isCompleted flag.
- question inputs often have constraints, like min/maxCharacters or maxFileSize. Even though this project will miss this feature, author can add this constraints field (let's say 'just because'..). This constraints could vary among deffirent types of inputs (like text input and assets input). A good approach would be to use a JSON data type for this field. Typescript will later handle it type depending on type of input, and we will not need indexing them (for sure).
- answers has values and those values could have different schema. To handle that we can use JSON data type. 

> Important note. Since Prisma doesn't support JSON data type on SQLite (author decided to use it as the simplest solution), author will use JSON.stringify() method and save answers' values as a string data type. Which will definetely cause some inconviniece with typing it, but we have what we have. :)

- TODO: conditional visibility of questions
