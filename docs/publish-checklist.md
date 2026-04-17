# Publish Checklist

## 1. Pre-flight

- Confirm this is the public showcase repository.
- Confirm all customer data and runtime artifacts are excluded.

## 2. Security gate

- Run local secret scan:
  - `bash scripts/scan_public_repo.sh`
- Review all findings manually.

## 3. Content gate

- README is up to date.
- Architecture and API docs are up to date.
- Mock API starts successfully.

## 4. Git gate

- Use a fresh public repository history.
- Do not import private commit history.
- Verify no accidental binary dumps or backup files.

## 5. Final publish

- Push to public GitHub repo.
- Add short release notes.
- Pin repository links in profile.
