# 📝 BlogAPI

BlogAPI è una semplice applicazione blog full-stack costruita con **ASP.NET Core 8**, **Entity Framework Core** e **Angular**.  
Permette agli utenti di autenticarsi, creare post, commentare e visualizzare contenuti in un'interfaccia moderna e reattiva.

---

## 🚀 Funzionalità principali

- ✅ CRUD completo per **post** e **commenti**
- ✅ **Autenticazione JWT** per proteggere le API
- ✅ **Database In-Memory** (o SQLite opzionale)
- ✅ **Swagger UI** per testare le API
- ✅ **CORS abilitato** per comunicazione frontend-backend
- ✅ **Dependency Injection** per i servizi
- ✅ Test automatici con **xUnit** e **EF Core InMemory**
- ✅ UI moderna in **Angular** con gestione dello stato utente

---

## 🧰 Tecnologie utilizzate

### Backend:
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- JWT Bearer Authentication
- Swagger (Swashbuckle)
- xUnit

### Frontend:
- Angular 18
- Angular Material (opzionale)
- Form validation, Routing, AuthGuard
- Chiamate HTTP con `HttpClient`

---

## 🏗️ Architettura

- `/Controllers` → API RESTful
- `/Services` → Logica di business separata
- `/Models` → Entità EF Core
- `/Data` → `BlogContext.cs` con InMemory DB
- `/Tests` → Test automatici per i servizi

---

## 🔐 Autenticazione

1. L'utente effettua il login via `/api/auth/login`
2. Viene restituito un **JWT token**
3. Il token viene inviato in `Authorization: Bearer <token>` nelle richieste protette
4. Le route protette richiedono `[Authorize]`

---

## ▶️ Come eseguire il progetto

### Backend (API):

```bash
cd BlogAPI
dotnet restore
dotnet run
