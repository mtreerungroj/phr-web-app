# Web Application for Personal Heart Record System 
PHR Web App aims to provide user a way to view summary of their activities, also be only a way for registration both doctor, nurse and patient.

## to run this project
note: the server this web app connected to is on [PHRstorage](https://github.com/mtreerungroj/PHRstorage)
- clone this project
```
git clone https://github.com/mtreerungroj/phr-web-app.git
```
- install necessary dependencies
```
npm install
```
- run localhost
```
npm start
```

# Todo
### Authentication
- [x] login form
- [x] user can log in using email/password
- [x] user can log out
- [x] show different page for different user role: staff (doctor/nurse) and patient
- [ ] user can reset password

### server
- [ ] create `pincode` table to store PIN codes
- [ ] create REST API provide unique generated PIN code
- [ ] store paired userid and PIN code to database

### [staff] Registration
- [x] registration form step1: email/password
- [x] registration form step2: profile data
- [x] create new account to Firebase Authentication (resolve userid)
- [x] update user profile data to database via REST API
- [ ] retrieve unique generated PIN code from server

### [patient] Registration
- [ ] registration form step1: email/password
- [ ] registration form step2,3,4,... : profile data (design each step)
- [ ] create new account to Firebase Authentication (resolve userid)
- [ ] update user profile data to database via REST API

### [staff] dashboard
- [ ] show profile data
- [ ] form for editing profile data
- [ ] update edited profile data to datebase
- [ ] can search for patient
- [ ] have authorization to access all patient data (profile data and activities result summary)

### [patient] dashboard
- [ ] show profile data
- [ ] form for editing profile data
- [ ] update edited profile data to datebase
- [ ] show activities result summary
