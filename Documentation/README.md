# Documentation

The Purpose of this document is to serve as the central point of requirerments and technical structure of the application Gude Foods.
This is a living document and will be updated as the application changes.

## Table of Contents

- [Documentation](#gude-foods)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Mock-up Designs](#mock-up-designs)
  - [Technical Structure](#technical-structure)
    - [System Architecture](#system-architecture)
    - [Technical Structure](#technical-structure)
    - [API](#api)
    - [Heroku](#heroku)

## Requirements

This application is to serve as a personal collection of food recipies that is also shareable to friends and strangers.

- Recipies
  - The user must be able to enter a recipe
  - A recipe must contain ingredients and procedure
  - A recipe should include other various information including but not limited to preperation time, servings produced, appliances needed, diatary attributes
  - The user must be able to access previously entered recipies across different visits to the application.
  - The user shall be able to share recipies with particular users or the public.
  - The user shall be able to revoke shared recipies to other users.
  - The may view recipies based upon theirs, shared, or public, as well as attributes of the recipies.
  - Recipie may be based off of someone else's, but keep the original creator.
  - Users may be able to give a sigular rating on a recipie, and change their rating in the future.
  - Recipies must be able to be deleted.
- Profile
  - Users must make an account through Google login to make an account.
  - Only users who are logged in shall be able to create recipies.
  - Users shall be able to change their username.
  - Users shall be able to delete their account.

## Mock-up Designs

See [this folder](/Documentation/Mock-up-Designs/) for the images of designs.

## Technical Structure

### System Architecture

### API

See [this file](/Documentation/API.json) documentation about the API.

### Heroku

These steps are to recreate a Heroku pipeline to deploy production, qa, and development version of the application.

- Sign up for a [Heroku account](http://heroku.com "Heroku Homepage") if you do not have one already
- Create a new pipeline
- Add an app in the production area
- Under Deploy, connect to GitHub and select the repo, and master branch
- Under project settings - Configure Dynos - Ensure it recognizes the `Procfile` by displaying `web node src/server.js` is ON
- In the Review area, add 2 review apps selecting qa and dev branches
- Use the Heroku CLI to add a custom buildpack
  - Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install "Heroku CLI Installation Guide") if you do not already have it
  - Login in to your Heroku account from the CLI and run these commands
  - `heroku labs:enable runtime-dyno-metadata -a your-app-name`
  - `heroku buildpacks:add https://github.com/ianpurvis/heroku-buildpack-version -a your-app-name`
- Configure custom domains for each app and supply the DNS target to your DNS provider.
