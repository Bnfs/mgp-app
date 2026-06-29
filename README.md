# 🎓 Calculateur de MGP

Application web permettant à un étudiant de **calculer sa MGP** (Moyenne Générale Pondérée, système LMD), d'obtenir sa note **sur 4** et **sur 20**, et de **sauvegarder ses matières dans un compte personnel** accessible à chaque connexion.

- **Frontend** : React (Vite) + Bootstrap
- **Comptes & connexion** : Supabase Auth (email / mot de passe)
- **Base de données** : Supabase (PostgreSQL)
- **Déploiement** : Netlify

---

## 1. Installation locale

```bash
npm install
```

## 2. Configurer Supabase (gratuit)

1. Crée un compte sur **https://supabase.com** puis un **nouveau projet**.
2. Dans le menu **SQL Editor → New query**, colle le contenu du fichier
   [`supabase_schema.sql`](./supabase_schema.sql) et clique sur **Run**.
   (Cela crée la table `matieres` et la sécurité par utilisateur.)
3. Va dans **Project Settings → API** et récupère :
   - **Project URL**
   - **anon public key**
4. À la racine du projet, copie `.env.example` en `.env` et remplis :

```env
VITE_SUPABASE_URL=https://tonprojet.supabase.co
VITE_SUPABASE_ANON_KEY=ta_cle_anon
```

> 💡 **Astuce confirmation email** : par défaut Supabase envoie un email de
> confirmation à l'inscription. Pour tester plus vite, va dans
> **Authentication → Providers → Email** et désactive *"Confirm email"*.

## 3. Lancer en local

```bash
npm run dev
```

Ouvre l'adresse affichée (par défaut http://localhost:5173).

---

## 4. Déployer sur Netlify

1. Pousse ce dossier sur un dépôt **GitHub**.
2. Sur **https://netlify.com** → **Add new site → Import an existing project**,
   choisis ton dépôt.
3. Netlify détecte la config via `netlify.toml` :
   - Build command : `npm run build`
   - Publish directory : `dist`
4. Dans **Site settings → Environment variables**, ajoute :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Déploie. 🚀

> ⚠️ Dans Supabase, ajoute l'URL Netlify dans
> **Authentication → URL Configuration → Site URL / Redirect URLs**.

---

## 5. Le barème (note /100 → points /4)

| Note /100 | Grade | Points | Mention |
|-----------|-------|--------|---------|
| 80 et + | A+ | 4.00 | Excellent |
| 75–79 | A- | 3.70 | Très Bien |
| 70–74 | B+ | 3.30 | Bien |
| 65–69 | B | 3.00 | Assez Bien |
| 60–64 | B- | 2.70 | Assez Bien |
| 55–59 | C+ | 2.30 | Passable |
| 50–54 | C | 2.00 | Passable |
| 45–49 | C- | 1.70 | CANT |
| 40–44 | D+ | 1.30 | CANT |
| 34–39 | D- | 1.00 | CANT |
| 30–33 | E | 0.00 | Échec |
| 0–29 | F | 0.00 | Échec |

**Formules :**
- `MGP /4 = Σ(crédit × points) / Σ(crédits)`
- `MGP /20 = MGP/4 × 5`
- `Moyenne /20 = (moyenne pondérée des notes /100) / 5`

> Pour modifier le barème, édite le tableau `BAREME` dans
> [`src/bareme.js`](./src/bareme.js).

---

## Structure du projet

```
mgp-app/
├─ src/
│  ├─ bareme.js              # barème + calcul de la MGP
│  ├─ supabaseClient.js      # connexion Supabase
│  ├─ context/AuthContext.jsx# gestion de la connexion
│  ├─ components/            # Navbar, ResultatCard, ProtectedRoute
│  └─ pages/                 # Login, Register, Dashboard
├─ supabase_schema.sql       # à exécuter dans Supabase
├─ netlify.toml              # config de déploiement
└─ .env.example
```
