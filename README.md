# Acceloka Web Doccumentation
## **About**
This is the repository for the AccelokaAPI Web UI.

Initial Figma design: https://www.figma.com/design/lEnzUWysxihIJQMYilJZ2V/Acceloka-UI?node-id=0-1&t=JQghrkCXeaZvhZoY-1

This Web UI utilized modified component from Shadcn, Lucide react for the icon, and motion (framer motion) for the animation. 

## **Notes**
**THIS WEB UI IS ONLY COMPATIBLE WITH THE BACK END ON BRANCH "UIAdjustment"** Please make sure to adjust accordingly. There are a few changes to Database Structure (the addition of booking_price and booking_quantity column on bookings table) and a new endpoint for fetching booking list in branch "UIAdjustment". The current main branch of this repo will not be compatible with the main branch of Back End repository.

## **UI Screenshot**
### **Home Page**
<img width="1907" height="941" alt="image" src="https://github.com/user-attachments/assets/b4a7d101-7d30-4e77-8b5a-f7493d6da3f8" />
<img width="1900" height="942" alt="image" src="https://github.com/user-attachments/assets/055f0e77-244d-4888-aa01-00c8e7f51389" />
<img width="1889" height="165" alt="Screenshot 2026-03-03 111029" src="https://github.com/user-attachments/assets/87d1affb-d63e-4717-819a-6008723d1fef" />

### **Ticket Page**
The cart component here doesn't persist in Database (following the requirement). But, since the API endpoint for booking a ticket have a body that contains list of booked ticket model. a local cart component is used that is managed by states, after the user reload the screen / close the web, the cart will also be removed. This is done to ensure accurate usage of the API endpoint. Every state changes that trigger API endpoint fetch have been adjusted with debounce from react use-debounce library, so the fetch function will only be called after a designated delay of the state changes.
<img width="1903" height="937" alt="Screenshot 2026-03-03 111044" src="https://github.com/user-attachments/assets/a7e0841e-2a15-467f-b9f0-2f07187bda31" />
<img width="1916" height="939" alt="Screenshot 2026-03-03 111058" src="https://github.com/user-attachments/assets/dab432d6-0bbd-4dcc-9c9f-7809f1bd3553" />
<img width="583" height="519" alt="Screenshot 2026-03-03 111109" src="https://github.com/user-attachments/assets/6a8067f8-73e4-4fe8-a749-f0102e9ad062" />
<img width="583" height="268" alt="Screenshot 2026-03-03 111116" src="https://github.com/user-attachments/assets/a24bd4d1-5fbc-4e43-a043-6675641ad03d" />

### **Booking Page**
Revoke ticket menu and Edit ticket quantiy menu is using Dialog component instead of a new pages with the consideration that both menu doesnt have much information to be displayed, as such it's sufficient enough to put both inside a dialog. 
<img width="1918" height="946" alt="Screenshot 2026-03-03 111140" src="https://github.com/user-attachments/assets/7d7ea5a1-37b0-4a42-b297-a30b3beab4cb" />
<img width="575" height="494" alt="Screenshot 2026-03-03 111150" src="https://github.com/user-attachments/assets/3a19f1e8-23a6-4ad7-a6c2-36b2ae0bb642" />
<img width="256" height="240" alt="Screenshot 2026-03-03 111200" src="https://github.com/user-attachments/assets/d9ca81fc-d2e5-4789-8098-614a1d9ee15a" />
<img width="1918" height="936" alt="Screenshot 2026-03-03 111210" src="https://github.com/user-attachments/assets/cd036bcf-aad3-4a33-a750-1a1bee6fc1d8" />
<img width="1919" height="952" alt="image" src="https://github.com/user-attachments/assets/2a2fd06e-9b3b-4a8b-b88a-0d55f5439d49" />

