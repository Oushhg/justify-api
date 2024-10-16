# API de Justification de Texte

## Description

Cette API permet de justifier un texte en respectant une largeur de ligne de 80 caractères. Elle inclut une authentification par token et une limitation de débit de 80 000 mots par jour par token.

## Endpoints

### 1. Générer un Token

**URL :** `/api/token`  
**Méthode :** `POST`  
**Content-Type :** `application/json`  

**Corps de la requête :**
```json
{
  "email": "foo@bar.com"
}
