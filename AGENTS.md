<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Commercial settings live only in `src/config/funnel.ts`; placeholder values (`[...]`) or empty strings hide their UI. Why: owner edits one file.
- Quiz content (questions, scoring, profiles) lives in `src/quiz/`, UI in `src/components/funnel/`, events go only through `src/lib/analytics.ts`. Why: keep copy, logic and tracking separate.
- Quiz step is the `etapa` search param on `/`; answers persist in sessionStorage. Why: browser Back works without history hacks.
