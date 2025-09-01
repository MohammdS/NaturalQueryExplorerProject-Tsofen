---
title: Business Requirements Specification (BRS)
---

Project: Natural Language to SQL Assistant

Version: 1.0

Date: 25/08/2025

Owner: Malak Awawde

# 1. Executive Summary

Business users often depend on analysts or DB admins to write SQL
queries in order to access data. This creates delays, bottlenecks, and
inefficiencies.\
The proposed solution is an OpenAI-powered NL→SQL Assistant that allows
users to type plain-language questions and receive validated, read-only
SQL results.\
\
The system will:\
- Reduce query turnaround time from days to minutes.\
- Empower business users without SQL knowledge.\
- Ensure data safety (read-only, validated queries).\
- Provide auditability for compliance and governance.

# 2. Goals & Objectives (SMART)

-   Provide a tool that allows natural language input to generate valid
    SQL queries.

-   Enable users to quickly explore data relationships and trends.

-   Reduce dependency on technical staff for day-to-day queries.

-   Improve productivity and decision-making by making data more
    accessible.

# 

# 3. Scope

In Scope:

-   Conversion of natural language to SQL queries.

-   Validation and safe execution of SQL queries.

-   Tabular display of query results.

-   Ability to upload database files.

-   Option to export results (CSV/JSON).

Out of Scope:

-   Complex ETL processes.

-   Advanced data visualization dashboards.

-   Large-scale database management.

# 4. Stakeholders

\- Business Users -- ask questions in plain language\
- Analysts -- advanced users, save & share queries\
- DB Admins -- manage connections & RBAC\
- Product Team -- rollout & adoption\
- Compliance/Security -- governance & safety

# 5. Business Requirements (Sample)

1.  The system must allow users to type questions in natural language.

2.  The system must translate natural language into valid SQL queries.

3.  The system must safely execute queries against uploaded databases.

4.  The system must display results in a user-friendly tabular format.

5.  The system must handle errors gracefully (invalid query, empty
    results, etc.).

6.  Users must be able to upload database files.

7.  Users must be able to export results to CSV or JSON.

**Use Cases For Project:** Natural Language → SQL Interface

**Business-Level Use Cases (BUC)**

  -----------------------------------------------------------------------
  ID                Name              Actors            Goal
  ----------------- ----------------- ----------------- -----------------
  BUC-1             Ask a Question    Business User,    User types a
                                      Analyst           plain-language
                                                        question to
                                                        explore data.

  BUC-2             View Results      Business User,    Display results
                                      Analyst           in a clear
                                                        tabular format.

  BUC-3             Upload Database   Business User,    Provide a .db
                                      DBA               (SQLite) file for
                                                        querying.

  BUC-4             Edit & Re-run SQL Analyst, Power    Inspect generated
                                      User              SQL, edit it, and
                                                        re-run.

  BUC-5             Export Results    Business User,    Download the
                                      Analyst           current result
                                                        set as CSV or
                                                        JSON.

  BUC-6             Review History    Business User,    Browse past
                                      Analyst           prompts, SQL, and
                                                        outputs to reuse.
  -----------------------------------------------------------------------

**System-Level Use Cases (SUC)**

  -------------------------------------------------------------------------------
  ID         Name        Actors     Preconditions   Postconditions   Trigger
  ---------- ----------- ---------- --------------- ---------------- ------------
  SUC-1      Upload &    User,      User has .db    DB validated and User uploads
             Validate DB System     file.           schema cached.   file.

  SUC-2      Enter       User       Database        Prompt captured. User types
             Prompt                 available.                       query &
                                                                     clicks Run.

  SUC-3      Generate    System     Prompt          Candidate SQL    System
             SQL         (NLP)      received.       produced.        receives
                                                                     prompt.

  SUC-4      Validate    System     SQL generated.  SQL verified     Before
             SQL                                    against schema.  execution.

  SUC-5      Safety      System,    Validated SQL   Statement        Before
             Check       DBA        exists.         approved for     execution.
                                                    execution.       

  SUC-6      Execute SQL System (DB SQL passed      Result set       Execution
                         Engine)    validation.     returned.        request.

  SUC-7      Display     System,    Execution       Table shown to   Successful
             Results     User       completed.      user.            execution.

  SUC-8      Edit &      User       SQL preview     New results      User edits
             Re-run SQL             available.      displayed.       SQL and
                                                                     clicks Run.

  SUC-9      Export      User       Result set      CSV/JSON file    User clicks
             Results                available.      downloaded.      Export.

  SUC-10     History     System,    At least one    History updated. After
                         User       query executed.                  execution.
  -------------------------------------------------------------------------------

