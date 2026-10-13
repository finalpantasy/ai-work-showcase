# My personal AI brain

A private knowledge system that keeps my project history, decisions and working rules in one place, so an AI assistant can pick up a project without being briefed from scratch.

<!-- block:brain -->

I do most of my work with AI, and I got tired of explaining the same background every time I opened a new chat. The brain holds what a project is for, which decisions were made and why, what evidence supports a claim, what is still uncertain, and how I want the work done.

## The problem

An assistant can give a confident answer while missing the one fact that matters. It may not know we already rejected an approach, that a goal changed, or that a number came from an incomplete source.

The brain gives that knowledge a structure, so an assistant starts with the history, the decisions and their sources instead of guessing.

## Nothing becomes a fact without a check

New information is checked before an assistant can rely on it: is it supported, does it conflict with a later decision, and should it stay private?

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

The brain also holds how I want recurring work done, such as reports that lead with the answer, so every assistant works to the same standard without being told again.

## My part

I decided what the system remembers, how records are organized, and the rules for using them. I keep revising those rules whenever an answer uses the wrong source, misses a constraint or overstates a claim. The hard questions are about behavior: what should happen when two records disagree, when a source is stale, or when a new note contains private details?

The same thinking went into AdNexus, where client context has to be accurate before it can drive a recommendation. [How AdNexus works](marketing-ai-operations.html).
