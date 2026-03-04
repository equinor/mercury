# Contributing Guide

Welcome! We are glad that you want to contribute to our project!

This project accepts contributions via GitHub pull requests.

This document outlines the process to help get your contribution accepted.

There are many ways to contribute:

* Suggest features
* Suggest changes
* Report bugs

Create an issue in the [issue tracker](https://github.com/equinor/mercury/issues/new/choose).

## Fork the repository

In general, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr).

Here's a quick guide:

1. Create your own fork of the repository
2. Clone the project to your machine
3. To keep track of the original repository add another remote named upstream

    ```shell
    git remote add upstream git@github.com:equinor/mercury.git
    ```

4. Create a branch locally with a succinct but descriptive name and prefixed with change type.

    ```shell
    git checkout -b feature/my-new-feature
    ```

5. Make the changes in the created branch.
6. Add and run tests for your changes (we only take pull requests with passing tests).
7. Add the changed files

    ```shell
    git add path/to/filename
    ```

8. Commit your changes using the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
formatting for the commit messages.

    ```shell
    git commit -m "conventional commit formatted message"
    ```

9. Before you send the pull request, be sure to rebase onto the upstream source.
This ensures your code is running on the latest available code.

    ```shell
    git fetch upstream
    git rebase upstream/main
    ```

10. Push to your fork.

    ```shell
    git push origin feature/my-new-feature
    ```

11. Submit a pull request to the original repository (via GitHub interface).
Please provide us with some explanation of why you made the changes you made.
For new features make sure to explain a standard use case to us.

That's it... Thank you for your contribution!

After your pull request is merged, you can safely delete your branch.

## Code review process

The core team looks at pull requests on a regular basis. After feedback has been given we expect
responses within three weeks. After three weeks we may close the pull request if it isn't showing any activity.