**Use Case Specifications -- NL→SQL Assistant**

Expanded Use Case (Business-Level and System-Level)

**BUC-1: Ask a Question**

  -----------------------------------------------------------------------
  ID                                  BUC-1
  ----------------------------------- -----------------------------------
  Name                                Ask a Question

  Actors                              Business User, Analyst

  Goal                                User types a plain-language
                                      question to explore data.

  Preconditions                       Database connected; user logged in.

  Postconditions                      System captures question and
                                      prepares SQL generation.

  Trigger                             User enters question and clicks
                                      Run.

  Main Success Scenario (MSS)         1\. User types NL question.\
                                      2. System accepts input.\
                                      3. System passes to SQL generator.

  Alternative / Exception Flows       A1: Empty input → error.\
                                      A2: DB not connected → system
                                      blocks query.

  Traceability to Requirements        FR-001, FR-003
  -----------------------------------------------------------------------

**BUC-2: View Results**

  -----------------------------------------------------------------------
  ID                                  BUC-2
  ----------------------------------- -----------------------------------
  Name                                View Results

  Actors                              Business User, Analyst

  Goal                                Display results in a tabular
                                      format.

  Preconditions                       Query executed successfully.

  Postconditions                      Results displayed.

  Trigger                             System returns results.

  Main Success Scenario (MSS)         1\. User runs query.\
                                      2. System executes SQL.\
                                      3. Results displayed.

  Alternative / Exception Flows       A1: No rows → message.\
                                      A2: Timeout → error.

  Traceability to Requirements        FR-018, FR-019
  -----------------------------------------------------------------------

**BUC-3: Upload Database**

  -----------------------------------------------------------------------
  ID                                  BUC-3
  ----------------------------------- -----------------------------------
  Name                                Upload Database

  Actors                              Business User, DBA

  Goal                                Provide a .db (SQLite) file for
                                      querying.

  Preconditions                       User has .db file.

  Postconditions                      Database validated and schema
                                      cached.

  Trigger                             User uploads file.

  Main Success Scenario (MSS)         1\. User selects SQLite file.\
                                      2. System validates.\
                                      3. Schema cached.

  Alternative / Exception Flows       A1: Invalid file → error.\
                                      A2: Too large → reject.

  Traceability to Requirements        FR-015, DR-003
  -----------------------------------------------------------------------

**BUC-4: Edit & Re-run SQL**

  -----------------------------------------------------------------------
  ID                                  BUC-4
  ----------------------------------- -----------------------------------
  Name                                Edit & Re-run SQL

  Actors                              Analyst, Power User

  Goal                                Inspect generated SQL, edit, and
                                      re-run.

  Preconditions                       SQL preview available.

  Postconditions                      New results displayed.

  Trigger                             User edits SQL and clicks Run.

  Main Success Scenario (MSS)         1\. User inspects preview.\
                                      2. Edits SQL.\
                                      3. System validates.\
                                      4. Executes.

  Alternative / Exception Flows       A1: Invalid SQL → error.\
                                      A2: Non-SELECT → reject.

  Traceability to Requirements        FR-021, FR-024
  -----------------------------------------------------------------------

**BUC-5: Export Results**

  -----------------------------------------------------------------------
  ID                                  BUC-5
  ----------------------------------- -----------------------------------
  Name                                Export Results

  Actors                              Business User, Analyst

  Goal                                Download results as CSV or JSON.

  Preconditions                       Query executed and results
                                      displayed.

  Postconditions                      File downloaded.

  Trigger                             User clicks Export.

  Main Success Scenario (MSS)         1\. User clicks Export.\
                                      2. System generates file.\
                                      3. Download starts.

  Alternative / Exception Flows       A1: Export too large → warn.\
                                      A2: Network error → fail.

  Traceability to Requirements        FR-020, DR-005
  -----------------------------------------------------------------------

