# Web Application for Personal Heart Record System 
PHR Web App aims to provide user a way to view summary of their activities, also be only a way for registration both doctor, nurse and patient.

## To run this project
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
- [ ] use stepper showing current step

### Server
- [x] create `pin_code` table: store userid, pin_code
- [x] create `patient_code` table: store userid, patient_code
- [x] create REST API provide unique generated PIN code
- [x] create REST API provide unique generated patient code
- [ ] can store data in Thai language

### [staff] Registration
- [x] registration form step1: email/password
- [x] registration form step2: profile data
- [x] create new account to Firebase Authentication (resolve userid)
- [x] update user profile data to database via REST API
- [x] retrieve unique generated PIN code from server
- [x] store pin_code to database
- [x] store paired userid and PIN code to `pin_code` table

### [patient] Registration
- [x] registration form step1: email/password
- [x] registration form step2,3,4,... : profile data (design each step)
- [x] create new account to Firebase Authentication (resolve userid)
- [x] update user profile data to database via REST API
- [x] store patient_code to database
- [x] store paired userid and patient code to `patient_code` table

### [staff] Dashboard
- [ ] show profile data
- [ ] update edited profile data to datebase
- [ ] can search for patient
- [ ] can view profile data of patient
- [ ] can edit medical information of selected patient
- [ ] have authorization to access all patient data (profile data and activities result summary)

### [patient] Dashboard
- [ ] show profile data
- [ ] form for editing profile data
- [ ] update edited profile data to datebase
- [ ] show activities result summary

### [staff] Profile
- [ ] show all profile data
- [ ] form for editing their profile data
- [ ] update profile data to database

### [patient] Profile
- [ ] show all profile data: personal information, medical information
- [ ] user can edit only their personal information data

### Bugs
- [ ] render `InAccessible` page only if path is not match
- [ ] redirect to '/' when log out
