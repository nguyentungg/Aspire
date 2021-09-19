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

How to use:

- Login to admin account to create new customer
- Open new tab, login into previously created customer acc, register a loan
- Switch to admin tab, F5 page, navigate to Loan menu, see new registered loan, just accept/reject it
- Switch to customer tab, F5 page, if admin has accepted it, customer can make a weekly payment

2. Challenge 2



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
