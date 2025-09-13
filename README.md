# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

Functionality
- Parser might not return a string[][]
- The parser might not correctly parse data with commas in it
- The parser might not correctly account for empty or null values in the data
Extensibility
- Should throw an error if csv is broken (inconsistent amount of columns in a row with the heading)
- Should allow the user to define a schema for the csv that want to parse
- Should validate that the csv data fits the schema (if int, do not accept a string)

- #### Step 2: Use an LLM to help expand your perspective.

Original
- https://chatgpt.com/share/68c43ba9-fbf4-8010-976a-066fdc3ac123
- There was some overlap with the ideas I came up with, such as the ability to handle empty and null values, allowing for schema support, and handling errors for inconsistent row/col counts.
- Some edges cases I didn’t consider but find important are handling trailing or leading whitespace in the data, different delimiters (other that commas), and accounting for headers. An enhancement from the LLM that I think would be important include configurable options (for headers, null handling, row trimming, etc.).
- It might have missed the point with some of its suggestions, as it talking about use validation hooks when we will already be using Zod as our validator and struggles with encoding with certain csv files (handing BOM).

Variant 1:
- https://chatgpt.com/share/68c54646-86b0-8010-9e72-ac9629e3b14c
- Prompt: “I’m implementing a CSV parser that accepts a file and a zod schema and outputs a string[][]. What are some possible bugs or enchancements that are be important to include functionally, in terms of CSV specification? What are some common pitfalls for developers making CSV parsers that I should avoid?”
- Results were fairly similar for the possible edge cases to handle, mentioning the same things of handling quotes, line endings and newlines, empty values, schema validation, and handling BOM. The answer was different as I geared the prompt more toward the functionality aspect of the project, so the LLM did not talk about enhancements as much. I also appreciated that this time, why directly asking about pitfalls, they mentioned new edge cases to consider, such as the naive split by comma with line.split(",") and inconsistent escaping.

Variant 2:
- https://chatgpt.com/share/68c54655-0e00-8010-a15a-6f08c6cfdeed
- Prompt: “I’m implementing a CSV parser that accepts a file and a zod schema and outputs a string[][]. What features would improve the flexibility and extensibility of the CSV parser? Think in terms of validation, error handling, schemas, and what the caller might want from the function.”
- Results were also kinda similar to the original prompt, but gave more specific actionable items for implementing enhancements, such as how to approach schema-based validation and error reporting. I also appreciated that the LLM focused on the call experience, thinking about what would be good for the caller to have available to them, like configurable outputs and different modes (strict vs. loose parsing). This prompt was geared towards the extensibility, so the LLM did not mention any of the edge cases here.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    User Story:
    - “As a user of this application, I want to be able to define my own schema for the csv I would like to parse and configure the parser settings based on my csv. I also want the csv parser to accept different types of data inputs, such as empty or quoted values.”
    Acceptance Criteria
    - The parser can handle empty or null values, which will be preserved or configured based on the user’s liking
    - The parser can process quoted fields with no alterations, especially ones with commas in between.
    - The user can define a schema for the uploaded CSV, clarifying the types of data that are acceptable
    - The user can choose configurable options, such as including headers, how to handle null types, and more

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    - There was a lot of overlap with my initial ideas and the LLM, particularly with empty/null handing,schema validation, and inconsistent row/column counts. The LLM pointed out some handy edge cases like whitespace, handling different delimiters, and accounting for headers, and gave some interesting suggestions for enchancements, like with strict vs. loose parsing and configurable options. The two additional prompts also gave some valuable insight, focusing on functionality pitfalls with the naive split and elaborating on the configurable options, both of which really resonated with me. Some suggested missed the point like the validation hooks when Zod already fills that role, but I thought there was a lot of valuable feedback from the LLM paired with my own ideas.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):
#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
    ChatGPT (chat logs in Task B answers)
#### Total estimated time it took to complete project:
    8 hours
#### Link to GitHub Repo:  
    https://github.com/cs0320-f25/typescript-csv-avery-espiritu
