# Stop typing the same ad into two tools

My role: Workflow design and AI-assisted tool building. The mapper and client configurations are private.

## The tedious part

Ad plans live in Airtable. The launch tool needs the same headlines, copy, links and assets in its own import format. A browser assistant had been typing those rows one at a time.

I built a mapper that turns the planner export into a CSV file for the launch sheet. The tool was built against the import fields read from the launch tool itself on August 24, 2026.

## What it handles

It maps the ad name, format, copy, headlines, descriptions, destination link, tracking parameters and assets into the required fields.

It closes empty gaps in numbered fields because the import rejects those gaps. It flattens rich text while preserving the wording, punctuation and emoji.

Client planners have different field names and structures. The mapper uses a configuration for each setup so those differences can be handled without rewriting the whole tool.

## The person's job gets simpler

The workflow is: pull the selected planner rows, run the mapper, import the file and check the rows. The tool prepares the data; the person still reviews and launches the ads.

The inspected project includes example input and output from two planner rows. I am showing the workflow here, with all client files withheld. I have not claimed a fresh end-to-end launch test or a measured time saving for this tool.

## Why it belongs in this portfolio

This is the kind of problem I like solving. I spot repeated work, understand what each tool needs and build a small bridge between them. The person gets a simpler task without having to learn a new way to work with AI.
