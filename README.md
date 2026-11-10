# Lemny Case — site de prezentare

Site static (HTML/CSS/JS) pentru case prefabricate în România. Limbi: **RO** (default), **DE**, **EN**.

## Structură

```
index.html
css/styles.css
js/i18n.js
js/main.js
assets/images/
README.md
```

## Upload pe cPanel

1. Comprimă tot conținutul acestui folder (sau urcă fișierele direct).
2. În cPanel → **File Manager** → deschide `public_html` (sau subdomeniul/folderul site-ului).
3. Uploadează `index.html`, `css/`, `js/`, `assets/`.
4. Deschide domeniul în browser — site-ul trebuie să apară imediat.

Nu e nevoie de Node, npm sau build.

## Ce să completezi tu

În `js/i18n.js`, înlocuiește placeholder-urile:

- `contact.phoneValue` — telefonul real (RO / DE / EN)
- `contact.locationValue` — județul / orașul
- `contact.emailValue` — dacă folosești alt email decât `contact@lemnycase.ro`

Actualizează și `mailto:` din `index.html` / `js/main.js` dacă schimbi emailul.

## Limbi

Switcher-ul RO / DE / EN salvează alegerea în `localStorage` (`lemny-lang`).
