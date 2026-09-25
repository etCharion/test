# Knihovnička App 📚

Aplikace pro správu knihovny a skenování čárových kódů / ISBN.

## Nasazení na GitHub Pages (GitHub Pages Deployment)

Pokud se na GitHub Pages zobrazovala bílá stránka, bylo to způsobeno tím, že GitHub Pages servíroval nezkompilovaný kód z kořenové složky, zatímco aplikace vyžaduje sestavení (build) pomocí Vite.

Pro správné fungování aplikace na GitHub Pages máte dvě možnosti:

---

### Možnost 1: Automatické nasazení pomocí GitHub Actions (Doporučeno)

1. V repositáři na GitHubu přejděte do **Settings** -> **Pages**.
2. V sekci **Build and deployment** vyberte **Source**: `GitHub Actions`.
3. Při každém `push` do hlavní věve (`main`) se automaticky spustí GitHub Action (`.github/workflows/deploy.yml`), která aplikaci sestaví (`npm run build`) a publikuje na GitHub Pages.

---

### Možnost 2: Ruční nasazení příkazem `npm run deploy`

Pokud nepoužíváte GitHub Actions:

1. Spusťte v terminálu příkaz:
   ```bash
   npm run deploy
   ```
   Tento příkaz automaticky sestaví projekt (`npm run build`) a nahraje složku `dist` do věve `gh-pages`.

2. V repositáři na GitHubu přejděte do **Settings** -> **Pages**.
3. V sekci **Build and deployment** vyberte **Source**: `Deploy from a branch`.
4. Vyberte větev `gh-pages` a složku `/ (root)` a uložte (**Save**).

---

## Lokální spuštění (Local Development)

1. **Instalace závislostí:**
   ```bash
   npm install
   ```

2. **Spuštění vývojového serveru:**
   ```bash
   npm run dev
   ```
   * Klient běží na `http://localhost:3000`
   * Backend server běží na `http://localhost:3001`

3. **Sestavení projektu (Build):**
   ```bash
   npm run build
   ```

4. **Spuštění testů:**
   ```bash
   npm test
   ```
