# ⚡ Django Backend - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Setup (First Time Only)

```bash
# 1. Create virtual environment
python -m venv venv

# 2. Activate virtual environment
.\venv\Scripts\Activate.ps1

# 3. Install dependencies
pip install -r requirements.txt

# 4. Copy and edit environment file
copy .env.template .env
# Edit .env: Add your Gmail email and app password

# 5. Create database
python manage.py migrate

# 6. Create admin user
python manage.py createsuperuser
# (answer the prompts)
```

### Step 2: Run Server

```bash
# Activate virtual environment (if not already active)
.\venv\Scripts\Activate.ps1

# Start Django server
python manage.py runserver
```

### Step 3: Test It!

1. **Website**: http://localhost:8000
2. **Admin**: http://localhost:8000/admin (login with your superuser)
3. **Test Form**: Go to Contact section, submit a message
4. **Check Messages**: Go to Admin → Contact Messages

---

## 📧 Email Configuration

### For Gmail:

1. Go to: https://myaccount.google.com/apppasswords
2. Generate app password
3. Add to `.env`:
   ```
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-16-char-password
   ```

---

## 🆘 Troubleshooting

**"django not found"**
- Solution: `pip install -r requirements.txt`

**"Email not sending"**
- Check `.env` has correct email and password
- Make sure you used app password, not regular password
- Check CONTACT_EMAIL is correct (currently: timsinapranisha@gmail.com)

**"Admin shows no messages"**
- Solution: `python manage.py migrate`

**"Port 8000 already in use"**
- Solution: `python manage.py runserver 8001` (use different port)

---

## 📁 What Was Created

- ✅ Django project structure (config/)
- ✅ Contact app (contact/) with:
  - Database model for messages
  - REST API for form submission
  - Admin panel to view messages
  - Email sending to timsinapranisha@gmail.com
- ✅ Updated HTML with form submission code
- ✅ Environment variable template

---

## 🔑 Key Files

- `manage.py` - Django command tool
- `config/settings.py` - All settings
- `contact/models.py` - Database structure
- `contact/views.py` - Form handling + email
- `.env` - Email credentials (CREATE THIS!)
- `requirements.txt` - Python packages

---

## ✨ Features

✅ Contact form saves to database
✅ Automatic email to timsinapranisha@gmail.com
✅ Confirmation email to user
✅ Admin panel to view messages
✅ REST API for form submission
✅ CORS enabled for cross-origin requests

---

**Next Step**: Read `DJANGO_SETUP.md` for detailed instructions

Good luck! 🚀
