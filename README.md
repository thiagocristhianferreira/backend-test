# Back End Test Project <img src="./coderock.png" align="right" height="50px" />

This was a project developed for Coderock.

## SUMMARY

- [SUMMARY](#summary)
- [GAIN](#gain)
- [TAXATION](#taxation)
- [DATABASE](#DATABASE)
- [LANGUAGE](#LANGUAGE)
- [ARCHITECTURE](#ARCHITECTURE)
- [HOW TO USE THE API](#HOW-TO-USE-THE-API)
  - [POST Route (/investment)](POST-Route-(/investment))
  - [GET Route (/investment)](GET-Route-(/investment))
  - [GET Route (/investment/:owner)](GET-Route-(/investment/:owner))
  - [PUT Route (/investment/:owner)](POST-Route-(/investment/:owner))
- [HEROKU DEPLOYMENT](#HEROKU-DEPLOYMENT)
- [GITHUB REPOSITORY](#GITHUB-REPOSITORY)

  ### It consists of an API for an application that stores and manages investments, it must have the following features:

    1. Create an investment.
    2. Investment view with withdrawals and balance.
    3. Investment Balance.
    4. List of a person's investments.

# GAIN
  Every month, 0.52% is paid every month on the same day of investment creation.

# TAXATION
Taxation is for investment time:
  If you are less than a year old, the percentage will be 22.5%
  If it is between one and two years old, the percentage will be 18.5%.
  If it is more than two years old, the percentage will be 15%.

# DATABASE
  To save the data, mongoDB was used

# LANGUAGE
  Application written in NodeJS

# ARCHITECTURE
  __MSC__ - MODEL-SERVICE-CONTROLLER
  __REST__

# HOW TO USE THE API

  The API has 4 routes:
    POST: /investment - Create investments
    GET: /investment - Get all investments
    GET: /investment/:owner - Gets investments by user
    PUT: /investment/:owner - Update investments

## POST Route (/investment):
  In this route, 2 mandatory parameters ("amount", "owner") and 1 optional ("createdAt") are passed through the body.
    amount: Must be passed by body and must be a number.
    owner: Must be passed by "params" and must be a string.
    createdAt: Must be passed by the body and if the creation date is not passed, the date will be the day.

## GET Route (/investment):
  Simply take all investments.

## GET Route (/investment/:owner):
  Gets all the user investment data that should be passed in the URL (passed by params), but in a real situation it would be passed by Headers.

## Route PUT (/investment/:owner):
  This route is passed 2 mandatory parameters (value, owner) and 1 optional (pastMovementDate).
    owner: Must be passed in URL (passed by params), but in a real situation it would be passed by Headers.
    value: Must be passed by body and must be a number.
    pastMovementDate: This is the past date that can be passed or not. It must be ironed on the body.


# HEROKU DEPLOYMENT

<a href="https://backend-challenge-coderock.herokuapp.com/" target="_blank">App on Heroku</a>


# GITHUB REPOSITORY

<a href="https://github.com/thiagocristhianferreira/backend-test/tree/development" target="_blank">GitHub Repo</a>

