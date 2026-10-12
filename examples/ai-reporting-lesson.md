# A short AI lesson: explain an account change

Sample AI training lesson: turn account data into a useful weekly explanation.

## The task

Write a useful weekly opening that tells a busy reader what changed, where it changed and what to check next.

## The inputs

Two equal seven-day windows for an invented outdoor brand:

| Channel | Earlier spend | Earlier revenue | Current spend | Current revenue |
| --- | --- | --- | --- | --- |
| Meta prospecting | $7,500 | $21,000 | $7,500 | $13,000 |
| Meta retargeting | $2,500 | $11,000 | $2,500 | $11,000 |
| Google | $5,000 | $20,000 | $5,000 | $20,000 |

Source: fictional platform-attributed revenue. No business-revenue reconciliation. A new ad and audience edit happened during the current window; neither establishes a cause.

## Ask the assistant

“Use only this table and context. Give me a short answer first, the calculation that supports it and the next checks. Separate measured change from possible explanation. Do not recommend an account action without the relevant evidence.”

## A good answer

Revenue fell $8,000 on unchanged $15,000 spend. The fall is in Meta prospecting; retargeting and Google held steady. Meta return fell from 3.2 to 2.4 dollars per ad dollar. Check the recent creative, audience edits, customer mix and tracking before deciding on a change. Those recent edits are context, not proof of the cause.

## Review it

- Recalculate the totals and return.
- Check that the periods match.
- Look for invented facts or unsupported causal language.
- Check that missing reconciliation stays visible.
- Make sure the next step names work someone can do.

## Practice

Now change Google revenue to $18,000 and ask for a revised answer. The assistant should account for both the $8,000 Meta decline and the $2,000 Google decline. It should not keep repeating that only Meta changed.