**BUC-6: Review History**

  -----------------------------------------------------------------------
  ID                                  BUC-6
  ----------------------------------- -----------------------------------
  Name                                Review History

  Actors                              Business User, Analyst

  Goal                                Browse past prompts, SQL, and
                                      outputs.

  Preconditions                       User has executed queries.

  Postconditions                      History list displayed.

  Trigger                             User opens History view.

  Main Success Scenario (MSS)         1\. User navigates to History.\
                                      2. System shows past queries.\
                                      3. User re-runs query.

  Alternative / Exception Flows       A1: No history → empty message.

  Traceability to Requirements        FR-023, DR-009
  -----------------------------------------------------------------------

**SUC-1: Upload & Validate DB**

  -----------------------------------------------------------------------
  ID                                  SUC-1
  ----------------------------------- -----------------------------------
  Name                                Upload & Validate DB

  Actors                              User, System

  Goal                                Allow uploading SQLite DB and
                                      validate schema.

  Preconditions                       User has .db file.

  Postconditions                      DB validated and schema cached.

  Trigger                             User uploads file.

  Main Success Scenario (MSS)         1\. User selects file.\
                                      2. System validates structure.\
                                      3. Schema cached.

  Alternative / Exception Flows       A1: Invalid DB → error.\
                                      A2: Too large → reject.

  Traceability to Requirements        FR-015, DR-003
  -----------------------------------------------------------------------

**SUC-2: Enter Prompt**

  -----------------------------------------------------------------------
  ID                                  SUC-2
  ----------------------------------- -----------------------------------
  Name                                Enter Prompt

  Actors                              User

  Goal                                Allow user to enter NL query.

  Preconditions                       Database available.

  Postconditions                      Prompt captured.

  Trigger                             User types query and clicks Run.

  Main Success Scenario (MSS)         1\. User opens UI.\
                                      2. Enters question.\
                                      3. Clicks Run.\
                                      4. System captures input.

  Alternative / Exception Flows       A1: Blank input → error.\
                                      A2: DB not available → block.

  Traceability to Requirements        FR-001, FR-003
  -----------------------------------------------------------------------

**SUC-3: Generate SQL**

  -----------------------------------------------------------------------
  ID                                  SUC-3
  ----------------------------------- -----------------------------------
  Name                                Generate SQL

  Actors                              System (OpenAI NLP)

  Goal                                Convert NL prompt into SQL.

  Preconditions                       Prompt received.

  Postconditions                      Candidate SQL produced.

  Trigger                             System receives prompt.

  Main Success Scenario (MSS)         1\. System sends prompt + schema to
                                      OpenAI.\
                                      2. OpenAI returns SQL.\
                                      3. Candidate produced.

  Alternative / Exception Flows       A1: Invalid output → error.\
                                      A2: Network fail → retry.

  Traceability to Requirements        FR-001, FR-002
  -----------------------------------------------------------------------

**SUC-4: Validate SQL**

  -----------------------------------------------------------------------
  ID                                  SUC-4
  ----------------------------------- -----------------------------------
  Name                                Validate SQL

  Actors                              System

  Goal                                Check SQL is safe and valid.

  Preconditions                       SQL generated.

  Postconditions                      SQL verified.

  Trigger                             Before execution.

  Main Success Scenario (MSS)         1\. Check syntax.\
                                      2. Enforce SELECT-only.\
                                      3. Confirm schema.\
                                      4. Pass valid.

  Alternative / Exception Flows       A1: Invalid column → error.\
                                      A2: Non-SELECT → reject.

  Traceability to Requirements        FR-010, FR-011
  -----------------------------------------------------------------------

