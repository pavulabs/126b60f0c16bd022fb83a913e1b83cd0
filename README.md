# Pavu beta website

This repository hosts a separate preview of the Pavu Labs website at [pavu.cn/126b60f0c16bd022fb83a913e1b83cd0/](https://pavu.cn/126b60f0c16bd022fb83a913e1b83cd0/). The production site is [pavu.cn](https://pavu.cn/) and is published from [`pavulabs.github.io`](https://github.com/pavulabs/pavulabs.github.io). Changes in this beta repository never deploy to the production site.

The beta site is public and marked `noindex`. Its Pages workflow publishes `main` automatically so site changes can be reviewed in a browser. The production repository has auto-merge disabled, requires an owner publication approval status on PRs, and requires `caiwl` to approve production deployment.

The product-phase label remains **Private beta** / **内测阶段**. The separate beta website is a place to review site changes; it does not change the product's release status.

To stage a proposed production change, copy the static files from its candidate branch into this repository, run `node --check app.js && node scripts/validate-site.mjs`, and push to the beta `main` branch. Review the beta site before separately approving a production PR. The beta banner, `noindex` metadata, and beta page title should remain in this repository only.
