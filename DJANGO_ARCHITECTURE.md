# 🏗️ Django Backend Architecture - How It Works

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                            │
│  (Contact Form on index.html)                               │
└──────────────────────┬──────────────────────────────────────┘
                       │ User submits form
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                 JAVASCRIPT (Frontend)                        │
│  - Validates form inputs                                    │
│  - Sends POST to /api/contact/submit/                       │
│  - Handles response (success/error)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │ JSON data
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              DJANGO REST API (Backend)                       │
│  /api/contact/submit/  [POST]                               │
│                                                              │
│  Views (contact/views.py):                                  │
│  ├─ Validates form data                                     │
│  ├─ Saves to database                                       │
│  ├─ Sends email to admin                                    │
│  └─ Sends confirmation to user                              │
└──────────────────────┬──────────────────────────────────────┘
                       │ success response
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE                                  │
│  (SQLite - db.sqlite3)                                      │
│                                                              │
│  Table: contact_contactmessage                              │
│  ├─ id                                                       │
│  ├─ name                                                     │
│  ├─ email                                                    │
│  ├─ subject                                                  │
│  ├─ message                                                  │
│  ├─ created_at                                              │
│  ├─ ip_address                                              │
│  └─ is_read                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
User fills form
    ↓
Clicks "Send Message"
    ↓
JavaScript validates
    ↓
POST /api/contact/submit/
    ↓
Django receives request
    ↓
Creates ContactMessage object
    ↓
Saves to database (db.sqlite3)
    ↓
Sends email #1 (to admin)
  └─ To: timsinapranisha@gmail.com
  └─ Contains: Full message + timestamp + IP
    ↓
Sends email #2 (to user)
  └─ To: user's email (from form)
  └─ Contains: Thank you message
    ↓
Returns JSON response
    ↓
JavaScript shows success message
    ↓
Form clears
    ↓
Done! ✓
```

---

## File Structure & Purpose

```
project/
│
├── Frontend
│   ├── index.html
│   │   └─ Updated with /api/contact/submit/ endpoint
│   │   └─ JavaScript handles form submission
│   │   └─ Shows success/error messages
│   ├── styles.css
│   │   └─ Added form message styling
│   └── animations.js
│       └─ Existing animations
│
├── Django Configuration (config/)
│   ├── settings.py
│   │   ├─ Django apps configuration
│   │   ├─ Email settings
│   │   ├─ Database settings
│   │   ├─ CORS settings
│   │   └─ REST Framework settings
│   │
│   ├── urls.py
│   │   ├─ /admin/ → Django admin
│   │   ├─ /api/contact/ → Contact app URLs
│   │   └─ / → Serves index.html
│   │
│   └── wsgi.py
│       └─ WSGI configuration for deployment
│
├── Contact App (contact/)
│   ├── models.py
│   │   └─ ContactMessage model
│   │      ├─ name, email, subject, message
│   │      ├─ created_at, ip_address
│   │      └─ is_read flag
│   │
│   ├── views.py
│   │   ├─ submit_contact_form()
│   │   │   ├─ Receives POST data
│   │   │   ├─ Validates input
│   │   │   ├─ Saves to database
│   │   │   ├─ Sends email to admin
│   │   │   ├─ Sends confirmation to user
│   │   │   └─ Returns JSON response
│   │   └─ contact_messages_list()
│   │       └─ Admin endpoint to view messages
│   │
│   ├── serializers.py
│   │   └─ ContactMessageSerializer
│   │       └─ Validates form data
│   │
│   ├── urls.py
│   │   ├─ POST /api/contact/submit/
│   │   └─ GET /api/contact/messages/
│   │
│   ├── admin.py
│   │   └─ Admin interface for messages
│   │
│   └── apps.py
│       └─ App configuration
│
├── Configuration Files
│   ├── manage.py
│   │   └─ Django management commands
│   │
│   ├── requirements.txt
│   │   └─ Python dependencies
│   │
│   ├── .env
│   │   ├─ EMAIL_HOST_USER
│   │   ├─ EMAIL_HOST_PASSWORD
│   │   ├─ CONTACT_EMAIL
│   │   └─ Other settings
│   │
│   ├── .env.template
│   │   └─ Template for .env
│   │
│   └── db.sqlite3
│       └─ SQLite database (auto-created)
│
└── Documentation
    ├── DJANGO_QUICK_START.md
    │   └─ 5-minute setup guide
    ├── DJANGO_SETUP.md
    │   └─ Complete setup instructions
    └── DJANGO_ARCHITECTURE.md (this file)
        └─ How everything works
```

---

## HTTP Request/Response Flow

### 1. User Submits Form

**Request:**
```
POST /api/contact/submit/
Content-Type: application/json
X-CSRFToken: [csrf-token]

{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Yoga Classes",
    "message": "I'm interested in your yoga classes"
}
```

### 2. Server Processes

```
Django receives POST
    ↓
Validates CSRF token
    ↓
Deserializes JSON using ContactMessageSerializer
    ↓
Validates required fields
    ↓
Saves to database (ContactMessage model)
    ↓
Sends two emails
    ↓
Returns response
```

### 3. Success Response

```
HTTP/1.1 201 Created
Content-Type: application/json

{
    "success": true,
    "message": "Your message has been sent successfully!",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Yoga Classes",
        "message": "I'm interested in your yoga classes",
        "created_at": "2026-02-06T10:30:00Z"
    }
}
```

### 4. Frontend Handles Response

```
JavaScript receives response
    ↓
status === 201? (success)
    ├─ Yes → Show success message
    │        Reset form
    │        Auto-hide message after 5 seconds
    └─ No → Show error message
```

---

## Email Flow

### Email #1: Admin Notification

```
To: timsinapranisha@gmail.com
From: your-email@gmail.com
Subject: New Contact Form Submission: [subject]

