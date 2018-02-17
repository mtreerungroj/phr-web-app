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
- [x] show snackbar message when login failed

### Server
- [x] create `pin_code` table: store userid, pin_code
- [x] create `patient_code` table: store userid, patient_code
- [x] create REST API provide unique generated PIN code
- [x] create REST API provide unique generated patient code
- [x] can store data in Thai language: Profile
- [x] create new tables: patient_code, pin_code
- [x] can clear all data in table: drop table and create a new one

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
- [x] show profile data
- [x] can search for patient

### [patient] Dashboard
- [ ] show profile data
- [ ] show activities result summary

### [staff] Profile
- [x] show all profile data
- [x] form for editing their profile data
- [x] user can change (upload) profile picture: input type='file'
- [x] upload profile picture file to Firebase storage
- [x] update edited profile data to database
- [x] show Snackbar if update profile successfully

### [patient] Profile
- [x] show all profile data: personal information
- [x] show all profile data: medical information
- [x] form for editing profile data: only personal information
- [x] user can edit only their personal information data
- [x] user can change (upload) profile picture
- [x] upload profile picture file to Firebase storage
- [x] update edited profile data to database
- [x] show Snackbar if update profile successfully

### [staff] Search Patients (authorization)
- [x] get all patients list with basic data from server
- [x] show all patients: patient_code, gender, firstname, lastname, admit_date
- [x] can filter patients by patient_code, firstname, lastname
- [x] can view profile data of selected patient
- [x] *can edit all profile data of selected patient*
- [x] show Snackbar if update profile successfully
- [x] *have authorization to access all patient data (profile data and activities result summary)*
- [x] show date format as DD/MM/YYYY

### [staff] Report
#### Pie Chart
- [x] show user's activity result in pie chart: number of patients in each level
- [x] show more details: who're in each level: firstname, lastname
#### Line Chart
- [ ] show patient's activity result compare to other patients in line chart: : `x-axis = day (1,2,3,...)`, `y-axis = level`
- [ ] can select patient to show in chart

### [patient] Report
- [x] show patient's activity result in line chart: default is `x-axis = date`, `y-axis = level`
- [x] if not pass screening test, show level 0
- [x] data point color: green = pass screening test, red = not pass screening test
- [ ] click at data point to show more information: full result
- [x] hover on data point to show tooltip information: cannot customize chart
- [ ] can choose range of date to show data

### Bugs/Others
- [ ] render `InAccessible` page only if path is not match
- [x] redirect to '/' when log out
- [x] check DatePicker value
- [x] refactor PatientInformation component
- [x] initialize admit_date to the day that make a registration and not change when update profile
- [x] is surgery data still need? // NO...
- [ ] Warning when editting my empty profile:
```
A component is changing an uncontrolled input of type text to be controlled.
Input elements should not switch from uncontrolled to controlled (or vice versa).
Decide between using a controlled or uncontrolled input element for the lifetime of the component.
More info: https://fb.me/react-controlled-components
```
