# We Are The Champions

This is the solo project for the Pro version of Scrimba's "Build A Mobile App With Firebase" course. The goal is to build it from scratch using the design from a Figma file as a reference. It makes use of a Firebase Realtime Database to store information and update in realtime as changes are made.

I built out the app as presented in the Figma design and then moved on to the stretch goals. The following functionality was added:

- Add From input field
- Add To input field
- Reverse the order of the entries
- Add likes

My implementation of the "likes" feature differs from what we learned at Scrimba. In previous Scrimba projects, "likes" and other data were stored in localStorage, on the user's browser. I didn't want the number of likes to be local. I wanted it to be global, for all users, regardless of where they accessed the app from. To solve this, I did two things:

- I added a unique user ID, which is local to the visitor/browser
- This ID is added to a "likedBy" array in the Firebase database for the given endorsement

This approach lets visitors like/unlike endorsements and tracks them in the cloud using Firebase, so "likes" are not just local to the computer and behave like they would for other cloud-enabled applications.

Deployed at: https://vish213-champions.netlify.app/