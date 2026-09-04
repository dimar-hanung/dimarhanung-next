## When to Use

Building or changing public project case-study pages under `pages/project/*` (SRS, MyUT, and later product stories). Not for the generic `/project` index listing, and not for `pages/project/detail`.

## Key locations

- `pages/project/srs/` — SRS5G staff record case study (teal/copper serif)
- `pages/project/myut/` — MyUT Mahasiswa student portal case study (kraft/navy/vermillion)
- `pages/project/admisi-ut/` — SIA Admisi UT new-student onboarding (separate product from MyUT). Theme: admission lobby — campus green `#0d7a4d` on mint paper, Space Grotesk + Instrument Sans + Space Mono; interactives: `QueueHall.vue` (LED now-serving board + thermal ticket dispenser) and `ApplicantPaths.vue` (applicant-type tabs)
- `components/home/project.vue` — listing cards; set `detailPath` when a case study exists
- `public/project/<slug>/` — IconScout illustrations, icons, and login-screen banners

## References

- (none)

## Learned user preferences

- Each product gets its own theme. Do not reuse `pages/project/detail/index.vue` or copy another case study's palette, type, or interactive metaphor.
- Copy stays general and public-safe: no deep business rules, no internal workflows, no production data.
- Include a unique interactive tied to the product (SRS: orbit / constellation / seal. MyUT: semester postmarks + demo e-KTM. Admisi UT: queue hall LED + thermal ticket).
- Pull illustrations and icons from IconScout and credit them in the footer.
- Case-study body copy is English to match the portfolio `html lang`.

## Learned Workspace Facts

- `pages:extend` drops colocated `components/` folders from the route table, so helpers can live next to the page.
- MyUT is the student portal (`myut.ut.ac.id`). SIA Admisi is a separate product (`admisi-sia.ut.ac.id`) and should not share this page.
- MyUT public story: distance students register, pay, track mailed modules, join tutorials, sit exams, hold an e-KTM, and can ask MYRA. Split from older SIA 5G.
- MyUT stack on this site: Vue 2.7, Vuex, Tailwind, Azure MSAL / campus SSO. Do not paste APIs or other-repo trees into this skill.
- `fe-myut` — student frontend. `be-myut-agents` hosts MYRA. Mention those project names only.
- `fe-sia` is the Admisi UT applicant frontend (Vue 2.7, Vuex, Tailwind, PWA). Mention the project name only; keep admission business rules off the page.

## External projects

- `fe-myut` — student academic portal this case study describes
- `be-myut-agents` — MYRA assistant backend used inside MyUT
- `fe-sia` — admission portal frontend the Admisi UT case study describes
