Firebase Rules
```js
	rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
	match /users/{userId} {
  allow read, write: if request.auth != null && (
        request.auth.uid == userId || 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)))
        );
        }
      
  match /events/{eventId} {
      allow read;
      
      // Only admin users can create events
      allow create: if request.auth != null &&
      exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role != null &&
    	get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';

      // Only admin users can delete events
      allow delete: if request.auth != null &&
      exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role != null &&
    	get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';

      // Admins can update the entire event, and non-admin users can only update the 'signedUp' field to join the event
			allow update: if request.auth != null &&
    	(
      // Admins can update anything
      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      ||
      // Non-admins can only update the 'signedUp' field
      request.resource.data.diff(resource.data).affectedKeys().hasOnly(['signedUp']) &&
      request.resource.data.signedUp != null &&
      resource.data.signedUp != null &&
      request.resource.data.signedUp.size() > resource.data.signedUp.size()
    	);

    }
}
}
```