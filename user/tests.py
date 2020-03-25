from django.test import TestCase
from .views import RegisterView, LoginView, UserView
from rest_framework.test import APIRequestFactory,force_authenticate
from django.contrib.auth.models import User
from knox.models import AuthToken
from django.test import Client 

user1 = {
    'email':'test@testman.com',
    'username': 'testmame',
    'password': 'qazwsxedcrfv'
}
user2 = {
    'email':'test@testmane.com',
    'username': 'testmam',
    'password': 'qazwsxedcrfv'
}
class UserTest(TestCase):
    """
    Here we are going to the login and register views as well as the 
    return user view. we will start by registering 2 users and testing
    that they can login properly then we will atempt to get the wrong
    user info.
    """
    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.lead_post_login = LoginView.as_view()
        self.lead_post_register = RegisterView.as_view()
        self.lead_post_user = UserView.as_view()
    
    def test_LR_users(self):
        request1 = self.request_factory.post('api/auth/register',user1)
        request2 = self.request_factory.post('api/auth/register',user2)
        request3 = self.request_factory.post('api/auth/login',user2)
        response1 = self.lead_post_register(request1)
        response2 = self.lead_post_register(request2)
        response3 = self.lead_post_login(request3)
        self.assertEqual(response1.data['user']['username'], 'testmame')
        self.assertEqual(response2.data['user']['username'], 'testmam')
        self.assertEqual(response3.data['user']['username'], 'testmam')
    
    def test_get_user(self):
        self.user1 = User.objects.create_user(
            'test2', password='test', email='test2@gmail.com')
        self.user2 = User.objects.create_user(
            'test3', password='test', email='test@gmail.com')
        # correct user
        request5 = self.request_factory.get('api/auth/user')
        force_authenticate(request5,user=self.user1)
        response5 = self.lead_post_user(request5,pk=self.user1.pk)
        self.assertEqual(response5.data["username"],'test2')
        # not authenticated
        request6 = self.request_factory.get('api/auth/user')
        response5 = self.lead_post_user(request6)
        self.assertEqual(response5.status_code,401)



