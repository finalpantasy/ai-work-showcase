# My personal AI brain

A private knowledge system that keeps my project history, decisions and working rules in one place, so an AI assistant can pick up a project without being briefed from scratch.

<!-- block:brain -->

I do most of my work with AI, and I got tired of explaining the same background every time I opened a new chat. The brain holds what a project is for, which decisions were made and why, what evidence supports a claim, what is still uncertain, and how I want the work done.

## The problem

An assistant can give a confident answer while missing the one fact that matters. It may not know we already rejected an approach, that a goal changed, or that a number came from an incomplete source.

The brain gives that knowledge a structure. Work history, projects, evidence, feedback and decisions each have a home, and a guide tells the assistant where to look. The assistant searches for a record, then reads the record itself before using it. A search snippet can drop the date or the caveat that changes what a fact means.

## Nothing becomes a fact without a check

New information arrives as a candidate, linked to its source. Before it joins the trusted records, it gets a review: Is it supported? Does it repeat something we have? Does it conflict with a later decision? Should it stay private? Is it a fact, a goal or an opinion?

It is the same rule my team works by on client accounts: prove it before you rely on it.

Here is an invented example of a reviewed record:

> Decision: Use a plain-language weekly report with the short answer first.
>
> Reason: The team needs to see what changed and what to do next without reading a long analysis.
>
> Source: Reviewed reporting-format decision, September 8.
>
> Status: Reviewed. Revisit if the reporting audience changes.

That record shapes the next report, template or briefing. Current account numbers still come from their own live source.

[Try reviewing a saved note](../workspace-demo.html#brain) or read the [sample record](../examples/fictional-knowledge-record.md).

## Working rules, not just notes

The brain also holds how I want recurring work done: find the right context, use the right tool, write plainly, show gaps, prepare the exact change, get approval, then check what happened. For a report that means the answer first, then revenue or customer context, risks and a next step. For an account change it means separating a recommendation from an approved change, and checking the result afterwards.

## My part

I decided what the system remembers, how records are organized, and the rules for using them. I keep revising those rules whenever an answer uses the wrong source, misses a constraint or overstates a claim. The hard questions are about behavior: what should happen when two records disagree, when a source is stale, or when a new note contains private details?

The same thinking went into AdNexus, where client context has to be accurate before it can drive a recommendation. [How AdNexus works](marketing-ai-operations.html).