**SUC-5: Safety Check**

  -----------------------------------------------------------------------
  ID                                  SUC-5
  ----------------------------------- -----------------------------------
  Name                                Safety Check

  Actors                              System, DBA

  Goal                                Perform safety checks before
                                      execution.

  Preconditions                       Validated SQL exists.

  Postconditions                      SQL approved.

  Trigger                             Before execution.

  Main Success Scenario (MSS)         1\. Estimate cost.\
                                      2. Check row limits.\
                                      3. Prompt user if risky.\
                                      4. Approve safe SQL.

  Alternative / Exception Flows       A1: Too costly → confirm.\
                                      A2: Timeout risk → suggest filter.

  Traceability to Requirements        FR-012, FR-028
  -----------------------------------------------------------------------

**SUC-6: Execute SQL**

  -----------------------------------------------------------------------
  ID                                  SUC-6
  ----------------------------------- -----------------------------------
  Name                                Execute SQL

  Actors                              System (DB Engine)

  Goal                                Run validated query.

  Preconditions                       SQL passed validation.

  Postconditions                      Result set returned.

  Trigger                             Execution request.

  Main Success Scenario (MSS)         1\. Execute SQL.\
                                      2. DB engine returns rows.\
                                      3. System receives results.

  Alternative / Exception Flows       A1: Timeout → cancel.\
                                      A2: Connection error → retry.

  Traceability to Requirements        FR-013, FR-018
  -----------------------------------------------------------------------

**SUC-7: Display Results**

  -----------------------------------------------------------------------
  ID                                  SUC-7
  ----------------------------------- -----------------------------------
  Name                                Display Results

  Actors                              System, User

  Goal                                Show query results to user.

  Preconditions                       Execution completed.

  Postconditions                      Table displayed.

  Trigger                             Successful execution.

  Main Success Scenario (MSS)         1\. Format results.\
                                      2. Display to user.

  Alternative / Exception Flows       A1: No results → empty message.\
                                      A2: Large results truncated.

  Traceability to Requirements        FR-018, FR-019
  -----------------------------------------------------------------------

**SUC-8: Edit & Re-run SQL**

  -----------------------------------------------------------------------
  ID                                  SUC-8
  ----------------------------------- -----------------------------------
  Name                                Edit & Re-run SQL

  Actors                              User

  Goal                                Allow edit of generated SQL and
                                      re-run.

  Preconditions                       SQL preview available.

  Postconditions                      New results displayed.

  Trigger                             User edits SQL and clicks Run.

  Main Success Scenario (MSS)         1\. Inspect preview.\
                                      2. Edit SQL.\
                                      3. Validate.\
                                      4. Execute.\
                                      5. Display results.

  Alternative / Exception Flows       A1: Invalid SQL → error.\
                                      A2: Unsafe SQL → reject.

  Traceability to Requirements        FR-021, FR-024
  -----------------------------------------------------------------------

**SUC-9: Export Results**

  -----------------------------------------------------------------------
  ID                                  SUC-9
  ----------------------------------- -----------------------------------
  Name                                Export Results

  Actors                              User

  Goal                                Download results in CSV/JSON.

  Preconditions                       Result set available.

  Postconditions                      File downloaded.

  Trigger                             User clicks Export.

  Main Success Scenario (MSS)         1\. Select Export.\
                                      2. Choose format.\
                                      3. Generate file.\
                                      4. Download.

  Alternative / Exception Flows       A1: Exceeds cap → warn.\
                                      A2: Network issue → fail.

  Traceability to Requirements        FR-020, DR-005
  -----------------------------------------------------------------------

**SUC-10: History**

  -----------------------------------------------------------------------
  ID                                  SUC-10
  ----------------------------------- -----------------------------------
  Name                                History

  Actors                              System, User

  Goal                                Maintain and show query history.

  Preconditions                       At least one query executed.

  Postconditions                      History updated.

  Trigger                             After query execution.

  Main Success Scenario (MSS)         1\. Log executed query.\
                                      2. Store prompt, SQL, results
                                      metadata.\
                                      3. Display history.

  Alternative / Exception Flows       A1: No history → empty state.

  Traceability to Requirements        FR-023, DR-009
  -----------------------------------------------------------------------
