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
- [x] can store data in Thai language: Profile
- [x] create new tables: patient_code, pin_code

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
- [ ] can search for patient

### [staff] Search Patients (authorization)
- [x] get all patients list with basic data from server
- [ ] show all patients: patient_code, gender, firstname, lastname, admit_date
- [ ] can view profile data of selected patient
- [ ] *can edit all profile data of selected patient*

- [ ] *have authorization to access all patient data (profile data and activities result summary)*

### [patient] Dashboard
- [ ] show profile data
- [ ] show activities result summary

### [staff] Profile
- [x] show all profile data
- [x] form for editing their profile data
- [ ] user can change (upload) profile picture
- [ ] upload profile picture file to Firebase storage
- [x] update edited profile data to database

### [patient] Profile
- [x] show all profile data: personal information
- [x] show all profile data: medical information
- [x] form for editing profile data: only personal information
- [x] user can edit only their personal information data
- [ ] user can change (upload) profile picture
- [ ] upload profile picture file to Firebase storage
- [x] update edited profile data to database

### Bugs
- [ ] render `InAccessible` page only if path is not match
- [x] redirect to '/' when log out
- [x] check DatePicker value
