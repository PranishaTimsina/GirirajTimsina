from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from .models import ContactMessage
from .serializers import ContactMessageSerializer


def get_client_ip(request):
    """Get client IP address from request"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@api_view(['POST'])
def submit_contact_form(request):
    """Handle contact form submission"""
    try:
        # Get client IP
        ip_address = get_client_ip(request)
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if field not in request.data or not request.data[field]:
                return Response(
                    {'error': f'{field.capitalize()} is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Create serializer
        serializer = ContactMessageSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save message to database
            contact_message = serializer.save()
            contact_message.ip_address = ip_address
            contact_message.save()
            
            # Send email notification
            try:
                subject = f"New Contact Form Submission: {request.data.get('subject')}"
                
                message = f"""
New message from: {request.data.get('name')}
Email: {request.data.get('email')}
Subject: {request.data.get('subject')}

Message:
{request.data.get('message')}

---
IP Address: {ip_address}
Submitted at: {contact_message.created_at}
                """
                
                send_mail(
                    subject,
                    message,
                    settings.EMAIL_HOST_USER,
                    [settings.CONTACT_EMAIL],
                    fail_silently=False,
                )
                
                # Send confirmation email to user
                confirmation_subject = "Thank you for contacting Giri Raj Timshina"
                confirmation_message = f"""
Dear {request.data.get('name')},

Thank you for reaching out! I have received your message and will get back to you as soon as possible.

Best regards,
Giri Raj Timshina
                """
                
                send_mail(
                    confirmation_subject,
                    confirmation_message,
                    settings.EMAIL_HOST_USER,
                    [request.data.get('email')],
                    fail_silently=True,
                )
                
            except Exception as e:
                print(f"Email sending error: {str(e)}")
                # Still return success even if email fails
            
            return Response(
                {
                    'success': True,
                    'message': 'Your message has been sent successfully!',
                    'data': serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {'error': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def contact_messages_list(request):
    """Retrieve all contact messages (admin view)"""
    messages = ContactMessage.objects.all()
    serializer = ContactMessageSerializer(messages, many=True)
    return Response(serializer.data)