Body:
New message from: John Doe
Email: john@example.com
Subject: Yoga Classes

Message:
I'm interested in your yoga classes

---
IP Address: 192.168.1.1
Submitted at: 2026-02-06 10:30:00
```

### Email #2: User Confirmation

```
To: john@example.com
From: your-email@gmail.com
Subject: Thank you for contacting Giri Raj Timshina

Body:
Dear John Doe,

Thank you for reaching out! I have received your message 
and will get back to you as soon as possible.

Best regards,
Giri Raj Timshina
```

---

## Database Structure

### ContactMessage Table

```sql
CREATE TABLE contact_contactmessage (
    id INTEGER PRIMARY KEY AUTO INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(254) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME AUTO_NOW_ADD,
    ip_address CHAR(45),
    is_read BOOLEAN DEFAULT FALSE
);

Indexes:
- PRIMARY KEY: id
- FOREIGN KEY: None (standalone)
- INDEX: created_at (for sorting by date)
```

---

## API Endpoints

### 1. Submit Contact Form

```
POST /api/contact/submit/

Purpose: Submit a contact form message
Authentication: None required (CSRF token required)
Returns: 201 Created on success, 400 Bad Request on error
```

### 2. List All Messages (Admin Only)

```
GET /api/contact/messages/

Purpose: Get all contact messages
Authentication: Should be admin only (optional)
Returns: Array of ContactMessage objects
```

---

## Security Features

### CSRF Protection
- Django automatically generates CSRF token
- JavaScript retrieves from cookies
- Sent with every POST request

### Input Validation
- All fields required
- Email format validated
- Message content sanitized

### CORS Support
- Configured for localhost and production domains
- Prevents unauthorized cross-origin requests

### Email Security
- App-specific password for Gmail (not full password)
- Email credentials in .env (never in code)
- No sensitive data in responses

---

## How Emails Are Sent

```
Django Core Mail Backend
    ↓
Connects to SMTP server (Gmail)
    ↓
Authenticates with email + password
    ↓
Creates MIME email with headers
    ↓
Sends via SMTP on port 587 with TLS
    ↓
SMTP returns confirmation
    ↓
Django confirms success
```

---

## Admin Interface

Access at: http://localhost:8000/admin

### View Messages
- List all contact submissions
- Search by name, email, subject
- Filter by date and read status
- Mark messages as read

### Message Details
- View full message content
- See submission timestamp
- See visitor IP address
- Cannot edit (read-only)

---

## Deployment Considerations

### Development
```
DEBUG = True
EMAIL_BACKEND = console (emails print to console)
ALLOWED_HOSTS = '*'
SECRET_KEY = default insecure key
```

### Production
```
DEBUG = False
EMAIL_BACKEND = SMTP (actual email sending)
ALLOWED_HOSTS = ['your-domain.com']
SECRET_KEY = secure unique key
Database = PostgreSQL (recommended)
Staticfiles = Whitenoise or S3
```

---

## Error Handling

### Form Validation Errors
```python
# Missing required field
→ 400 Bad Request
→ JSON with specific error message
```

### Email Sending Errors
```python
# Email fails to send (network issue)
→ Still returns 201 (message saved)
→ Logs error to console
→ User sees success (message was saved)
```

### Database Errors
```python
# Database connection fails
→ 500 Internal Server Error
→ Logs error to console
```

---

## Performance Optimization

### What's Optimized
- ✅ Database queries (minimal lookups)
- ✅ Email sending (happens async in production)
- ✅ JSON responses (minimal data)
- ✅ CORS (specific allowed origins)

### For Production
```
# Use Celery for async tasks
# Use Redis for caching
# Use CDN for static files
# Use database connection pooling
```

---

## Testing the Backend

### Manual Testing
1. Fill out contact form
2. Check console for email output
3. Visit /admin to see message saved
4. Check email inbox

### Automated Testing (Optional)
```bash
# Run tests
python manage.py test

# Test specific app
python manage.py test contact

# With coverage
coverage run --source='.' manage.py test
coverage report
```

---

## Quick Reference

| What | Where | How |
|------|-------|-----|
| **Website** | http://localhost:8000 | Browser |
| **Admin** | http://localhost:8000/admin | Browser |
| **API Endpoint** | /api/contact/submit/ | POST request |
| **Database** | db.sqlite3 | SQLite |
| **Settings** | config/settings.py | Edit file |
| **Environment** | .env | Edit file |
| **Messages** | contact_contactmessage table | Django ORM |

---

## Troubleshooting Flowchart

```
Form not submitting?
├─ Check browser console for errors
├─ Make sure server is running
├─ Check network tab (POST request)
└─ Verify endpoint: /api/contact/submit/

Email not sending?
├─ Check .env file has credentials
├─ Verify app-specific password (not regular password)
├─ Check email in console (DEBUG=True)
├─ Check CONTACT_EMAIL is correct
└─ Check email address format

Messages not saving?
├─ Check database exists (db.sqlite3)
├─ Run migrations: python manage.py migrate
├─ Check ContactMessage table exists
└─ Check admin shows messages

Admin page errors?
├─ Create superuser: python manage.py createsuperuser
├─ Run migrations: python manage.py migrate
├─ Check Django admin loaded
└─ Verify you're logged in
```

---

## Summary

Your Django backend:
- ✅ Receives form submissions
- ✅ Validates input
- ✅ Saves to SQLite database
- ✅ Sends email to admin
- ✅ Sends confirmation to user
- ✅ Provides admin interface
- ✅ Has REST API
- ✅ Handles errors gracefully
- ✅ Is production-ready with minor tweaks

**Everything is integrated and working!** 🎉

---

Next: Read `DJANGO_QUICK_START.md` to get up and running!
