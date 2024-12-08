# CS-319-Project
# Bilkent University High School Tour Management System
## Group Members:
- Rida Fatima
- Emine Fidan
- Mert Özkaya
- Fazlı Güdül
- Ömer Yaslıtaş

## Users
- Coordinator
- Advisors
- Guides 
- Trainee
- High Schools (Counselors)
- Individuals

## Current Process
- School fills out the application form in Google Forms
- All applications are entered into an Excel sheet (only accessible by the coordinator and advisors)
- Tours are categorized by colors: red for rejected, yellow for pending, green for accepted
- Advisors accept the applications and make it green in the 1st Excel sheet
- Dilek Yıldız sends acceptance email to the high school
- Tour is transferred to the 2nd Excel sheet for guides to see
- Each advisor is assigned a day and are responsible for arranging tours for that day
- Guides confirm their participation through the 2nd Excel sheet. Guide can decide if they want to lead the tour. Schools are informed that the tour is only 2 hours long. If it's longer, guides have the right to leave after 2 hours. If no one selects a tour, the advisor is informed. If no one agrees to give a tour, advisors must give it. 
- Trainees training to become guides are booked for tours so that they can learn how to lead the tour. They are trained for 6 months.
- Q&A classrooms/conference rooms are booked manually by advisors for the tours.
- School comes to campus for tours

## Requirements for the new system:
### Application that the school fills out:
- Drop-down list of all high schools in Türkiye for them to choose from so that the collection of data is easier. High-ranking schools that often do tours and have high loyalty to Bilkent can be flagged for prioritization.
- Check-box for terms and conditions to ensure that tour participants follow the rules of Bilkent (Tanıtım office will share the text.)
- For each date and time slot, schools should be able to see how many accepted tours are coming to Bilkent so that they can choose a low-traffic day
- Starting times for tours are fixed. The available time slots are 09.00-11.00, 11.00-13.00, 13.00-15.00, and 16.00-18.00 time slots.
- They should not be allowed to select national holidays
- Duplicate applications should be caught
- Dates closer than 2 weeks should not be available to select as an option
- Conditions where no more tours should be accepted:
  - If 3-4 tours are already accepted for that time-slot 
  - Maximum number of participants are those that 6-8 guides can handle: approximately 360-480 people
 
### After filling the application:
- After the school fills out the application, the application should automatically be added to the system. It should be yellow initially. 
- The high school applications can wait 3 days to compare with other potential applications from other high schools.
- The automated system accepts or rejects the high-schools based on priority. 
- Priority-based selection of high schools:
  - High-ranking high schools
  - Loyalty to Bilkent 
  - Tours from other cities farther away 
  - First Come First Serve
  - e.g. Star school from Ankara gets preference over Maintenance school from farther away.
  - For all high schools that apply for a time slot on a specific day, evaluate the priority of the high schools as a percentage using an equation based on their distance to Bilkent and their ranking.
  - Choose the top 3-4 tour applicants and accept their tour. If there are 2 schools that have the same percentage (with a discrepancy of 5-10%), an email can be sent to the coordinator to manually accept one out of the two tours. 
- Accepted high-schools gets automated email of confirmation of tour 
  - Accepted tours are automatically transferred to a separate sheet where guides can view and claim the tours they would like to lead.
  - These tours should be uploaded to the excel sheet 2 weeks before the tour date.
  - 1 guide can lead up to 60 people. The amount of guides needed for each tour should be specified by the algorithm based on the number of people coming.
  - Accepted tours are categorized into colors: red for unassigned, yellow for assigned but not yet completed, and green for completed tours
  - If no guide selects a tour, then the guides will be emailed that there is an unconfirmed tour.
  - If still no guide selects the tour, then 3 days before the tour, the advisor will be notified that they have to complete the tour and their name will be entered into the sheet.
  - The data of high-schools that come for accepted tours and the guides that led those tours should be preserved.
  - 3 days before an accepted tour, confirmation from the counselor that they will definitely participate in the tour can be done by an automated survey via mail. The same can be done for individual students.

### Information page:
- There should be a page for information about the advisors assigned to each day of the week so guides know who contact when there is a problem with the tour
- Guides should have a table that includes a list of all active guides and their personal information

### Coordinator dashboard:
- Coordinator should be able to add or remove guides
- High school counselors and their contact information is constantly changing. It is necessary that the coordinator has access to their current contact information and is able to change it should the coordinators of a high school change.

### Puantaj Page:
- Separate Puantaj page needed which allows guides to log their work hours for tours, fairs, etc. 
- They should have to write the time duration of the tour, and the high school name. 

### Individual tours: 
- There should be a separate application page for the individual tours. 
- Information asked from the participants:
  - Number of people joining and their names
  - Their major of interest so that appropriate guides can be assigned

---

## Additional features that may be added:
- The algorithm should have the schedule of all guides and check who's available for each tour. The guides would only be shown the tours during which their schedule is empty.
- Check classrooms/conference room availability for Q&A sessions. 

### Puantaj page:
- Instead of the guides having to manually write the work hours and high school name, they should be able to select the tour they led from a list of tours completed over the past week. That should automatically log in their work hours and information about the high school that came for the tour.
- OR Completed tours will automatically be added to the Puantaj page of the guides that completed it so that they don’t have to manually enter the hours worked on tours. 
- They should have the option to log any additional work hours they completed for the Tanıtım Office along with the description of the work. There can be a drop-down list of the types of other work done by the guides so that they can just choose from the list instead of writing it down. 
- Guides will have points in order to find out who is the best guide and who is the worst guide. It can be open for only Coordinators and above.

### Trainees:
- There may be an automated system to record the trainees’ training process and automatically inform the advisor when 6 months have passed.
- It is very expensive to visit high schools, and there are limited qualified human resources to explain what Bilkent is. Planning online meetings that will be done in conference halls of high schools can help. Online meeting time arrangement can be handled on our app. (We should ask if online meetings are useful)

### Surveys:
- Survey for participants of the tours: How likely are they to choose Bilkent for their undergraduate education (Integer point selection), which departments were preferred by the visitors the most (Multiple choice option), confidence about scholarships (Integer point selection), etc. We could represent this data as figures for the coordinator to see and analyze. 
- Satisfaction survey for students regarding tours and request for ideas of improvements, holding this data on our app.

