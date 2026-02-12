# 🚀 Django Backend Setup Guide - Complete Instructions

## Overview

Your website now has a fully functional Django backend with:
- ✅ Contact form with database storage
- ✅ Automatic email sending to timsinapranisha@gmail.com
- ✅ Email confirmations to users
- ✅ Admin panel to manage messages
- ✅ REST API for form submission
- ✅ CORS support for cross-origin requests

---

## 📋 Prerequisites

Before starting, you need to install Python and pip. 

**Check if you have Python:**
```bash
python --version
```

Should show Python 3.8 or higher.

---

## 🔧 Step 1: Install Dependencies

### 1.1 Create Virtual Environment

Windows (PowerShell):
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Windows (Command Prompt):
```bash
python -m venv venv
venv\Scripts\activate
```

### 1.2 Install Required Packages

```bash
pip install -r requirements.txt
```

This installs:
- Django 4.2.0
- Django REST Framework
- Django CORS Headers
- python-decouple (for environment variables)
- Pillow (for image handling)

---

## 📧 Step 2: Configure Email (Gmail)

### 2.1 Create .env File

1. Copy `.env.template` to `.env`:
   ```bash
   copy .env.template .env
   ```

2. Edit `.env` with your email details:
   ```
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   CONTACT_EMAIL=timsinapranisha@gmail.com
   ```

### 2.2 Generate Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Google will generate a 16-character password
4. Copy this password to `.env` as `EMAIL_HOST_PASSWORD`

**Important**: Use the 16-character app password, NOT your regular password!

### 2.3 Alternative: Use Your Own Email Provider

If you have a different email provider:

**For Outlook/Office 365:**
```
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@outlook.com
EMAIL_HOST_PASSWORD=your-password
```

**For SendGrid:**
```
EMAIL_BACKEND=sendgrid_backend.SendgridBackend
SENDGRID_API_KEY=your-sendgrid-api-key
```

**For Console (Testing Only):**
```
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```
This prints emails to console instead of sending them.

---

## 🗄️ Step 3: Set Up Database

### 3.1 Create Database Tables

```bash
python manage.py migrate
```

This creates:
- User authentication tables
- Contact message storage
- Admin interface tables

---

## 👨‍💼 Step 4: Create Admin User

Create a superuser to access the admin panel:

```bash
python manage.py createsuperuser
```

Follow the prompts:
- Username: (choose anything, e.g., "admin")
- Email: (your email)
- Password: (secure password)
- Password (again): (confirm)

---

## 🚀 Step 5: Run the Server

Start the Django development server:

```bash
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
```

---

## 🧪 Step 6: Test the Setup

### 6.1 Visit Your Website
```
http://localhost:8000
```

You should see your website with the contact form.

### 6.2 Test Contact Form
1. Go to Contact section
2. Fill out the form
3. Click "Send Message"
4. You should see a success message

### 6.3 Check Admin Panel
```
http://localhost:8000/admin
```

Login with your superuser credentials and navigate to "Contact Messages" to see all submissions.

---

## 📊 Project Structure

```
Your Project/
├── manage.py .......................... Django management
├── db.sqlite3 ......................... Database file (created automatically)
├── requirements.txt ................... Python dependencies
├── .env ............................... Environment variables (create from .env.template)
│
├── config/
│   ├── __init__.py
│   ├── settings.py .................... Django settings
│   ├── urls.py ........................ URL routing
│   └── wsgi.py ........................ WSGI config
│
├── contact/
│   ├── __init__.py
│   ├── models.py ...................... ContactMessage database model
│   ├── views.py ....................... API endpoints
│   ├── serializers.py ................. REST serializers
│   ├── urls.py ........................ Contact app URLs
│   ├── admin.py ....................... Admin interface
│   └── apps.py ........................ App configuration
│
├── index.html ......................... Frontend (updated with API integration)
├── styles.css ......................... Styling (updated with form messages)
├── animations.js ...................... Animations
└── images/ ............................ Images folder
```

---

## 🔌 API Endpoints

