# Deploying Frontend to Heroku

## Prerequisites
- Heroku account
- Heroku CLI installed
- Backend deployed to Heroku (you'll need the backend URL)

## Steps

1. **Login to Heroku:**
   ```bash
   heroku login
   ```

2. **Create Heroku app:**
   ```bash
   heroku create your-app-name-frontend
   ```

3. **Set buildpack:**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

4. **Set environment variable (Backend URL):**
   ```bash
   heroku config:set REACT_APP_API_URL=https://your-app-name-backend.herokuapp.com
   ```
   Replace `your-app-name-backend` with your actual backend Heroku app name.

5. **Deploy:**
   ```bash
   git push heroku main
   ```

6. **Check logs:**
   ```bash
   heroku logs --tail
   ```

## Your frontend URL will be:
`https://your-app-name-frontend.herokuapp.com`

## Important Notes:
- Make sure to update `REACT_APP_API_URL` with your actual backend Heroku URL
- The frontend will automatically build when you push to Heroku
- CORS is already configured in the backend to allow requests from any origin

