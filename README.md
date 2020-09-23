A website for Competitive Coders.
### Getting Started
You need to install Mongodb To use The Backend Features on localhost.
#### Configuration:
Create a .env file in root with following Variables
```bash
NODE_ENV=production
DATABASE=mongodb://127.0.0.1:27017/codestat
# JWT Secret
SECRET=
# Push Notifications
publicKey = 
privateKey = 
# MailServer Credentials
EMAIL_SECRET=
GMAIL_USER=example@gmail.com
REFRESH_TOKEN=
ACCESS_TOKEN=
CLIENT_ID=
CLIENT_SECRET=
```
#### Install Dependencies:  
```bash
npm install
```
#### Run the Development Website:  
```bash
# For Windows
npm run dev
# For Linux
npm run dev-lnx
```
#### Run Production Website:  
```bash
# Build Nextjs
npm run build
# Run Server
npm start
```
#### Running Only Frontend:  
```bash
# Developement
npm run front-dev

# Production
npm run build
npm run front
```
Open [http://localhost:8000]() with your browser to see the result.  
##### Contributors
[Ajay](https://github.com/ajaykpv), [Riswana](https://github.com/Riswanatr), [Navaneeth](https://github.com/navaneethmanoj)