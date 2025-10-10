## Objective
What does this PR change and why?

## How to Test
1) npm i
2) cp .env.example .env (set MONGODB_URI)
3) npm run seed
4) npm run dev
5) Import and run Postman collection (or `npm run test:api`)

## Evidence
- Screenshot(s) of Postman / newman output

## Checklist
- [ ] App boots without errors
- [ ] Env vars updated in .env.example (if needed)
- [ ] HTTP codes correct (201/404/etc.)
- [ ] Filters/pagination/sort work
- [ ] Soft delete implemented (no hard deletes)
- [ ] Error handler returns JSON
- [ ] Lint OK (`npm run lint`)
- [ ] openapi.yaml updated
- [ ] README updated if behavior changed
