# Ad-launch mapper: stop typing the same ad twice

A small tool that turns an ad planner into the import file the launch tool expects. The copy, links and assets are prepared once in the planner, and nobody retypes them into the launch tool.

Retyping is where mistakes come from: a wrong link, an edited headline, an image attached to the wrong ad. The mapper removes the retyping and catches the problems before import.

<!-- block:ad-mapper -->

## Built against the real import format

The mapper was built against the launch tool's actual import fields, not a generic spreadsheet. It handles client settings, naming rules, multiple primary-text options, headlines, descriptions, assets, destination and display links, tracking parameters and calls to action.

A file can be valid and still fail if a column name, an allowed value or an asset link does not match what the receiving tool expects. That is the part this tool is careful about.

## The messy rows

Planners are not tidy. Someone fills primary-text options one and three and leaves two empty. The mapper closes the gap so the import has no hole, and keeps the approved copy exactly as written, punctuation and emoji included.

Assets have their own traps. One shared folder for several ads can attach the same images to all of them, so the mapper expects a link per file or a folder per ad. GIFs are flagged for a person to check, because the launch tool may need a different format.

| Check before import | Why |
| --- | --- |
| Correct destination | A good ad still fails if it sends people to the wrong page |
| Copy unchanged | Approved wording should not change between tools |
| Numbered fields without gaps | Importers read missing options differently |
| Assets belong to this ad | Shared folders create unintended combinations |
| Format and call to action allowed | The receiving tool has its own list of values |

## Try it

The [demo](../workspace-demo.html#mapper) converts two invented ads for Juniper Supply. One skips a headline field on purpose. Break a destination link and the export stops.

## My part

I spotted the repeated work, read the launch tool's requirements and specified the mapping. I built it with AI, then checked the column layout and documented the cases that still need a person. The same idea now runs inside AdNexus, where planner ads go straight to Meta, created paused for review.
