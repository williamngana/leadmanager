from django.test import TestCase
from .views import LeadViewSet
from rest_framework.test import APIRequestFactory,force_authenticate
from django.contrib.auth.models import User
from knox.models import AuthToken

test1Leads ={
    "first_name":"John",
    "last_name":"Doe",
    "email":"testman@test.ca",
    "notes":"",
    }
    
   
test2Leads ={
    "first_name":"Dede",
    "last_name":"Doe",
    "email":"test2@test.ca",
    "notes":"",
    }
    
class TestLeads(TestCase):
    """ 
    Testing to get the leads, set up by creating two
    users an then posting from both an then retreving the
    results of the get and the post and the create user

    """

    def setUp(self):
        # first set the factory
        self.request_factory = APIRequestFactory()
        # next create both users user1 and user2 
        self.user1 = User.objects.create_user(
            'test2', password='test', email='test2@gmail.com')
        self.user2 = User.objects.create_user(
            'test3', password='test', email='test@gmail.com')
        
        #now send the post requests with the data
        self.lead_details = LeadViewSet.as_view({'get': 'retrieve'})        
        self.lead_post = LeadViewSet.as_view({'post': 'create'})   
        self.lead_update = LeadViewSet.as_view({'put': 'update'})   
        self.lead_delete = LeadViewSet.as_view({'delete': 'destroy'})   
        
    def test_CRUD_leads(self):

        # create the invididual post requests
        request1 = self.request_factory.post('/api/leads/',test1Leads)
        request3 = self.request_factory.post('/api/leads/',test2Leads)
        # force the authentication of all the requests
        force_authenticate(request1,user=self.user1)
        force_authenticate(request3,user=self.user2)

        # create the response
        response1 = self.lead_post(request1,pk=self.user1.pk)
        response3 = self.lead_post(request3,pk=self.user2.pk)
        # test that they where posted correctly
        self.assertEqual(response1.status_code, 201)
        self.assertEqual(response3.status_code, 201)

        
        # create the get requests
        request5 = self.request_factory.get('/api/leads/')
        request6 = self.request_factory.get('/api/leads/')
        # force the authentication
        force_authenticate(request5,user=self.user1)
        force_authenticate(request6,user=self.user2)
        # create the response
        response5 = self.lead_details(request5,pk=self.user1.pk)
        response6 = self.lead_details(request6,pk=self.user2.pk)
        # test that the get request are succesfull
        self.assertEqual(response5.data["email"],"testman@test.ca")
        self.assertEqual(len([response5.data]),1)
        self.assertEqual(response6.data["first_name"],"Dede")

        ## Now we will update and delete a lead first we will update 
        lead_id = response6.data["id"]
        test2Leads["first_name"] = "Danelle"
        request7 = self.request_factory.put('/api/leads/'+str(lead_id),test2Leads)
        force_authenticate(request7,user=self.user2)
        response7 = self.lead_update(request7,pk=self.user2.pk)

        self.assertEqual(response7.data["first_name"],"Danelle")

        request9 = self.request_factory.delete('/api/leads/'+str(lead_id))
        force_authenticate(request9,user=self.user2)
        response9 = self.lead_delete(request9,pk=self.user2.pk)


        self.assertEqual(response9.data,None)



    