### Submit Contact Form
**Endpoint:** `POST /api/contact/submit/`

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Yoga Classes",
    "message": "I'm interested in yoga classes"
}
```

**Success Response (201):**
```json
{
    "success": true,
    "message": "Your message has been sent successfully!",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Yoga Classes",
        "message": "I'm interested in yoga classes",
        "created_at": "2026-02-06T10:30:00Z"
    }
}
```

**Error Response (400):**
```json
{
    "error": "Field name is required"
}
```

---

## 📧 How Email Works

### When form is submitted:

1. **Message saved to database**
   - Stored in `ContactMessage` table
   - Includes IP address for analytics

2. **Email to admin**
   - Sent to: timsinapranisha@gmail.com
   - Contains: Full message details
   - Shows: Timestamp and IP address

3. **Confirmation email to user**
   - Sent to: visitor's email address
   - Thanks them for contacting
   - Auto-sent (may go to spam)

---

## 🛡️ Security Settings

### Production Deployment

Before going live, change in `config/settings.py`:

```python
DEBUG = False
SECRET_KEY = 'your-unique-secret-key-here'
ALLOWED_HOSTS = ['your-domain.com', 'www.your-domain.com']
```

Generate a new SECRET_KEY:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## 🔍 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'django'"
**Solution:** Install requirements again:
```bash
pip install -r requirements.txt
```

### Issue: "ConnectionRefusedError" when sending email
**Solution:** Check email credentials in `.env` file. Make sure:
- EMAIL_HOST_USER is correct
- EMAIL_HOST_PASSWORD is app-specific password (not regular password)
- EMAIL_PORT is 587 (for SMTP)

### Issue: Messages not appearing in database
**Solution:** Run migrations:
```bash
python manage.py migrate
```

### Issue: "CSRF token missing"
**Solution:** The frontend automatically handles CSRF. Make sure cookies are enabled.

### Issue: Admin panel not showing messages
**Solution:** 
1. Run migrations: `python manage.py migrate`
2. Create superuser: `python manage.py createsuperuser`
3. Login to admin

---

## 📈 Monitoring Messages

### Via Admin Panel
1. Go to: http://localhost:8000/admin
2. Click "Contact Messages"
3. View all submissions
4. Mark as read when handled
5. Search by name, email, or message

### Via API
```bash
curl http://localhost:8000/api/contact/messages/
```

---

## 🔄 Updating Code

If you update the Python code:

1. **Restart the server** (press Ctrl+C, then run again)
2. **If you change models**, run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

If you update JavaScript:
1. **Refresh your browser** (Ctrl+F5 for hard refresh)
2. **Clear browser cache** if needed

---

## 🚀 Deployment Guide

When ready to deploy to production:

### Option 1: Heroku (Easiest)

1. Install Heroku CLI
2. Create `Procfile`:
   ```
   web: gunicorn config.wsgi
   ```
3. Deploy:
   ```bash
   heroku create your-app-name
   heroku config:set EMAIL_HOST_USER=your-email@gmail.com
   heroku config:set EMAIL_HOST_PASSWORD=your-app-password
   git push heroku main
   ```

### Option 2: PythonAnywhere (Recommended)

1. Sign up at pythonanywhere.com
2. Upload your files
3. Configure web app settings
4. Add email credentials in environment variables

### Option 3: Your Own Server

1. Install Python 3.8+
2. Upload project files
3. Install dependencies: `pip install -r requirements.txt`
4. Create `.env` file with credentials
5. Run migrations: `python manage.py migrate`
6. Use Gunicorn as production server:
   ```bash
   pip install gunicorn
   gunicorn config.wsgi:application
   ```

---

## 📞 Support Files

Created for you:
- ✅ `config/settings.py` - All Django settings
- ✅ `config/urls.py` - URL routing
- ✅ `contact/models.py` - Database model
- ✅ `contact/views.py` - API views with email logic
- ✅ `contact/serializers.py` - Data validation
- ✅ `contact/admin.py` - Admin interface
- ✅ `manage.py` - Django management tool
- ✅ `requirements.txt` - Python dependencies
- ✅ `.env.template` - Environment variable template

---

## ✅ Checklist

Setup checklist:

- [ ] Python 3.8+ installed
- [ ] Virtual environment created and activated
- [ ] Requirements installed: `pip install -r requirements.txt`
- [ ] `.env` file created (copy from `.env.template`)
- [ ] Gmail app password configured
- [ ] Database migrated: `python manage.py migrate`
- [ ] Superuser created: `python manage.py createsuperuser`
- [ ] Server running: `python manage.py runserver`
- [ ] Website loads at http://localhost:8000
- [ ] Contact form works and sends emails
- [ ] Admin panel accessible and shows messages

---

## 🎯 Quick Start Commands

**One-time setup:**
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows PowerShell
pip install -r requirements.txt
copy .env.template .env
# Edit .env with your email credentials
python manage.py migrate
python manage.py createsuperuser
```

**Run server every time:**
```bash
.\venv\Scripts\Activate.ps1  # Windows PowerShell
python manage.py runserver
```

Then open: http://localhost:8000

---

## 🎉 You're All Set!

Your Django backend is ready. Users can now:
✅ Submit contact forms
✅ Receive confirmation emails
✅ Messages stored in database
✅ Admin can view all submissions

Questions? Check the files in the `contact/` and `config/` folders - they're fully commented!

---

**Need help?** The code is well-commented. Read the docstrings in the Python files.

Good luck! 🚀
