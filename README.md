# Aspire
## VUEJS CODE CHALLENGE

### Requirements
- Docker
- Docker-compose
- NodeJS(12.10)
- Yarn(1.22)

### How To Run

1. Clone the project
`$ git clone https://github.com/nguyentungg/Aspire.git`

_Make sure you already stop all Docker container_

`docker-compose down`

2. Run the project
```
$ cd Aspire
$ docker-compose up --build
```
Website: http://localhost:8080

### Description

1. Code Challenge

```
Postgres Admin URL: http://localhost:5050 (login acc has been specified in docker-compose.yml)
Data Storage: Postgres
Loan page: /loans
Admin page: /admin/loans
  Default admin acc: admin@aspire.test / admin
```

### How to use:

**Step 1**:  Login to admin account and create new customer.

**Step 2**: Open new tab, login into previously created customer acc, register a loan.

**Step 3**:  Back to the admin tab, refresh the page, navigate to Loan menu, see new registered loan, accept/reject it.

**Step 4**: Go to customer tab, Refresh the page, if admin has accepted it, you can click on Pay button and make a weekly payment.



### Technology Stack
#### Frontend
- [Quasar2](https://quasar.dev/)
- Vue
- [jest](https://jestjs.io/en/)

#### Backend
- [Docker](https://www.docker.com/)
- [TsED](https://tsed.io/)
- TypeORM
- Postgres
