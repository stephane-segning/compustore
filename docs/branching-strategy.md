# Branching Strategy

## Branch types

1. **Main Branch (Main/Production)**

   - Contains stable, release-ready code. Only merges from the `release` branch should go directly into `main`.
   - Protected branch requiring approvals and automated checks.

2. **Development Branch (Develop)**

   - Integration branch where all feature branches merge before deployment to staging.
   - Used for continuous testing and quality assurance.

3. **Feature Branches (`feature/[feature-name]`)**

   - Created for each specific feature or enhancement (e.g., `feature/product-listing`, `feature/user-authentication`).
   - Feature branches should be short-lived and merged back to `develop` upon completion.

4. **Release Branches (`release/[release-version]`)**

   - Created when preparing for a release cycle, typically from the `develop` branch.
   - Allows final bug fixes and quality checks before merging into `main`.
   - After release, merge back to both `main` and `develop`.

5. **Hotfix Branches (`hotfix/[issue-id]`)**
   - Used to address urgent issues or bugs found in production.
   - Branched from `main` and merged back to both `main` and `develop` once resolved.
