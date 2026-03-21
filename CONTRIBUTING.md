# Ghid de Contribuție la Proiect

Acest document explică modul în care colaborăm, regulile pentru Git și standardele de cod pentru a menține proiectul curat și funcțional.

## 1. Reguli de Bază (GitHub Flow)
* **Ramura `main` este sacră:** Aici stă doar codul stabil. Este strict interzis să dăm `push` direct pe `main`.
* Orice modificare (funcționalitate nouă, reparare de eroare) se face pe o ramură separată.
* Codul ajunge în `main` exclusiv prin **Pull Request (PR)**, care trebuie aprobat de cel puțin un coleg.

## 2. Cum denumim ramurile (Branches)
Folosim următoarele prefixe pentru a ști exact la ce se lucrează:
* `feature/nume-scurt` -> Pentru componente sau funcționalități noi (ex: `feature/outfit-ai`).
* `bugfix/nume-eroare` -> Pentru repararea problemelor (ex: `bugfix/buton-inactiv`).
* `refactor/nume-modificare` -> Pentru îmbunătățirea codului existent fără a schimba funcționalitatea.

## 3. Scripturi și Comenzi Git de zi cu zi

### Începerea lucrului la o funcționalitate nouă
Asigură-te mereu că pleci de la ultima versiune de `main`:
```bash
git checkout main
git pull origin main
git checkout -b feature/numele-ramurii-tale




git add .
git commit -m "Mesaj clar despre ce ai modificat"
# La primul push pe o ramură nouă:
git push -u origin feature/numele-ramurii-tale
# Ulterior, e de ajuns doar:
git push


git fetch origin
git merge origin/main